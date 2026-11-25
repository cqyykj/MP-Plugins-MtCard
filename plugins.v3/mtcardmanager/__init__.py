# -*- coding: utf-8 -*-
"""
MTeam 卡片管家 — MoviePilot 插件
管理 M-Team 收藏卡与卡片市场：总览 / 重复卡挂单（含价格对照）/ 我的成交。

合规约束（务必遵守，改动前先读需求文档）：
- 只用 x-api-key（来自 MP 站点配置），绝不发送 Cookie / Authorization / JWT
- 只调用 /api/pt-card/** 白名单端点
- 全局限流 ≤ 1 req/s（令牌桶）
- 挂单/撤单等写操作由前端强制预览确认，本插件不做任何自动买卡
"""
import json
import threading
import time
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

import requests

from app.core.plugin import PluginManager
from app.helper.plugin import PluginHelper
from app.log import logger
from app.plugins import _PluginBase

# ---------------------------------------------------------------------------
# 合规常量：路径白名单 + 限流
# ---------------------------------------------------------------------------
API_BASE = "https://api2.m-team.cc"
ALLOWED_ENDPOINTS = {
    "/api/pt-card/summary",
    "/api/pt-card/inventory",
    "/api/pt-card/market/list",
    "/api/pt-card/market/search",
    "/api/pt-card/market/orderbook",
    "/api/pt-card/market/recent",
    "/api/pt-card/market/myorders",
    "/api/pt-card/market/myTrades",
    "/api/pt-card/market/sell",
    "/api/pt-card/market/cancel",
    "/api/pt-card/config",
}
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36")
FEE_RATE = 0.05  # 站点手续费 5%


class _TokenBucket:
    """令牌桶限流：全局 ≤ 1 req/s。"""

    def __init__(self, rate: float = 1.0, capacity: int = 2):
        self._rate = rate
        self._capacity = capacity
        self._tokens = float(capacity)
        self._last = time.monotonic()
        self._lock = threading.Lock()

    def acquire(self) -> None:
        """阻塞直到拿到令牌。"""
        while True:
            with self._lock:
                now = time.monotonic()
                self._tokens = min(self._capacity,
                                   self._tokens + (now - self._last) * self._rate)
                self._last = now
                if self._tokens >= 1.0:
                    self._tokens -= 1.0
                    return
                need = (1.0 - self._tokens) / self._rate
            time.sleep(min(need, 0.5))


class Plugin(_PluginBase):
    # 插件元信息
    plugin_name = "MTeam 卡片管家"
    plugin_desc = "M-Team 收藏卡管理：总览 / 重复卡挂单（价格对照防扫）/ 我的成交。只用 API Key，不用 Cookie。"
    plugin_version = "1.0.0"
    plugin_author = "fnosnas"
    author_url = ""
    plugin_config_prefix = "mtcardmanager_"
    plugin_order = 20
    auth_level = 1

    _bucket = _TokenBucket(rate=1.0, capacity=2)
    _session: Optional[requests.Session] = None
    _session_lock = threading.Lock()

    def __init__(self):
        super().__init__()
        self._enabled = False
        self._sync_interval = 30

    # ------------------------------------------------------------------
    # MP 插件生命周期
    # ------------------------------------------------------------------
    def init_plugin(self, config: dict = None) -> None:
        config = config or {}
        self._enabled = bool(config.get("enabled"))
        try:
            self._sync_interval = int(config.get("sync_interval", 30))
        except (TypeError, ValueError):
            self._sync_interval = 30

    def get_state(self) -> bool:
        return self._enabled

    @staticmethod
    def get_command() -> List[Dict[str, Any]]:
        return []

    def get_api(self) -> List[Dict[str, Any]]:
        return [
            {"path": "/overview", "endpoint": self.api_overview, "methods": ["GET"]},
            {"path": "/inventory", "endpoint": self.api_inventory, "methods": ["GET"]},
            {"path": "/dup-plan", "endpoint": self.api_dup_plan, "methods": ["GET"]},
            {"path": "/market", "endpoint": self.api_market, "methods": ["GET"]},
            {"path": "/myorders", "endpoint": self.api_myorders, "methods": ["GET"]},
            {"path": "/mytrades", "endpoint": self.api_mytrades, "methods": ["GET"]},
            {"path": "/sell", "endpoint": self.api_sell, "methods": ["POST"]},
            {"path": "/cancel", "endpoint": self.api_cancel, "methods": ["POST"]},
            {"path": "/status", "endpoint": self.api_status, "methods": ["GET"]},
        ]

    def get_form(self) -> Tuple[List[dict], Dict[str, Any]]:
        return [], {}

    def get_page(self) -> List[dict]:
        return []

    def stop_service(self) -> None:
        pass

    # ------------------------------------------------------------------
    # 底层：站点 Key 读取 + 限流请求（单一出口，代码审计点）
    # ------------------------------------------------------------------
    def _get_api_key(self) -> Optional[str]:
        """从 MP 站点配置（domain 含 m-team）读取 apikey，仅在内存使用。"""
        try:
            sites = PluginManager().get_sites()
        except Exception:
            sites = []
        for site in sites:
            domain = (site.get("domain") or site.get("url") or "").lower()
            if "m-team" in domain or "mteam" in domain:
                key = site.get("apikey") or ""
                if key:
                    return key
        return None

    def _get_session(self) -> requests.Session:
        """单一 Session 工厂：只注入 x-api-key，绝不带 Cookie（合规审计点）。"""
        with self._session_lock:
            if self._session is None:
                self._session = requests.Session()
                self._session.headers.update({
                    "User-Agent": UA,
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                })
            return self._session

    def _ptcard(self, endpoint: str, body: dict = None) -> Dict[str, Any]:
        """
        调用 /api/pt-card/** 端点。
        - 白名单校验：endpoint 必须在 ALLOWED_ENDPOINTS，否则拒绝（防误用 member/msg）
        - 令牌桶限流 ≤ 1 req/s
        - 网络异常重试 3 次（指数退避）
        Returns: {"ok": bool, "data": ...|None, "error": str|None}
        """
        if endpoint not in ALLOWED_ENDPOINTS:
            return {"ok": False, "data": None, "error": f"endpoint 不在白名单: {endpoint}"}
        key = self._get_api_key()
        if not key:
            return {"ok": False, "data": None, "error": "未找到馒头的 API Key，请先在 MP 站点配置里填写 apikey"}
        url = API_BASE + endpoint
        sess = self._get_session()
        last_err = ""
        for attempt in range(3):
            self._bucket.acquire()
            try:
                resp = sess.post(url, data=json.dumps(body or {}), timeout=20)
                if resp.status_code == 403:
                    # 常见于 UA/风控，不重试直接返回
                    return {"ok": False, "data": None, "error": f"站点拒绝(403): {resp.text[:120]}"}
                resp.raise_for_status()
                out = resp.json()
                if str(out.get("code")) != "0":
                    return {"ok": False, "data": None,
                            "error": f"站点返回异常: {out.get('code')} {out.get('message', '')[:120]}"}
                return {"ok": True, "data": out.get("data"), "error": None}
            except Exception as e:  # noqa: BLE001 网络层统一降级
                last_err = str(e)
                logger.warning("%s 请求失败(第%d次): %s", endpoint, attempt + 1, last_err)
                time.sleep(1.5 ** attempt)
        return {"ok": False, "data": None, "error": f"重试 3 次仍失败: {last_err}"}

    # ------------------------------------------------------------------
    # 业务：库存与重复卡识别
    # ------------------------------------------------------------------
    def _fetch_inventory(self) -> List[dict]:
        """分页拉全量库存。"""
        cards: List[dict] = []
        page = 1
        while page <= 20:  # 硬上限防死循环
            r = self._ptcard("/api/pt-card/inventory", {"pageNumber": page, "pageSize": 100})
            if not r["ok"]:
                if page == 1:
                    raise RuntimeError(r["error"])
                break
            data = r["data"] or {}
            lst = data.get("data") or data.get("list") or []
            if not isinstance(lst, list):
                break
            cards.extend(lst)
            total = int(data.get("total") or 0)
            if len(cards) >= total or not lst:
                break
            page += 1
        return cards

    @staticmethod
    def _group_key(card: dict) -> Tuple[str, str]:
        """同片同稀有度为一组。"""
        return str(card.get("filmId") or ""), str(card.get("rarity") or "")

    @staticmethod
    def _dup_plan(cards: List[dict]) -> List[dict]:
        """
        保留策略：同片同稀有度留 1 张，优先留薪王。
        tradeLockUntil 未过期的不可卖。
        """
        groups: Dict[Tuple[str, str], List[dict]] = {}
        for c in cards:
            if c.get("tradeLockUntil"):
                continue
            groups.setdefault(Plugin._group_key(c), []).append(c)
        plan = []
        for (film_id, rarity), lst in groups.items():
            if len(lst) < 2:
                continue
            titled = sorted(lst, key=lambda r: (r.get("title") != "薪王", r.get("title") or ""))
            keep, sell = titled[0], titled[1:]
            plan.append({
                "filmId": film_id,
                "filmName": keep.get("filmName"),
                "rarity": rarity,
                "keepCardId": keep.get("id"),
                "keepTitle": keep.get("title"),
                "sellCards": [
                    {"cardId": c.get("id"), "title": c.get("title")} for c in sell
                ],
                "sellCount": len(sell),
            })
        plan.sort(key=lambda g: -g["sellCount"])
        return plan

    # ------------------------------------------------------------------
    # 业务：行情查询（挂价 vs 成交价）
    # ------------------------------------------------------------------
    def _market_lowest(self, film_name: str, rarity: str) -> Tuple[Optional[int], List[int]]:
        """同款在售挂单：返回 (最低价, 前3档价格列表)。天价污染由中位数策略规避。"""
        r = self._ptcard("/api/pt-card/market/search",
                         {"keyword": film_name, "rarity": rarity,
                          "pageNumber": 1, "pageSize": 30})
        if not r["ok"]:
            return None, []
        items = (r["data"] or {}).get("data") or (r["data"] or {}).get("list") or []
        prices = sorted(int(it["price"]) for it in items
                        if it.get("price") and it.get("status") in (None, "OPEN", "open", 0))
        return (prices[0] if prices else None), prices[:3]

    def _recent_trades(self, film_id: str, rarity: str) -> List[dict]:
        """单卡订单簿近期成交（真实成交价，区别于挂价）。"""
        r = self._ptcard("/api/pt-card/market/orderbook",
                         {"filmId": film_id, "rarity": rarity})
        if not r["ok"]:
            return []
        data = r["data"] or {}
        return data.get("recentTrades") or []

    def _suggested_price(self, film_name: str, rarity: str,
                         base_prices: Optional[Dict[str, int]] = None) -> Tuple[int, str]:
        """
        建议价：同款最低 3 档中位；无样本时用稀有度基准价。
        Returns: (建议价, 定价依据说明)
        """
        _, top3 = self._market_lowest(film_name, rarity)
        if top3:
            top3_sorted = sorted(top3)
            mid = top3_sorted[len(top3_sorted) // 2]
            return int(mid), f"同款最低3档中位（{top3}）"
        base = (base_prices or {}).get(rarity) or {"N": 4410, "R": 8000, "SR": 15000,
                                                   "SSR": 40000, "UR": 100000}.get(rarity, 4410)
        return int(base), f"无市场样本，按 {rarity} 基准价"

    # ------------------------------------------------------------------
    # API 端点
    # ------------------------------------------------------------------
    def api_status(self) -> Dict[str, Any]:
        key = self._get_api_key()
        return {"enabled": self._enabled,
                "has_key": bool(key),
                "key_hint": (key[:4] + "****") if key else None}

    def api_overview(self) -> Dict[str, Any]:
        r = self._ptcard("/api/pt-card/summary", {})
        if not r["ok"]:
            return {"success": False, "message": r["error"]}
        return {"success": True, "data": r["data"]}

    def api_inventory(self) -> Dict[str, Any]:
        try:
            cards = self._fetch_inventory()
        except RuntimeError as e:
            return {"success": False, "message": str(e)}
        return {"success": True, "data": {"total": len(cards), "cards": cards}}

    def api_dup_plan(self) -> Dict[str, Any]:
        """重复卡挂单计划 + 每组建议价 + 三价对照（我的挂牌价/市场最低/近期成交）。"""
        try:
            cards = self._fetch_inventory()
        except RuntimeError as e:
            return {"success": False, "message": str(e)}
        plan = self._dup_plan(cards)
        # 已挂单集合：cardId -> 我的挂牌价
        myorders = self.api_myorders()
        my_price_map: Dict[str, int] = {}
        if myorders.get("success"):
            for o in (myorders.get("data") or {}).get("orders", []):
                cid = str(o.get("cardId") or "")
                if cid:
                    my_price_map[cid] = int(o.get("price") or 0)
        for g in plan:
            price, basis = self._suggested_price(g["filmName"], g["rarity"])
            g["suggestedPrice"] = price
            g["priceBasis"] = basis
            lowest, _ = self._market_lowest(g["filmName"], g["rarity"])
            g["marketLowest"] = lowest
            trades = self._recent_trades(g["filmId"], g["rarity"])
            g["lastTradePrice"] = int(trades[0]["price"]) if trades else None
            # 已挂单的三价对照：我的挂牌价 < 近期成交价 → 标红（防被秒扫）
            for c in g["sellCards"]:
                mine = my_price_map.get(str(c["cardId"]))
                c["myPrice"] = mine
                c["riskLow"] = bool(mine and g["lastTradePrice"] and mine < g["lastTradePrice"])
        return {"success": True, "data": plan}

    def api_market(self, film_name: str = "", rarity: str = "") -> Dict[str, Any]:
        """市场行情：订单簿 + 明确区分挂价/成交价。"""
        if not film_name:
            return {"success": False, "message": "请输入片名"}
        r = self._ptcard("/api/pt-card/market/search",
                         {"keyword": film_name, "rarity": rarity,
                          "pageNumber": 1, "pageSize": 30})
        if not r["ok"]:
            return {"success": False, "message": r["error"]}
        asks = (r["data"] or {}).get("data") or []
        film_id = asks[0].get("filmId") if asks else None
        trades = self._recent_trades(film_id, rarity) if film_id else []
        return {"success": True, "data": {
            "asks": asks,
            "recentTrades": trades,
            "hasRealTrades": bool(trades),  # 无成交时前端标"无真实成交"
        }}

    def api_myorders(self) -> Dict[str, Any]:
        r = self._ptcard("/api/pt-card/market/myorders", {"pageNumber": 1, "pageSize": 100})
        if not r["ok"]:
            return {"success": False, "message": r["error"]}
        dd = r["data"] or {}
        lst = dd.get("data") or dd.get("list") or []
        orders = [{"orderId": o.get("id"), "cardId": o.get("cardId"),
                   "filmName": o.get("filmName"), "rarity": o.get("rarity"),
                   "price": o.get("price"), "createdDate": o.get("createdDate"),
                   "filledAt": o.get("filledAt"), "cancelledAt": o.get("cancelledAt")}
                  for o in lst if not o.get("filledAt") and not o.get("cancelledAt")]
        return {"success": True, "data": {"total": dd.get("total"), "orders": orders}}

    def api_mytrades(self) -> Dict[str, Any]:
        r = self._ptcard("/api/pt-card/market/myTrades", {"pageNumber": 1, "pageSize": 100})
        if not r["ok"]:
            return {"success": False, "message": r["error"]}
        dd = r["data"] or {}
        lst = dd.get("data") or dd.get("list") or []
        total_net = sum(float(t.get("price") or 0) - float(t.get("fee") or 0) for t in lst)
        total_fee = sum(float(t.get("fee") or 0) for t in lst)
        return {"success": True, "data": {
            "trades": lst, "count": len(lst),
            "totalNet": round(total_net), "totalFee": round(total_fee),
        }}

    def api_sell(self, card_id: int = None, net_price: int = None) -> Dict[str, Any]:
        """挂单（前端必须已做预览确认；此处只做参数兜底校验）。"""
        if not card_id or not net_price or int(net_price) <= 0:
            return {"success": False, "message": "card_id 与 net_price 必填且合法"}
        r = self._ptcard("/api/pt-card/market/sell",
                         {"cardId": int(card_id), "netPrice": int(net_price)})
        if not r["ok"]:
            return {"success": False, "message": r["error"]}
        return {"success": True, "data": r["data"]}

    def api_cancel(self, order_id: int = None) -> Dict[str, Any]:
        if not order_id:
            return {"success": False, "message": "order_id 必填"}
        r = self._ptcard("/api/pt-card/market/cancel", {"orderId": int(order_id)})
        if not r["ok"]:
            return {"success": False, "message": r["error"]}
        return {"success": True, "data": r["data"]}
