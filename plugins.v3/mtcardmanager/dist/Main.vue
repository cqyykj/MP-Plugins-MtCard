<template>
  <div class="mtcard">
    <el-tabs v-model="tab">
      <!-- ===================== 页签 1：总览 ===================== -->
      <el-tab-pane label="总览" name="overview">
        <el-alert v-if="!status.has_key" type="warning" :closable="false"
                  title="未找到馒头 API Key —— 请先在 MP「站点管理」里给馒头填写 apikey（控制台→实验室→存取令牌获取）" />
        <el-row :gutter="12" v-if="overview">
          <el-col :span="4" v-for="m in overviewCards" :key="m.label">
            <el-card shadow="hover" class="stat">
              <div class="stat-val">{{ m.value }}</div>
              <div class="stat-label">{{ m.label }}</div>
            </el-card>
          </el-col>
        </el-row>
        <el-descriptions v-if="overview && overview.rank" :column="4" border class="mt12" title="收藏进度">
          <el-descriptions-item label="完成卡册">{{ overview.completedAlbums }}</el-descriptions-item>
          <el-descriptions-item label="守护濒危">{{ overview.guardingFlames }}</el-descriptions-item>
          <el-descriptions-item label="薪王">{{ overview.xinwang }}</el-descriptions-item>
          <el-descriptions-item label="排名">{{ overview.rank }}</el-descriptions-item>
        </el-descriptions>
      </el-tab-pane>

      <!-- ===================== 页签 2：重复卡挂单 ===================== -->
      <el-tab-pane :label="`重复卡挂单${dupGroups ? `（${dupGroups.length}组）` : ''}`" name="dup">
        <el-alert type="info" :closable="false" class="mb12"
                  title="保留策略：同片同稀有度留 1 张（优先留薪王）。价格三列对照：我的挂牌价 < 近期成交价 会标红提示可能被秒扫。" />
        <el-table :data="dupGroups" v-loading="dupLoading" size="small" border>
          <el-table-column prop="filmName" label="片名" min-width="160" show-overflow-tooltip />
          <el-table-column prop="rarity" label="稀有度" width="70" />
          <el-table-column label="持有/可卖" width="90">
            <template #default="{ row }">{{ row.sellCount + 1 }} / {{ row.sellCount }}</template>
          </el-table-column>
          <el-table-column prop="keepTitle" label="保留" width="80" />
          <el-table-column label="建议价" width="110">
            <template #default="{ row }">
              <div>{{ fmt(row.suggestedPrice) }}</div>
              <div class="basis">{{ row.priceBasis }}</div>
            </template>
          </el-table-column>
          <el-table-column label="市场最低" width="90">
            <template #default="{ row }">{{ row.marketLowest ? fmt(row.marketLowest) : '—' }}</template>
          </el-table-column>
          <el-table-column label="近期成交" width="90">
            <template #default="{ row }">{{ row.lastTradePrice ? fmt(row.lastTradePrice) : '无成交' }}</template>
          </el-table-column>
          <el-table-column label="明细 / 操作" min-width="220">
            <template #default="{ row }">
              <div v-for="c in row.sellCards" :key="c.cardId" class="sell-line">
                <el-tag v-if="c.riskLow" type="danger" size="small">可能被秒扫</el-tag>
                <span v-if="c.myPrice">挂 {{ fmt(c.myPrice) }}</span>
                <span v-else class="dim">{{ c.title || '未挂' }}</span>
                <el-button v-if="c.riskLow" size="small" type="warning" link
                           @click="reprice(row, c)">改价</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="140" fixed="right">
            <template #default="{ row }">
              <el-button size="small" type="primary" :disabled="pending"
                         @click="previewSell(row)">挂单 {{ row.sellCount }} 张</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <!-- ===================== 页签 3：我的成交 ===================== -->
      <el-tab-pane label="我的成交" name="trades">
        <el-row :gutter="12" class="mb12" v-if="trades">
          <el-col :span="6"><el-card shadow="hover" class="stat">
            <div class="stat-val">{{ trades.count }}</div><div class="stat-label">成交笔数</div></el-card></el-col>
          <el-col :span="6"><el-card shadow="hover" class="stat">
            <div class="stat-val">{{ fmt(trades.totalNet) }}</div><div class="stat-label">净收入（魔力）</div></el-card></el-col>
          <el-col :span="6"><el-card shadow="hover" class="stat">
            <div class="stat-val">{{ fmt(trades.totalFee) }}</div><div class="stat-label">手续费（5%）</div></el-card></el-col>
        </el-row>
        <el-table :data="trades ? trades.trades : []" v-loading="tradesLoading" size="small" border>
          <el-table-column prop="tradedAt" label="成交时间" width="150" />
          <el-table-column prop="filmName" label="片名" min-width="150" show-overflow-tooltip />
          <el-table-column prop="rarity" label="稀有度" width="70" />
          <el-table-column prop="price" label="成交价" width="90" />
          <el-table-column prop="fee" label="手续费" width="80" />
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <!-- 挂单预览确认（强制二次确认） -->
    <el-dialog v-model="confirmVisible" title="挂单预览确认" width="520">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="片名">{{ confirmRow?.filmName }}</el-descriptions-item>
        <el-descriptions-item label="稀有度">{{ confirmRow?.rarity }}</el-descriptions-item>
        <el-descriptions-item label="挂单张数">{{ confirmRow?.sellCount }}</el-descriptions-item>
        <el-descriptions-item label="建议单价">{{ fmt(confirmRow?.suggestedPrice) }}</el-descriptions-item>
        <el-descriptions-item label="买家支付单价">{{ fmt(buyerPrice) }}（含5%手续费）</el-descriptions-item>
        <el-descriptions-item label="预计实收合计">{{ fmt(confirmRow?.sellCount * confirmRow?.suggestedPrice) }}</el-descriptions-item>
      </el-descriptions>
      <el-alert type="warning" :closable="false" class="mt12"
                title="确认后逐张调用挂单接口，失败项会单独列出，不会中断整批。" />
      <template #footer>
        <el-button @click="confirmVisible = false">取消</el-button>
        <el-button type="primary" :loading="pending" @click="doSell">确认挂单</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "MtCardManager",
  data() {
    return {
      tab: "overview",
      status: { has_key: false, enabled: false },
      overview: null,
      dupGroups: [],
      dupLoading: false,
      trades: null,
      tradesLoading: false,
      confirmVisible: false,
      confirmRow: null,
      pending: false,
      timer: null,
    };
  },
  computed: {
    overviewCards() {
      const o = this.overview || {};
      return [
        { label: "收藏卡总数", value: o.totalCards ?? "—" },
        { label: "薪王", value: o.xinwang ?? "—" },
        { label: "UR", value: (o.spines || []).find(s => s.rarity === "UR")?.count ?? "—" },
        { label: "守护濒危", value: o.guardingFlames ?? "—" },
        { label: "完成卡册", value: o.completedAlbums ?? "—" },
        { label: "排名", value: o.rank ?? "—" },
      ];
    },
    buyerPrice() {
      if (!this.confirmRow) return 0;
      return Math.ceil(this.confirmRow.suggestedPrice / (1 - 0.05));
    },
  },
  mounted() {
    this.loadStatus();
    this.loadOverview();
    this.timer = setInterval(() => this.loadOverview(), 30 * 60 * 1000); // 30 分钟自动刷新
  },
  beforeUnmount() {
    if (this.timer) clearInterval(this.timer);
  },
  methods: {
    fmt(v) {
      if (v === null || v === undefined) return "—";
      return Number(v).toLocaleString("zh-CN");
    },
    async loadStatus() {
      const r = await this.$axios(`/api/v1/plugin/MtCardManager/status`);
      if (r?.data) this.status = r.data;
    },
    async loadOverview() {
      const r = await this.$axios(`/api/v1/plugin/MtCardManager/overview`);
      if (r?.data?.success) this.overview = r.data.data;
    },
    async loadDup() {
      this.dupLoading = true;
      try {
        const r = await this.$axios(`/api/v1/plugin/MtCardManager/dup-plan`);
        if (r?.data?.success) this.dupGroups = r.data.data;
      } finally {
        this.dupLoading = false;
      }
    },
    async loadTrades() {
      this.tradesLoading = true;
      try {
        const r = await this.$axios(`/api/v1/plugin/MtCardManager/mytrades`);
        if (r?.data?.success) this.trades = r.data.data;
      } finally {
        this.tradesLoading = false;
      }
    },
    previewSell(row) {
      this.confirmRow = row;
      this.confirmVisible = true;
    },
    async doSell() {
      this.pending = true;
      const fails = [];
      let ok = 0;
      try {
        for (const c of this.confirmRow.sellCards) {
          const r = await this.$axios.post(`/api/v1/plugin/MtCardManager/sell`, {
            card_id: c.cardId,
            net_price: this.confirmRow.suggestedPrice,
          });
          if (r?.data?.success) ok += 1;
          else fails.push(`${c.title || c.cardId}: ${r?.data?.message || "失败"}`);
        }
        this.$message.success(`挂单完成：成功 ${ok} 张${fails.length ? `，失败 ${fails.length} 张` : ""}`);
        if (fails.length) this.$notify({ title: "失败明细", message: fails.join("<br/>"), type: "warning", duration: 0 });
        this.confirmVisible = false;
        this.loadDup();
      } finally {
        this.pending = false;
      }
    },
    async reprice(group, card) {
      // 撤单 → 按建议价重挂（撤单后重挂走同一确认逻辑）
      const r = await this.$axios.post(`/api/v1/plugin/MtCardManager/cancel`, { order_id: card.orderId });
      if (r?.data?.success) {
        this.$message.success("已撤单，请从「挂单」按钮按建议价重挂");
        this.loadDup();
      } else {
        this.$message.error(r?.data?.message || "撤单失败");
      }
    },
  },
  watch: {
    tab(t) {
      if (t === "dup" && !this.dupGroups.length) this.loadDup();
      if (t === "trades" && !this.trades) this.loadTrades();
    },
  },
};
</script>

<style scoped>
.mtcard { padding: 4px; }
.stat { text-align: center; }
.stat-val { font-size: 22px; font-weight: 600; }
.stat-label { font-size: 12px; color: var(--el-text-color-secondary); margin-top: 4px; }
.mt12 { margin-top: 12px; }
.mb12 { margin-bottom: 12px; }
.basis { font-size: 11px; color: var(--el-text-color-secondary); }
.sell-line { display: flex; align-items: center; gap: 6px; line-height: 22px; }
.dim { color: var(--el-text-color-secondary); }
</style>
