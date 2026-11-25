# -*- coding: utf-8 -*-
"""
MTeam 卡片管家 — MoviePilot V3 插件
管理 M-Team 收藏卡与卡片市场：总览 / 重复卡挂单（含价格对照）/ 我的成交。

合规约束（改动前先读需求文档）：
- 只用 x-api-key（来自 MP 站点配置），绝不发送 Cookie / Authorization / JWT
- 只调用 /api/pt-card/** 白名单端点
- 全局限流 ≤ 1 req/s（令牌桶）
- 挂单/撤单等写操作由前端强制预览确认，本插件不做任何自动买卡
"""
import json
import logging
import threading
import time
from typing import Any, Dict, List, Optional, Tuple

import requests

# V3 契约：_PluginBase 必须从 app.sdk.plugin 导入（旧路径仅兼容，不再使用）
from app.sdk.plugin import _PluginBase

try:
    from app.log import logger
except ImportError:  # pragma: no cover 极端环境兜底
    logger = logging.getLogger("MtCardManager")

# 站点配置读取：优先用 SiteOper 直读站点表（V3 推荐「宿主数据用 Oper」）
# 旧 PluginManager().get_sites() 在 V3 返回结构变化，读不到 apikey，仅作兜底
SiteOper = None  # type: ignore
for _site_oper_path in ("app.db.oper.site", "app.db.site_oper", "app.core.site"):
    try:
        _mod = __import__(_site_oper_path, fromlist=["SiteOper"])
        SiteOper = getattr(_mod, "SiteOper")
        break
    except Exception:  # noqa: BLE001
        continue

try:
    from app.core.plugin import PluginManager
except ImportError:  # pragma: no cover
    PluginManager = None  # type: ignore

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


class MtCardManager(_PluginBase):
    """M-Team 卡片管家主类（类名 = 插件 ID = 目录名首字母大写）。"""

    plugin_name = "MTeam 卡片管家"
    plugin_desc = "M-Team 收藏卡管理：总览 / 重复卡挂单（价格对照防扫）/ 我的成交。只用 API Key，不用 Cookie。"
    plugin_icon = "Moviepilot_A.png"
    plugin_version = "1.0.6"
    plugin_author = "cqyykj"
    author_url = "https://github.com/cqyykj/MP-Plugins-MtCard"
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
    # 生命周期
    # ------------------------------------------------------------------
    def init_plugin(self, config: dict | None = None) -> None:
        config = config or {}
        self._enabled = bool(config.get("enabled"))
        try:
            self._sync_interval = int(config.get("sync_interval", 30))
        except (TypeError, ValueError):
            self._sync_interval = 30

    def get_state(self) -> bool:
        return self._enabled

    @staticmethod
    def get_command() -> list[dict[str, Any]]:
        return []

    @staticmethod
    def get_render_mode() -> Tuple[str, str]:
        """声明使用 Vue 联邦组件渲染插件界面（产物在 dist/assets）。"""
        return "vue", "dist/assets"

    def get_form(self) -> tuple[list[dict], dict[str, Any]]:
        return [
            {
                "component": "VForm",
                "content": [
                    {"component": "VSwitch",
                     "props": {"model": "enabled", "label": "启用插件"}},
                ],
            }
        ], {"enabled": False}

    def get_page(self) -> list[dict]:
        """Vue 联邦模式：远程组件由 dist 提供，此处仅声明占位。"""
        return []

    def stop_service(self) -> None:
        self._enabled = False

    def get_api(self) -> list[dict[str, Any]]:
        """注册插件后端 API（V3 契约：auth + 统一 envelope）。"""
        routes = [
            ("/status", self.api_status, ["GET"]),
            ("/overview", self.api_overview, ["GET"]),
            ("/inventory", self.api_inventory, ["GET"]),
            ("/dup-plan", self.api_dup_plan, ["GET"]),
            ("/market", self.api_market, ["GET"]),
            ("/myorders", self.api_myorders, ["GET"]),
            ("/mytrades", self.api_mytrades, ["GET"]),
            ("/sell", self.api_sell, ["POST"]),
            ("/cancel", self.api_cancel, ["POST"]),
        ]
        return [
            {"path": p, "endpoint": ep, "methods": m, "auth": "bear"}
            for p, ep, m in routes
        ]

    # ------------------------------------------------------------------
    # 统一响应信封（严格三字段 success/message/data）
    # ------------------------------------------------------------------
    @staticmethod
    def _ok(data: Any = None, message: str = "") -> Dict[str, Any]:
        return {"success": True, "message": message, "data": data}

    @staticmethod
    def _fail(message: str) -> Dict[str, Any]:
        return {"success": False, "message": message, "data": None}

    # ------------------------------------------------------------------
    # 底层：站点 Key 读取 + 限流请求（单一出口，代码审计点）
    # ------------------------------------------------------------------
    def _get_api_key(self) -> Optional[str]:
        """从 MP 站点配置读取馒头 apikey，只在内存使用，绝不下发前端。

        V3 优先用 SiteOper 直读站点表（Site.apikey 为明文）；
        旧 PluginManager().get_sites() 返回结构在 V3 已变化，仅作兜底。
        """
        # 路径一：SiteOper 直读（V3 推荐）
        if SiteOper is not None:
            try:
                for domain in ("m-team.cc", "api2.m-team.cc", "kp.m-team.cc"):
                    site = SiteOper().get_by_domain(domain)
                    if site is not None:
                        key = getattr(site, "apikey", "") or ""
                        if key:
                            return key
                # 按名称兜底（站点名「馒头」）
                try:
                    for site in SiteOper().list_active():
                        name = getattr(site, "name", "") or ""
                        if "馒头" in name or "m-team" in name.lower():
                            key = getattr(site, "apikey", "") or ""
                            if key:
                                return key
                except Exception:  # noqa: BLE001
                    pass
            except Exception as e:  # noqa: BLE001
                logger.warning("MtCardManager 通过 SiteOper 读取站点失败: %s", e)

        # 路径二：旧 PluginManager 兜底（兼容 V2/早期 V3）
        if PluginManager is not None:
            try:
                sites = PluginManager().get_sites()
                for site in sites or []:
                    if isinstance(site, dict):
                        domain = (site.get("domain") or site.get("url") or "").lower()
                        key = site.get("apikey") or ""
                    else:
                        domain = (getattr(site, "domain", "") or "").lower()
                        key = getattr(site, "apikey", "") or ""
                    if "m-team" in domain or "mteam" in domain:
                        if key:
                            return key
            except Exception as e:  # noqa: BLE001
                logger.warning("MtCardManager 通过 PluginManager 读取站点失败: %s", e)
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
        调用 /api/pt-card/** 端点（白名单校验 + 限流 + 重试）。
        Returns: {"ok": bool, "data": ...|None, "error": str|None}
        """
        if endpoint not in ALLOWED_ENDPOINTS:
            return {"ok": False, "data": None, "error": f"endpoint 不在白名单: {endpoint}"}
        key = self._get_api_key()
        if not key:
            return {"ok": False, "data": None,
                    "error": "未找到馒头的 API Key，请先在 MP 站点配置里填写 apikey"}
        sess = self._get_session()
        last_err = ""
        for attempt in range(3):
            self._bucket.acquire()
            try:
                # 每次请求单独注入 x-api-key（合规：只发 API Key，绝不带 Cookie/JWT）
                resp = sess.post(
                    API_BASE + endpoint,
                    data=json.dumps(body or {}),
                    headers={"x-api-key": key},
                    timeout=20,
                )
                if resp.status_code == 403:
                    return {"ok": False, "data": None, "error": "站点拒绝(403)，请稍后重试"}
                resp.raise_for_status()
                out = resp.json()
                if str(out.get("code")) != "0":
                    return {"ok": False, "data": None,
                            "error": f"站点返回异常: {out.get('code')} {out.get('message', '')[:100]}"}
                return {"ok": True, "data": out.get("data"), "error": None}
            except Exception as e:  # noqa: BLE001
                last_err = str(e)
                logger.warning("MtCardManager %s 请求失败(第%d次): %s",
                               endpoint, attempt + 1, last_err)
                time.sleep(1.5 ** attempt)
        return {"ok": False, "data": None, "error": f"重试 3 次仍失败: {last_err}"}

    # ------------------------------------------------------------------
    # 库存与重复卡识别
    # ------------------------------------------------------------------
    def _fetch_inventory(self) -> List[dict]:
        """分页拉全量库存。"""
        cards: List[dict] = []
        page = 1
        while page <= 20:
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
        return str(card.get("filmId") or ""), str(card.get("rarity") or "")

    @staticmethod
    def _dup_plan(cards: List[dict]) -> List[dict]:
        """同片同稀有度留 1 张（优先薪王），交易锁未过期剔除。"""
        groups: Dict[Tuple[str, str], List[dict]] = {}
        for c in cards:
            if c.get("tradeLockUntil"):
                continue
            groups.setdefault(MtCardManager._group_key(c), []).append(c)
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
    # 行情
    # ------------------------------------------------------------------
    def _market_lowest(self, film_name: str, rarity: str) -> Tuple[Optional[int], List[int]]:
        r = self._ptcard("/api/pt-card/market/search",
                         {"keyword": film_name, "rarity": rarity,
                          "pageNumber": 1, "pageSize": 30})
        if not r["ok"]:
            return None, []
        data = r["data"] or {}
        items = data.get("data") or data.get("list") or []
        prices = sorted(int(it["price"]) for it in items
                        if it.get("price") and it.get("status") in (None, "OPEN", "open", 0))
        return (prices[0] if prices else None), prices[:3]

    def _recent_trades(self, film_id: str, rarity: str) -> List[dict]:
        r = self._ptcard("/api/pt-card/market/orderbook",
                         {"filmId": film_id, "rarity": rarity})
        if not r["ok"]:
            return []
        return (r["data"] or {}).get("recentTrades") or []

    def _suggested_price(self, film_name: str, rarity: str) -> Tuple[int, str]:
        _, top3 = self._market_lowest(film_name, rarity)
        if top3:
            s = sorted(top3)
            return int(s[len(s) // 2]), f"同款最低3档中位（{top3}）"
        base = {"N": 4410, "R": 8000, "SR": 15000,
                "SSR": 40000, "UR": 100000}.get(rarity, 4410)
        return int(base), f"无市场样本，按 {rarity} 基准价"

    # ------------------------------------------------------------------
    # API 端点
    # ------------------------------------------------------------------
    def api_status(self) -> Dict[str, Any]:
        key = self._get_api_key()
        # 诊断字段：定位 V3 下 apikey 读取链路（仅布尔/计数，不下发明文）
        diag_siteoper_loaded = SiteOper is not None
        diag_site_found = False
        diag_site_has_key = False
        if SiteOper is not None:
            try:
                _s = SiteOper().get_by_domain("m-team.cc")
                if _s is not None:
                    diag_site_found = True
                    diag_site_has_key = bool(getattr(_s, "apikey", "") or "")
            except Exception:  # noqa: BLE001
                pass
        # 自测：用当前 key 真调一次 summary，确认 x-api-key 是否注入成功
        diag_call_code = None
        diag_call_msg = None
        if key:
            try:
                self._bucket.acquire()
                _r = self._get_session().post(
                    API_BASE + "/api/pt-card/summary",
                    data=json.dumps({}),
                    headers={"x-api-key": key},
                    timeout=20,
                )
                _o = _r.json()
                diag_call_code = str(_o.get("code"))
                diag_call_msg = str(_o.get("message", ""))[:80]
            except Exception as e:  # noqa: BLE001
                diag_call_msg = str(e)[:80]
        return self._ok({
            "enabled": self._enabled,
            "has_key": bool(key),
            "key_hint": (key[:4] + "****") if key else None,
            "diag": {
                "siteoper_loaded": diag_siteoper_loaded,
                "pluginmanager_loaded": PluginManager is not None,
                "mteam_site_found": diag_site_found,
                "mteam_site_has_key": diag_site_has_key,
                "call_code": diag_call_code,
                "call_msg": diag_call_msg,
            },
        })

    def api_overview(self) -> Dict[str, Any]:
        r = self._ptcard("/api/pt-card/summary", {})
        return self._ok(r["data"]) if r["ok"] else self._fail(r["error"])

    def api_inventory(self) -> Dict[str, Any]:
        try:
            cards = self._fetch_inventory()
        except RuntimeError as e:
            return self._fail(str(e))
        return self._ok({"total": len(cards), "cards": cards})

    def api_dup_plan(self) -> Dict[str, Any]:
        """重复卡挂单计划 + 建议价 + 三价对照。"""
        try:
            cards = self._fetch_inventory()
        except RuntimeError as e:
            return self._fail(str(e))
        plan = self._dup_plan(cards)
        orders = self.api_myorders()
        my_price_map: Dict[str, int] = {}
        if orders.get("success") and orders.get("data"):
            for o in orders["data"].get("orders", []):
                if o.get("cardId"):
                    my_price_map[str(o["cardId"])] = int(o.get("price") or 0)
        for g in plan:
            price, basis = self._suggested_price(g["filmName"], g["rarity"])
            g["suggestedPrice"] = price
            g["priceBasis"] = basis
            lowest, _ = self._market_lowest(g["filmName"], g["rarity"])
            g["marketLowest"] = lowest
            trades = self._recent_trades(g["filmId"], g["rarity"])
            g["lastTradePrice"] = int(trades[0]["price"]) if trades else None
            for c in g["sellCards"]:
                mine = my_price_map.get(str(c["cardId"]))
                c["myPrice"] = mine
                c["riskLow"] = bool(mine and g["lastTradePrice"] and mine < g["lastTradePrice"])
        return self._ok(plan)

    def api_market(self, film_name: str = "", rarity: str = "") -> Dict[str, Any]:
        if not film_name:
            return self._fail("请输入片名")
        r = self._ptcard("/api/pt-card/market/search",
                         {"keyword": film_name, "rarity": rarity,
                          "pageNumber": 1, "pageSize": 30})
        if not r["ok"]:
            return self._fail(r["error"])
        asks = (r["data"] or {}).get("data") or []
        film_id = asks[0].get("filmId") if asks else None
        trades = self._recent_trades(film_id, rarity) if film_id else []
        return self._ok({"asks": asks, "recentTrades": trades,
                         "hasRealTrades": bool(trades)})

    def api_myorders(self) -> Dict[str, Any]:
        r = self._ptcard("/api/pt-card/market/myorders", {"pageNumber": 1, "pageSize": 100})
        if not r["ok"]:
            return self._fail(r["error"])
        dd = r["data"] or {}
        lst = dd.get("data") or dd.get("list") or []
        orders = [{"orderId": o.get("id"), "cardId": o.get("cardId"),
                   "filmName": o.get("filmName"), "rarity": o.get("rarity"),
                   "price": o.get("price"), "createdDate": o.get("createdDate")}
                  for o in lst if not o.get("filledAt") and not o.get("cancelledAt")]
        return self._ok({"total": dd.get("total"), "orders": orders})

    def api_mytrades(self) -> Dict[str, Any]:
        r = self._ptcard("/api/pt-card/market/myTrades", {"pageNumber": 1, "pageSize": 100})
        if not r["ok"]:
            return self._fail(r["error"])
        dd = r["data"] or {}
        lst = dd.get("data") or dd.get("list") or []
        total_net = sum(float(t.get("price") or 0) - float(t.get("fee") or 0) for t in lst)
        total_fee = sum(float(t.get("fee") or 0) for t in lst)
        return self._ok({"trades": lst, "count": len(lst),
                         "totalNet": round(total_net), "totalFee": round(total_fee)})

    def api_sell(self, card_id: int = None, net_price: int = None) -> Dict[str, Any]:
        if not card_id or not net_price or int(net_price) <= 0:
            return self._fail("card_id 与 net_price 必填且合法")
        r = self._ptcard("/api/pt-card/market/sell",
                         {"cardId": int(card_id), "netPrice": int(net_price)})
        return self._ok(r["data"]) if r["ok"] else self._fail(r["error"])

    def api_cancel(self, order_id: int = None) -> Dict[str, Any]:
        if not order_id:
            return self._fail("order_id 必填")
        r = self._ptcard("/api/pt-card/market/cancel", {"orderId": int(order_id)})
        return self._ok(r["data"]) if r["ok"] else self._fail(r["error"])
