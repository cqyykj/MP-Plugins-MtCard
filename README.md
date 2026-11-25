# MtCardManager — MTeam 卡片管家

MoviePilot V3 插件：M-Team 收藏卡管理。

- 总览：卡片数 / 薪王 / UR / 完成卡册 / 排名
- 重复卡挂单：留薪王策略、建议价（同款最低3档中位）、三价对照（我的挂牌价 < 近期成交价标红防秒扫）、批量挂单预览确认
- 我的成交：净收入 / 手续费（5%）/ 逐笔明细

合规：只用 x-api-key，不碰 Cookie/JWT；只调 /api/pt-card/** 白名单；限流 ≤1 req/s；无自动买卡。

## 安装
MP → 插件 → 设置 → 自定义仓库源，填入本仓库地址：
https://github.com/cqyykj/MtCardManager
