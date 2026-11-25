const __mfPromiseGlobalKey = "__mf_init__virtual:mf:__mfe_internal__MtCardManager__mf_owner__230321079372433__mf_v__runtimeInit__mf_v__.js__";
let __mfPromiseState = globalThis[__mfPromiseGlobalKey];
if (!__mfPromiseState) {
  let initResolve, initReject;
  const initPromise = new Promise((re, rj) => {
    initResolve = re;
    initReject = rj;
  });
  __mfPromiseState = globalThis[__mfPromiseGlobalKey] = {
    initPromise,
    initResolve,
    initReject,
  };
  
}
const initPromise = __mfPromiseState.initPromise;

    
const __mfCacheGlobalKey = "__mf_module_cache__";
globalThis[__mfCacheGlobalKey] ||= { share: {}, remote: {} };
globalThis[__mfCacheGlobalKey].share ||= {};
globalThis[__mfCacheGlobalKey].remote ||= {};
const __mfModuleCache = globalThis[__mfCacheGlobalKey];
const __mfTrackPendingShareLoad = (promise) => {
  const pendingShareLoads = (__mfModuleCache.pendingShareLoads ||= []);
  pendingShareLoads.push(promise);
  const cleanup = () => {
    const index = pendingShareLoads.indexOf(promise);
    if (index !== -1) pendingShareLoads.splice(index, 1);
  };
  void promise.then(cleanup, cleanup);
  return promise;
};
for (const __mfShareKey of Object.keys(__mfModuleCache.share)) {
  if (__mfShareKey.startsWith("default:")) {
    const __mfLegacyShareKey = __mfShareKey.slice("default:".length);
    if (__mfModuleCache.share[__mfLegacyShareKey] === undefined) {
      __mfModuleCache.share[__mfLegacyShareKey] = __mfModuleCache.share[__mfShareKey];
    }
  } else if (!__mfShareKey.includes(":")) {
    const __mfDefaultShareKey = "default:" + __mfShareKey;
    if (__mfModuleCache.share[__mfDefaultShareKey] === undefined) {
      __mfModuleCache.share[__mfDefaultShareKey] = __mfModuleCache.share[__mfShareKey];
    }
  }
}
          const __mfReadSharedCache = (cache, descriptor) => {
            const value = cache[descriptor.canonical];
            if (value !== undefined) return value;
            const aliases = descriptor.aliases || [];
            for (const alias of aliases) {
              if (!Object.prototype.hasOwnProperty.call(cache, alias)) continue;
              const aliasValue = cache[alias];
              if (aliasValue !== undefined) {
                cache[descriptor.canonical] = aliasValue;
                return aliasValue;
              }
            }
            return undefined;
          };
          const __mfSharedCacheListenersKey = Symbol.for("module-federation.shared-cache-listeners");
          const __mfGetSharedCacheListeners = (cache) => {
            let listeners = cache[__mfSharedCacheListenersKey];
            if (listeners === undefined) {
              listeners = Object.create(null);
              Object.defineProperty(cache, __mfSharedCacheListenersKey, {
                value: listeners,
                enumerable: false,
                configurable: false,
                writable: false
              });
            }
            return listeners;
          };
          const __mfSubscribeSharedCache = (cache, descriptor, listener) => {
            const listeners = __mfGetSharedCacheListeners(cache);
            (listeners[descriptor.canonical] ||= new Set()).add(listener);
          };
    let __mf_0;
    let __mf_1;
    let __mf_2;
    let __mf_3;
    let __mf_4;
    let __mf_5;
    let __mf_6;
    let __mf_7;
    let __mf_8;
    let __mf_9;
    let __mf_10;
    let __mf_11;
    let __mf_12;
    let __mf_13;
    let __mf_14;
    let __mf_15;
    let __mf_16;
    let __mf_17;
    let __mf_18;
    let __mf_19;
    const __mfApplyHostProvidedExports = (exportModule) => {
      __mf_0 = exportModule["createApp"];
      __mf_1 = exportModule["withKeys"];
      __mf_2 = exportModule["ref"];
      __mf_3 = exportModule["normalizeClass"];
      __mf_4 = exportModule["toDisplayString"];
      __mf_5 = exportModule["Fragment"];
      __mf_6 = exportModule["computed"];
      __mf_7 = exportModule["createBlock"];
      __mf_8 = exportModule["createCommentVNode"];
      __mf_9 = exportModule["createElementBlock"];
      __mf_10 = exportModule["createElementVNode"];
      __mf_11 = exportModule["createTextVNode"];
      __mf_12 = exportModule["createVNode"];
      __mf_13 = exportModule["onMounted"];
      __mf_14 = exportModule["onUnmounted"];
      __mf_15 = exportModule["openBlock"];
      __mf_16 = exportModule["renderList"];
      __mf_17 = exportModule["resolveComponent"];
      __mf_18 = exportModule["watch"];
      __mf_19 = exportModule["withCtx"];
      exportModule.default ?? exportModule;
    };
    let exportModule = __mfReadSharedCache(__mfModuleCache.share, {"canonical":"default:vue@3.5.46","aliases":["vue@3.5.46"]});
    if (exportModule === undefined) {
      __mfSubscribeSharedCache(__mfModuleCache.share, {"canonical":"default:vue@3.5.46"}, (mod) => {
        exportModule = mod;
        __mfApplyHostProvidedExports(mod);
      });
      __mfTrackPendingShareLoad(initPromise.then(() => {
        exportModule = __mfReadSharedCache(__mfModuleCache.share, {"canonical":"default:vue@3.5.46","aliases":["vue@3.5.46"]});
        // A share init() left to its dynamic import is normally bridged before that import runs;
        // bridge it here when this wrapper is reached another way.
        if (exportModule === undefined && typeof __mfPromiseState.loadLazyShares === "function") {
          return __mfPromiseState.loadLazyShares(["vue"]).then(() => {
            exportModule = __mfReadSharedCache(__mfModuleCache.share, {"canonical":"default:vue@3.5.46","aliases":["vue@3.5.46"]});
          });
        }
      }).then(() => {
        if (exportModule === undefined) {
          throw new Error("[Module Federation] Shared module vue was imported before federation bootstrap finished.");
        }
        __mfApplyHostProvidedExports(exportModule);
      }));
    } else {
      __mfApplyHostProvidedExports(exportModule);
    }

const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const _hoisted_1 = { class: "d-flex align-center justify-space-between mb-2" };
const _hoisted_2 = { class: "text-caption text-medium-emphasis" };
const _hoisted_3 = {
  key: 0,
  class: "ml-3"
};
const _hoisted_4 = { class: "text-h5 font-weight-bold" };
const _hoisted_5 = { class: "text-caption text-medium-emphasis" };
const _hoisted_6 = {
  style: {"width":"48px"},
  class: "text-caption"
};
const _hoisted_7 = {
  class: "text-caption",
  style: {"width":"56px","text-align":"right"}
};
const _hoisted_8 = { class: "d-flex align-center justify-space-between" };
const _hoisted_9 = {
  key: 0,
  class: "text-caption text-medium-emphasis"
};
const _hoisted_10 = {
  key: 1,
  class: "text-caption text-medium-emphasis"
};
const _hoisted_11 = {
  key: 2,
  class: "text-center pa-6 text-medium-emphasis"
};
const _hoisted_12 = { class: "d-flex align-center mb-2" };
const _hoisted_13 = {
  class: "text-truncate",
  style: {"max-width":"160px"}
};
const _hoisted_14 = { class: "text-caption text-medium-emphasis" };
const _hoisted_15 = {
  key: 2,
  class: "text-center pa-6 text-medium-emphasis"
};
const _hoisted_16 = { class: "text-h6" };
const _hoisted_17 = { class: "text-h6" };
const _hoisted_18 = { class: "text-h6" };
const _hoisted_19 = {
  key: 2,
  class: "text-medium-emphasis"
};
const _hoisted_20 = {
  key: 0,
  class: "text-center pa-4 text-medium-emphasis"
};
const _hoisted_21 = {
  key: 0,
  class: "text-center pa-4 text-medium-emphasis"
};
const _hoisted_22 = {
  key: 1,
  class: "text-center pa-6 text-medium-emphasis"
};
const _hoisted_23 = { class: "text-h5" };
const _hoisted_24 = { class: "text-h5" };
const _hoisted_25 = { class: "text-h5" };
const _hoisted_26 = { class: "text-caption text-medium-emphasis" };
const _hoisted_27 = {
  key: 0,
  class: "text-caption"
};
const _hoisted_28 = {
  key: 1,
  class: "text-caption text-medium-emphasis"
};
const _hoisted_29 = { class: "font-weight-bold" };
const _hoisted_30 = {
  key: 2,
  class: "text-medium-emphasis"
};
const _hoisted_31 = {
  key: 0,
  class: "text-caption text-warning mt-2"
};


const _sfc_main = {
  __name: 'Workbench',
  props: {
  api: { type: Object, default: () => ({}) },
},
  emits: ['action', 'close'],
  setup(__props) {

const props = __props;


// ---------------- 状态 ----------------
const tab = __mf_2('overview');
const status = __mf_2(null);            // null=加载中，避免首屏误报
const overview = __mf_2(null);
const overviewLoading = __mf_2(false);
const loaded = __mf_2(false);
const lastSync = __mf_2('');
const dupGroups = __mf_2([]);
const dupLoading = __mf_2(false);
const dupFilter = __mf_2('dup');
const dupSummaryLoaded = __mf_2(false);
const trades = __mf_2(null);
const tradesLoading = __mf_2(false);
const myOrders = __mf_2(null);
const cfg = __mf_2(null);
const pending = __mf_2(false);

// 市场行情
const marketQuery = __mf_2('');
const marketRarity = __mf_2('');
const marketData = __mf_2(null);
const marketSearched = __mf_2(false);
const marketLoading = __mf_2(false);

// 确认弹窗
const confirmVisible = __mf_2(false);
const confirmRow = __mf_2(null);
const confirmCustomPrice = __mf_2(null);
const repriceVisible = __mf_2(false);
const repriceRow = __mf_2(null);
const buyVisible = __mf_2(false);
const buyRow = __mf_2(null);

// 设置
const syncInterval = __mf_2(30);
const syncOptions = [
  { label: '10 分钟', value: 10 }, { label: '30 分钟', value: 30 },
  { label: '60 分钟', value: 60 }, { label: '不自动刷新', value: 0 },
];
const basePrices = { N: 4410, R: 8000, SR: 15000, SSR: 40000, UR: 100000 };
const rarityOptions = ['N', 'R', 'SR', 'SSR', 'UR'];

const toast = __mf_2({ show: false, text: '', color: 'success' });
function notify(text, color = 'success') { toast.value = { show: true, text, color }; }

// ---------------- 工具 ----------------
const fmt = (v) => (v === null || v === undefined || v === '' ? '—' : Number(v).toLocaleString('zh-CN'));
const rarityColor = (r) => ({ N: 'grey', R: 'blue', SR: 'purple', SSR: 'orange', UR: 'red' }[r] || 'primary');

const overviewCards = __mf_6(() => {
  const o = overview.value || {};
  o.rarityDistribution || {};
  return [
    { label: '收藏卡', value: o.totalCards ?? '—' },
    { label: '守护濒危', value: o.guardingFlames ?? '—' },
    { label: '薪王', value: o.xinwang ?? '—' },
    { label: '完成卡册', value: o.completedAlbums ?? '—' },
    { label: '段位', value: o.rank ?? '—' },
    { label: '卡册进度', value: (o.spines || []).length ?? '—' },
  ]
});
const rarityList = __mf_6(() => {
  const o = overview.value || {};
  const dist = o.rarityDistribution || {};
  const order = o.rarityOrder || rarityOptions;
  const total = Object.values(dist).reduce((a, b) => a + b, 0) || 1;
  return order.filter(r => dist[r] != null).map(r => ({
    rarity: r, count: dist[r], pct: Math.round(dist[r] / total * 100),
  }))
});
const dupGroupCount = __mf_6(() => dupGroups.value.length);
const dupSellable = __mf_6(() => dupGroups.value.reduce((s, g) => s + (g.sellCount || 0), 0));
const filteredDup = __mf_6(() => {
  let list = dupGroups.value;
  if (dupFilter.value === 'dup') return list
  if (dupFilter.value === 'listed') return list.filter(g => g.sellCards?.some(c => c.myPrice))
  if (dupFilter.value === 'sold') return list  // 已成交在「我的成交」页签，此处展示全部作参考
  return list
});
const confirmPrice = __mf_6(() => confirmCustomPrice.value || confirmRow.value?.suggestedPrice || 0);
const buyerPrice = __mf_6(() => Math.ceil(confirmPrice.value / 0.95));
const buyCompare = __mf_6(() => marketData.value?.lastTradePrice || null);

// ---------------- API ----------------
async function req(path, method = 'get', data = undefined) {
  return props.api[method](`plugin/MtCardManager/${path}`, data)
}
async function loadStatus() {
  try { const r = await req('status'); if (r?.success) status.value = r.data; } catch {}
}
async function refreshOverview() {
  overviewLoading.value = true;
  try {
    const r = await req('overview');
    if (r?.success) {
      overview.value = r.data;
      lastSync.value = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    } else notify(r?.message || '总览加载失败', 'error');
    loaded.value = true;
  } catch { loaded.value = true; }
  finally { overviewLoading.value = false; }
}
async function loadDup() {
  dupLoading.value = true;
  try {
    const r = await req('dup-plan');
    if (r?.success) { dupGroups.value = r.data; dupSummaryLoaded.value = true; await loadMyOrders(); }
    else notify(r?.message || '重复卡加载失败', 'error');
  } finally { dupLoading.value = false; }
}
async function loadMyOrders() {
  try { const r = await req('myorders'); if (r?.success) myOrders.value = r.data; } catch {}
}
async function loadTrades() {
  tradesLoading.value = true;
  try { const r = await req('mytrades'); if (r?.success) trades.value = r.data; }
  finally { tradesLoading.value = false; }
}
async function loadConfig() {
  try { const r = await req('config'); if (r?.success) cfg.value = r.data; } catch {}
}
async function loadMarket() {
  if (!marketQuery.value.trim()) { notify('请输入片名', 'warning'); return }
  marketLoading.value = true; marketSearched.value = true;
  try {
    // GET 参数拼进 URL（宿主 api.get 的 data 不一定转 query，拼接最稳妥）
    const q = encodeURIComponent(marketQuery.value.trim());
    const rv = encodeURIComponent(marketRarity.value || '');
    const r = await req(`market?film_name=${q}&rarity=${rv}`);
    if (r?.success) marketData.value = r.data;
    else { marketData.value = null; notify(r?.message || '行情加载失败', 'error'); }
  } finally { marketLoading.value = false; }
}
function goDup() { tab.value = 'dup'; if (!dupGroups.value.length) loadDup(); }

// 挂单
function previewSell(row) { confirmRow.value = row; confirmCustomPrice.value = null; confirmVisible.value = true; }
async function doSell() {
  pending.value = true;
  let ok = 0; const fails = [];
  try {
    for (const c of confirmRow.value.sellCards) {
      try {
        const r = await req('sell', 'post', { card_id: c.cardId, net_price: Number(confirmPrice.value) });
        if (r?.success) ok++; else fails.push(`${c.title || c.cardId}: ${r?.message || '失败'}`);
      } catch { fails.push(`${c.title || c.cardId}: 异常`); }
    }
    confirmVisible.value = false;
    notify(`挂单完成：成功 ${ok}${fails.length ? `，失败 ${fails.length}（${fails[0]}）` : ''}`, fails.length ? 'warning' : 'success');
    await loadDup();
  } finally { pending.value = false; }
}

// 撤单改价
function openReprice(row) { repriceRow.value = row; repriceVisible.value = true; }
async function doReprice() {
  pending.value = true;
  let ok = 0; const fails = [];
  try {
    for (const o of repriceRow.value.listedOrders || []) {
      try {
        const cr = await req('cancel', 'post', { order_id: o.orderId });
        if (!cr?.success) { fails.push(`撤单 ${o.orderId}: ${cr?.message || '失败'}`); continue }
        const sr = await req('sell', 'post', { card_id: o.cardId, net_price: Number(repriceRow.value.suggestedPrice) });
        if (sr?.success) ok++; else fails.push(`重挂 ${o.cardId}: ${sr?.message || '失败'}`);
      } catch { fails.push(`${o.cardId}: 异常`); }
    }
    repriceVisible.value = false;
    notify(`撤单改价完成：成功 ${ok}${fails.length ? `，失败 ${fails.length}` : ''}`, fails.length ? 'warning' : 'success');
    await loadDup();
  } finally { pending.value = false; }
}

// 买卡（手动确认）
function previewBuy(o) { buyRow.value = o; buyVisible.value = true; }
async function doBuy() {
  pending.value = true;
  try {
    const body = buyRow.value.orderId
      ? { order_id: buyRow.value.orderId }
      : { film_id: buyRow.value.filmId, rarity: buyRow.value.rarity, price: Number(buyRow.value.price) };
    const r = await req('buy', 'post', body);
    if (r?.success) { notify('买入成功'); buyVisible.value = false; await loadMarket(); }
    else notify(`买入失败：${r?.message || '未知错误'}`, 'error');
  } finally { pending.value = false; buyVisible.value = false; }
}

// ---------------- 生命周期 ----------------
let autoTimer = null;
function setupAuto() {
  if (autoTimer) clearInterval(autoTimer);
  const m = Number(syncInterval.value);
  if (m > 0) autoTimer = setInterval(() => {
    refreshOverview();
    if (tab.value === 'dup') loadDup();
    if (tab.value === 'trades') loadTrades();
  }, m * 60 * 1000);
}
__mf_13(async () => {
  await loadStatus();
  await Promise.all([refreshOverview(), loadConfig()]);
  setupAuto();
});
__mf_14(() => { if (autoTimer) clearInterval(autoTimer); });
__mf_18(syncInterval, setupAuto);
__mf_18(tab, (t) => {
  if (t === 'dup' && !dupGroups.value.length) loadDup();
  if (t === 'trades' && !trades.value) loadTrades();
});

return (_ctx, _cache) => {
  const _component_v_alert = __mf_17("v-alert");
  const _component_v_tab = __mf_17("v-tab");
  const _component_v_tabs = __mf_17("v-tabs");
  const _component_v_btn = __mf_17("v-btn");
  const _component_v_card = __mf_17("v-card");
  const _component_v_col = __mf_17("v-col");
  const _component_v_row = __mf_17("v-row");
  const _component_v_progress_linear = __mf_17("v-progress-linear");
  const _component_v_window_item = __mf_17("v-window-item");
  const _component_v_chip = __mf_17("v-chip");
  const _component_v_chip_group = __mf_17("v-chip-group");
  const _component_v_spacer = __mf_17("v-spacer");
  const _component_v_table = __mf_17("v-table");
  const _component_v_text_field = __mf_17("v-text-field");
  const _component_v_select = __mf_17("v-select");
  const _component_v_card_title = __mf_17("v-card-title");
  const _component_v_divider = __mf_17("v-divider");
  const _component_v_window = __mf_17("v-window");
  const _component_v_card_text = __mf_17("v-card-text");
  const _component_v_card_actions = __mf_17("v-card-actions");
  const _component_v_dialog = __mf_17("v-dialog");
  const _component_v_snackbar = __mf_17("v-snackbar");
  const _component_v_container = __mf_17("v-container");

  return (__mf_15(), __mf_7(_component_v_container, {
    fluid: "",
    class: "pa-2 mt-card"
  }, {
    default: __mf_19(() => [
      (status.value && !status.value.has_key)
        ? (__mf_15(), __mf_7(_component_v_alert, {
            key: 0,
            type: "warning",
            variant: "tonal",
            class: "mb-3",
            text: "未找到馒头 API Key，请先在 MP「站点管理」给馒头填写 apikey（控制台→实验室→存取令牌）"
          }))
        : __mf_8("", true),
      __mf_12(_component_v_tabs, {
        modelValue: tab.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((tab).value = $event)),
        color: "primary",
        "show-arrows": ""
      }, {
        default: __mf_19(() => [
          __mf_12(_component_v_tab, { value: "overview" }, {
            default: __mf_19(() => [...(_cache[13] || (_cache[13] = [
              __mf_11("总览", -1)
            ]))]),
            _: 1
          }),
          __mf_12(_component_v_tab, { value: "dup" }, {
            default: __mf_19(() => [...(_cache[14] || (_cache[14] = [
              __mf_11("重复卡挂单", -1)
            ]))]),
            _: 1
          }),
          __mf_12(_component_v_tab, { value: "market" }, {
            default: __mf_19(() => [...(_cache[15] || (_cache[15] = [
              __mf_11("市场行情", -1)
            ]))]),
            _: 1
          }),
          __mf_12(_component_v_tab, { value: "trades" }, {
            default: __mf_19(() => [...(_cache[16] || (_cache[16] = [
              __mf_11("我的成交", -1)
            ]))]),
            _: 1
          }),
          __mf_12(_component_v_tab, { value: "settings" }, {
            default: __mf_19(() => [...(_cache[17] || (_cache[17] = [
              __mf_11("设置", -1)
            ]))]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["modelValue"]),
      __mf_12(_component_v_window, {
        modelValue: tab.value,
        "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => ((tab).value = $event)),
        class: "mt-3"
      }, {
        default: __mf_19(() => [
          __mf_12(_component_v_window_item, { value: "overview" }, {
            default: __mf_19(() => [
              __mf_10("div", _hoisted_1, [
                __mf_10("div", _hoisted_2, [
                  __mf_10("span", {
                    class: __mf_3(status.value?.has_key ? 'text-success' : 'text-medium-emphasis')
                  }, __mf_4(status.value?.has_key ? '● 已连接站点' : '○ 连接状态未知'), 3),
                  (lastSync.value)
                    ? (__mf_15(), __mf_9("span", _hoisted_3, "上次同步 " + __mf_4(lastSync.value), 1))
                    : __mf_8("", true)
                ]),
                __mf_12(_component_v_btn, {
                  size: "x-small",
                  variant: "tonal",
                  loading: overviewLoading.value,
                  onClick: refreshOverview
                }, {
                  default: __mf_19(() => [...(_cache[18] || (_cache[18] = [
                    __mf_11(" 手动刷新 ", -1)
                  ]))]),
                  _: 1
                }, 8, ["loading"])
              ]),
              (overview.value)
                ? (__mf_15(), __mf_7(_component_v_row, { key: 0 }, {
                    default: __mf_19(() => [
                      (__mf_15(true), __mf_9(__mf_5, null, __mf_16(overviewCards.value, (m) => {
                        return (__mf_15(), __mf_7(_component_v_col, {
                          key: m.label,
                          cols: "6",
                          md: "2"
                        }, {
                          default: __mf_19(() => [
                            __mf_12(_component_v_card, {
                              variant: "tonal",
                              class: "text-center pa-3"
                            }, {
                              default: __mf_19(() => [
                                __mf_10("div", _hoisted_4, __mf_4(m.value), 1),
                                __mf_10("div", _hoisted_5, __mf_4(m.label), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024))
                      }), 128))
                    ]),
                    _: 1
                  }))
                : __mf_8("", true),
              (overview.value)
                ? (__mf_15(), __mf_7(_component_v_card, {
                    key: 1,
                    variant: "outlined",
                    class: "pa-3 mt-3"
                  }, {
                    default: __mf_19(() => [
                      _cache[19] || (_cache[19] = __mf_10("div", { class: "text-subtitle-2 mb-2" }, "稀有度分布（卡册进度）", -1)),
                      (__mf_15(true), __mf_9(__mf_5, null, __mf_16(rarityList.value, (rv) => {
                        return (__mf_15(), __mf_9("div", {
                          key: rv.rarity,
                          class: "d-flex align-center mb-1"
                        }, [
                          __mf_10("span", _hoisted_6, __mf_4(rv.rarity), 1),
                          __mf_12(_component_v_progress_linear, {
                            "model-value": rv.pct,
                            color: rarityColor(rv.rarity),
                            height: "10",
                            rounded: "",
                            class: "flex-grow-1 mx-2"
                          }, null, 8, ["model-value", "color"]),
                          __mf_10("span", _hoisted_7, __mf_4(rv.count) + " (" + __mf_4(rv.pct) + "%)", 1)
                        ]))
                      }), 128))
                    ]),
                    _: 1
                  }))
                : __mf_8("", true),
              __mf_12(_component_v_card, {
                variant: "outlined",
                class: "pa-3 mt-3"
              }, {
                default: __mf_19(() => [
                  __mf_10("div", _hoisted_8, [
                    __mf_10("div", null, [
                      _cache[20] || (_cache[20] = __mf_10("div", { class: "text-subtitle-2" }, "重复卡摘要", -1)),
                      (dupSummaryLoaded.value)
                        ? (__mf_15(), __mf_9("div", _hoisted_9, __mf_4(dupGroupCount.value) + " 组重复 · 可卖 " + __mf_4(dupSellable.value) + " 张（同片同稀有度留1张，优先薪王） ", 1))
                        : (__mf_15(), __mf_9("div", _hoisted_10, "切到「重复卡挂单」页签自动统计"))
                    ]),
                    __mf_12(_component_v_btn, {
                      size: "x-small",
                      variant: "text",
                      onClick: goDup
                    }, {
                      default: __mf_19(() => [...(_cache[21] || (_cache[21] = [
                        __mf_11("查看重复卡 →", -1)
                      ]))]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              }),
              (!overview.value && loaded.value)
                ? (__mf_15(), __mf_9("div", _hoisted_11, "暂无数据"))
                : __mf_8("", true)
            ]),
            _: 1
          }),
          __mf_12(_component_v_window_item, { value: "dup" }, {
            default: __mf_19(() => [
              __mf_12(_component_v_alert, {
                type: "info",
                variant: "tonal",
                class: "mb-3",
                density: "compact",
                text: "同片同稀有度留 1 张（优先薪王）。我的挂牌价 < 近期成交价 标红提示可能被秒扫；无真实成交时不标红。"
              }),
              __mf_10("div", _hoisted_12, [
                __mf_12(_component_v_chip_group, {
                  modelValue: dupFilter.value,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((dupFilter).value = $event)),
                  "selected-class": "text-primary",
                  filter: ""
                }, {
                  default: __mf_19(() => [
                    __mf_12(_component_v_chip, {
                      value: "all",
                      size: "small"
                    }, {
                      default: __mf_19(() => [...(_cache[22] || (_cache[22] = [
                        __mf_11("全部", -1)
                      ]))]),
                      _: 1
                    }),
                    __mf_12(_component_v_chip, {
                      value: "dup",
                      size: "small"
                    }, {
                      default: __mf_19(() => [...(_cache[23] || (_cache[23] = [
                        __mf_11("仅重复", -1)
                      ]))]),
                      _: 1
                    }),
                    __mf_12(_component_v_chip, {
                      value: "listed",
                      size: "small"
                    }, {
                      default: __mf_19(() => [...(_cache[24] || (_cache[24] = [
                        __mf_11("已挂单", -1)
                      ]))]),
                      _: 1
                    }),
                    __mf_12(_component_v_chip, {
                      value: "sold",
                      size: "small"
                    }, {
                      default: __mf_19(() => [...(_cache[25] || (_cache[25] = [
                        __mf_11("已成交", -1)
                      ]))]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue"]),
                __mf_12(_component_v_spacer),
                __mf_12(_component_v_btn, {
                  size: "x-small",
                  variant: "tonal",
                  loading: dupLoading.value,
                  onClick: loadDup
                }, {
                  default: __mf_19(() => [...(_cache[26] || (_cache[26] = [
                    __mf_11("刷新", -1)
                  ]))]),
                  _: 1
                }, 8, ["loading"])
              ]),
              (dupLoading.value)
                ? (__mf_15(), __mf_7(_component_v_progress_linear, {
                    key: 0,
                    indeterminate: ""
                  }))
                : (__mf_15(), __mf_7(_component_v_table, {
                    key: 1,
                    density: "compact"
                  }, {
                    default: __mf_19(() => [
                      _cache[27] || (_cache[27] = __mf_10("thead", null, [
                        __mf_10("tr", null, [
                          __mf_10("th", null, "片名"),
                          __mf_10("th", null, "稀有度"),
                          __mf_10("th", null, "可卖"),
                          __mf_10("th", null, "建议价"),
                          __mf_10("th", null, "市场最低"),
                          __mf_10("th", null, "近期成交"),
                          __mf_10("th", null, "操作")
                        ])
                      ], -1)),
                      __mf_10("tbody", null, [
                        (__mf_15(true), __mf_9(__mf_5, null, __mf_16(filteredDup.value, (g) => {
                          return (__mf_15(), __mf_9("tr", {
                            key: g.filmId + g.rarity
                          }, [
                            __mf_10("td", _hoisted_13, __mf_4(g.filmName), 1),
                            __mf_10("td", null, __mf_4(g.rarity), 1),
                            __mf_10("td", null, __mf_4(g.sellCount), 1),
                            __mf_10("td", null, [
                              __mf_11(__mf_4(fmt(g.suggestedPrice)), 1),
                              __mf_10("div", _hoisted_14, __mf_4(g.priceBasis), 1)
                            ]),
                            __mf_10("td", null, __mf_4(g.marketLowest ? fmt(g.marketLowest) : '—'), 1),
                            __mf_10("td", {
                              class: __mf_3(g.lastTradePrice ? '' : 'text-medium-emphasis')
                            }, __mf_4(g.lastTradePrice ? fmt(g.lastTradePrice) : '无真实成交'), 3),
                            __mf_10("td", null, [
                              (__mf_15(true), __mf_9(__mf_5, null, __mf_16(g.sellCards, (c) => {
                                return (__mf_15(), __mf_7(_component_v_chip, {
                                  key: c.cardId,
                                  size: "small",
                                  color: c.riskLow ? 'error' : 'default',
                                  class: "mr-1 mb-1",
                                  variant: "tonal"
                                }, {
                                  default: __mf_19(() => [
                                    __mf_11(__mf_4(c.title || '卡'), 1),
                                    (c.myPrice)
                                      ? (__mf_15(), __mf_9(__mf_5, { key: 0 }, [
                                          __mf_11(" 挂" + __mf_4(fmt(c.myPrice)), 1)
                                        ], 64))
                                      : __mf_8("", true),
                                    (c.riskLow)
                                      ? (__mf_15(), __mf_9(__mf_5, { key: 1 }, [
                                          __mf_11(" ·低价风险")
                                        ], 64))
                                      : __mf_8("", true)
                                  ]),
                                  _: 2
                                }, 1032, ["color"]))
                              }), 128)),
                              __mf_12(_component_v_btn, {
                                size: "x-small",
                                color: "primary",
                                loading: pending.value,
                                onClick: $event => (previewSell(g))
                              }, {
                                default: __mf_19(() => [
                                  __mf_11(" 挂" + __mf_4(g.sellCount) + "张 ", 1)
                                ]),
                                _: 2
                              }, 1032, ["loading", "onClick"]),
                              (g.listedOrders && g.listedOrders.length)
                                ? (__mf_15(), __mf_7(_component_v_btn, {
                                    key: 0,
                                    size: "x-small",
                                    color: "warning",
                                    variant: "text",
                                    class: "ml-1",
                                    onClick: $event => (openReprice(g))
                                  }, {
                                    default: __mf_19(() => [
                                      __mf_11(" 撤单改价(" + __mf_4(g.listedOrders.length) + ") ", 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["onClick"]))
                                : __mf_8("", true)
                            ])
                          ]))
                        }), 128))
                      ])
                    ]),
                    _: 1
                  })),
              (!dupLoading.value && !filteredDup.value.length)
                ? (__mf_15(), __mf_9("div", _hoisted_15, " 无可显示的重复卡 "))
                : __mf_8("", true)
            ]),
            _: 1
          }),
          __mf_12(_component_v_window_item, { value: "market" }, {
            default: __mf_19(() => [
              __mf_12(_component_v_alert, {
                type: "info",
                variant: "tonal",
                class: "mb-3",
                density: "compact",
                text: "挂价可能是虚高/玩笑价，无真实成交会标注。买卡为手动确认版：选中在售挂单→二次确认→才下单，绝不自动买。"
              }),
              __mf_12(_component_v_row, {
                class: "mb-2",
                align: "center"
              }, {
                default: __mf_19(() => [
                  __mf_12(_component_v_col, {
                    cols: "8",
                    md: "5"
                  }, {
                    default: __mf_19(() => [
                      __mf_12(_component_v_text_field, {
                        modelValue: marketQuery.value,
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((marketQuery).value = $event)),
                        label: "搜索片名",
                        density: "compact",
                        "hide-details": "",
                        onKeyup: __mf_1(loadMarket, ["enter"])
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  __mf_12(_component_v_col, {
                    cols: "4",
                    md: "2"
                  }, {
                    default: __mf_19(() => [
                      __mf_12(_component_v_select, {
                        modelValue: marketRarity.value,
                        "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((marketRarity).value = $event)),
                        items: rarityOptions,
                        label: "稀有度",
                        density: "compact",
                        "hide-details": "",
                        clearable: ""
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  __mf_12(_component_v_col, { cols: "auto" }, {
                    default: __mf_19(() => [
                      __mf_12(_component_v_btn, {
                        color: "primary",
                        size: "small",
                        loading: marketLoading.value,
                        onClick: loadMarket
                      }, {
                        default: __mf_19(() => [...(_cache[28] || (_cache[28] = [
                          __mf_11("搜索行情", -1)
                        ]))]),
                        _: 1
                      }, 8, ["loading"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              (marketData.value)
                ? (__mf_15(), __mf_9(__mf_5, { key: 0 }, [
                    __mf_12(_component_v_row, { class: "mb-2" }, {
                      default: __mf_19(() => [
                        __mf_12(_component_v_col, {
                          cols: "4",
                          md: "3"
                        }, {
                          default: __mf_19(() => [
                            __mf_12(_component_v_card, {
                              variant: "tonal",
                              class: "text-center pa-2"
                            }, {
                              default: __mf_19(() => [
                                __mf_10("div", _hoisted_16, __mf_4(fmt(marketData.value.lowestAsk)), 1),
                                _cache[29] || (_cache[29] = __mf_10("div", { class: "text-caption" }, "最低挂价", -1))
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        __mf_12(_component_v_col, {
                          cols: "4",
                          md: "3"
                        }, {
                          default: __mf_19(() => [
                            __mf_12(_component_v_card, {
                              variant: "tonal",
                              class: "text-center pa-2"
                            }, {
                              default: __mf_19(() => [
                                __mf_10("div", _hoisted_17, __mf_4(marketData.value.hasRealTrades ? fmt(marketData.value.lastTradePrice) : '无'), 1),
                                _cache[30] || (_cache[30] = __mf_10("div", { class: "text-caption" }, "近期成交价", -1))
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        __mf_12(_component_v_col, {
                          cols: "4",
                          md: "3"
                        }, {
                          default: __mf_19(() => [
                            __mf_12(_component_v_card, {
                              variant: "tonal",
                              class: "text-center pa-2"
                            }, {
                              default: __mf_19(() => [
                                __mf_10("div", _hoisted_18, __mf_4(marketData.value.totalOrders ?? '—'), 1),
                                _cache[31] || (_cache[31] = __mf_10("div", { class: "text-caption" }, "挂单总数", -1))
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    __mf_12(_component_v_card, {
                      variant: "outlined",
                      class: "mb-3"
                    }, {
                      default: __mf_19(() => [
                        __mf_12(_component_v_card_title, { class: "text-subtitle-2 py-2" }, {
                          default: __mf_19(() => [
                            _cache[33] || (_cache[33] = __mf_11("在售挂单（ask） ", -1)),
                            (!marketData.value.hasRealTrades)
                              ? (__mf_15(), __mf_7(_component_v_chip, {
                                  key: 0,
                                  size: "x-small",
                                  color: "warning",
                                  class: "ml-2"
                                }, {
                                  default: __mf_19(() => [...(_cache[32] || (_cache[32] = [
                                    __mf_11("无真实成交", -1)
                                  ]))]),
                                  _: 1
                                }))
                              : __mf_8("", true)
                          ]),
                          _: 1
                        }),
                        __mf_12(_component_v_table, { density: "compact" }, {
                          default: __mf_19(() => [
                            _cache[37] || (_cache[37] = __mf_10("thead", null, [
                              __mf_10("tr", null, [
                                __mf_10("th", null, "价格"),
                                __mf_10("th", null, "稀有度"),
                                __mf_10("th", null, "称号"),
                                __mf_10("th", null, "对比成交"),
                                __mf_10("th", null, "操作")
                              ])
                            ], -1)),
                            __mf_10("tbody", null, [
                              (__mf_15(true), __mf_9(__mf_5, null, __mf_16(marketData.value.asks, (o, i) => {
                                return (__mf_15(), __mf_9("tr", { key: i }, [
                                  __mf_10("td", null, __mf_4(fmt(o.price)), 1),
                                  __mf_10("td", null, __mf_4(o.rarity), 1),
                                  __mf_10("td", null, __mf_4(o.title || '—'), 1),
                                  __mf_10("td", null, [
                                    (o.aboveLastTrade)
                                      ? (__mf_15(), __mf_7(_component_v_chip, {
                                          key: 0,
                                          size: "x-small",
                                          color: "warning",
                                          variant: "tonal"
                                        }, {
                                          default: __mf_19(() => [...(_cache[34] || (_cache[34] = [
                                            __mf_11("高于最近成交", -1)
                                          ]))]),
                                          _: 1
                                        }))
                                      : (marketData.value.hasRealTrades)
                                        ? (__mf_15(), __mf_7(_component_v_chip, {
                                            key: 1,
                                            size: "x-small",
                                            color: "success",
                                            variant: "tonal"
                                          }, {
                                            default: __mf_19(() => [...(_cache[35] || (_cache[35] = [
                                              __mf_11("低于/等于成交", -1)
                                            ]))]),
                                            _: 1
                                          }))
                                        : (__mf_15(), __mf_9("span", _hoisted_19, "无成交参考"))
                                  ]),
                                  __mf_10("td", null, [
                                    __mf_12(_component_v_btn, {
                                      size: "x-small",
                                      color: "primary",
                                      variant: "tonal",
                                      onClick: $event => (previewBuy(o))
                                    }, {
                                      default: __mf_19(() => [...(_cache[36] || (_cache[36] = [
                                        __mf_11("买入", -1)
                                      ]))]),
                                      _: 1
                                    }, 8, ["onClick"])
                                  ])
                                ]))
                              }), 128))
                            ])
                          ]),
                          _: 1
                        }),
                        (!marketData.value.asks.length)
                          ? (__mf_15(), __mf_9("div", _hoisted_20, "无在售挂单"))
                          : __mf_8("", true)
                      ]),
                      _: 1
                    }),
                    (marketData.value.bids && marketData.value.bids.length)
                      ? (__mf_15(), __mf_7(_component_v_card, {
                          key: 0,
                          variant: "outlined",
                          class: "mb-3"
                        }, {
                          default: __mf_19(() => [
                            __mf_12(_component_v_card_title, { class: "text-subtitle-2 py-2" }, {
                              default: __mf_19(() => [...(_cache[38] || (_cache[38] = [
                                __mf_11("买单（bid）", -1)
                              ]))]),
                              _: 1
                            }),
                            __mf_12(_component_v_table, { density: "compact" }, {
                              default: __mf_19(() => [
                                _cache[39] || (_cache[39] = __mf_10("thead", null, [
                                  __mf_10("tr", null, [
                                    __mf_10("th", null, "价格"),
                                    __mf_10("th", null, "稀有度"),
                                    __mf_10("th", null, "称号")
                                  ])
                                ], -1)),
                                __mf_10("tbody", null, [
                                  (__mf_15(true), __mf_9(__mf_5, null, __mf_16(marketData.value.bids, (o, i) => {
                                    return (__mf_15(), __mf_9("tr", { key: i }, [
                                      __mf_10("td", null, __mf_4(fmt(o.price)), 1),
                                      __mf_10("td", null, __mf_4(o.rarity), 1),
                                      __mf_10("td", null, __mf_4(o.title || '—'), 1)
                                    ]))
                                  }), 128))
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }))
                      : __mf_8("", true),
                    __mf_12(_component_v_card, { variant: "outlined" }, {
                      default: __mf_19(() => [
                        __mf_12(_component_v_card_title, { class: "text-subtitle-2 py-2" }, {
                          default: __mf_19(() => [...(_cache[40] || (_cache[40] = [
                            __mf_11("近期成交", -1)
                          ]))]),
                          _: 1
                        }),
                        __mf_12(_component_v_table, { density: "compact" }, {
                          default: __mf_19(() => [
                            _cache[41] || (_cache[41] = __mf_10("thead", null, [
                              __mf_10("tr", null, [
                                __mf_10("th", null, "时间"),
                                __mf_10("th", null, "价格"),
                                __mf_10("th", null, "称号"),
                                __mf_10("th", null, "手续费")
                              ])
                            ], -1)),
                            __mf_10("tbody", null, [
                              (__mf_15(true), __mf_9(__mf_5, null, __mf_16(marketData.value.recentTrades, (t, i) => {
                                return (__mf_15(), __mf_9("tr", { key: i }, [
                                  __mf_10("td", null, __mf_4(t.tradedAt), 1),
                                  __mf_10("td", null, __mf_4(fmt(t.price)), 1),
                                  __mf_10("td", null, __mf_4(t.title || '—'), 1),
                                  __mf_10("td", null, __mf_4(fmt(t.fee)), 1)
                                ]))
                              }), 128))
                            ])
                          ]),
                          _: 1
                        }),
                        (!marketData.value.recentTrades.length)
                          ? (__mf_15(), __mf_9("div", _hoisted_21, " 该片稀有度暂无真实成交，挂价仅供参考 "))
                          : __mf_8("", true)
                      ]),
                      _: 1
                    })
                  ], 64))
                : (marketSearched.value)
                  ? (__mf_15(), __mf_9("div", _hoisted_22, "未查到行情"))
                  : __mf_8("", true)
            ]),
            _: 1
          }),
          __mf_12(_component_v_window_item, { value: "trades" }, {
            default: __mf_19(() => [
              (trades.value)
                ? (__mf_15(), __mf_7(_component_v_row, {
                    key: 0,
                    class: "mb-2"
                  }, {
                    default: __mf_19(() => [
                      __mf_12(_component_v_col, { cols: "4" }, {
                        default: __mf_19(() => [
                          __mf_12(_component_v_card, {
                            variant: "tonal",
                            class: "text-center pa-3"
                          }, {
                            default: __mf_19(() => [
                              __mf_10("div", _hoisted_23, __mf_4(trades.value.count), 1),
                              _cache[42] || (_cache[42] = __mf_10("div", { class: "text-caption" }, "成交笔数", -1))
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      __mf_12(_component_v_col, { cols: "4" }, {
                        default: __mf_19(() => [
                          __mf_12(_component_v_card, {
                            variant: "tonal",
                            class: "text-center pa-3"
                          }, {
                            default: __mf_19(() => [
                              __mf_10("div", _hoisted_24, __mf_4(fmt(trades.value.totalNet)), 1),
                              _cache[43] || (_cache[43] = __mf_10("div", { class: "text-caption" }, "净收入", -1))
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      __mf_12(_component_v_col, { cols: "4" }, {
                        default: __mf_19(() => [
                          __mf_12(_component_v_card, {
                            variant: "tonal",
                            class: "text-center pa-3"
                          }, {
                            default: __mf_19(() => [
                              __mf_10("div", _hoisted_25, __mf_4(fmt(trades.value.totalFee)), 1),
                              _cache[44] || (_cache[44] = __mf_10("div", { class: "text-caption" }, "手续费", -1))
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }))
                : __mf_8("", true),
              __mf_12(_component_v_table, { density: "compact" }, {
                default: __mf_19(() => [
                  _cache[45] || (_cache[45] = __mf_10("thead", null, [
                    __mf_10("tr", null, [
                      __mf_10("th", null, "时间"),
                      __mf_10("th", null, "片名"),
                      __mf_10("th", null, "稀有度"),
                      __mf_10("th", null, "成交价"),
                      __mf_10("th", null, "手续费")
                    ])
                  ], -1)),
                  __mf_10("tbody", null, [
                    (__mf_15(true), __mf_9(__mf_5, null, __mf_16((trades.value ? trades.value.trades : []), (t, i) => {
                      return (__mf_15(), __mf_9("tr", { key: i }, [
                        __mf_10("td", null, __mf_4(t.tradedAt), 1),
                        __mf_10("td", null, __mf_4(t.filmName), 1),
                        __mf_10("td", null, __mf_4(t.rarity), 1),
                        __mf_10("td", null, __mf_4(fmt(t.price)), 1),
                        __mf_10("td", null, __mf_4(fmt(t.fee)), 1)
                      ]))
                    }), 128))
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          __mf_12(_component_v_window_item, { value: "settings" }, {
            default: __mf_19(() => [
              __mf_12(_component_v_card, {
                variant: "outlined",
                class: "pa-4"
              }, {
                default: __mf_19(() => [
                  _cache[47] || (_cache[47] = __mf_10("div", { class: "text-subtitle-2 mb-3" }, "连接与同步", -1)),
                  __mf_12(_component_v_row, null, {
                    default: __mf_19(() => [
                      __mf_12(_component_v_col, {
                        cols: "12",
                        md: "6"
                      }, {
                        default: __mf_19(() => [
                          __mf_12(_component_v_select, {
                            modelValue: syncInterval.value,
                            "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => ((syncInterval).value = $event)),
                            items: syncOptions,
                            "item-title": "label",
                            "item-value": "value",
                            label: "自动刷新间隔（分钟）",
                            density: "compact",
                            "hide-details": ""
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                      }),
                      __mf_12(_component_v_col, {
                        cols: "12",
                        md: "6",
                        class: "d-flex align-center"
                      }, {
                        default: __mf_19(() => [
                          __mf_10("div", _hoisted_26, " API Key：" + __mf_4(status.value?.key_hint || '未读取') + "（自动从站点配置读取，不手填；日志脱敏） ", 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  __mf_12(_component_v_divider, { class: "my-4" }),
                  _cache[48] || (_cache[48] = __mf_10("div", { class: "text-subtitle-2 mb-2" }, "费率与基准价", -1)),
                  _cache[49] || (_cache[49] = __mf_10("div", { class: "text-caption mb-2" }, "挂单手续费 5%（站点自动算挂牌价 = 实收 / 0.95）。以下为无市场样本时的建议价兜底基准。", -1)),
                  __mf_12(_component_v_table, { density: "compact" }, {
                    default: __mf_19(() => [
                      _cache[46] || (_cache[46] = __mf_10("thead", null, [
                        __mf_10("tr", null, [
                          __mf_10("th", null, "稀有度"),
                          __mf_10("th", null, "基准价（魔力）")
                        ])
                      ], -1)),
                      __mf_10("tbody", null, [
                        (__mf_15(), __mf_9(__mf_5, null, __mf_16(basePrices, (v, k) => {
                          return __mf_10("tr", { key: k }, [
                            __mf_10("td", null, __mf_4(k), 1),
                            __mf_10("td", null, __mf_4(fmt(v)), 1)
                          ])
                        }), 64))
                      ])
                    ]),
                    _: 1
                  }),
                  __mf_12(_component_v_divider, { class: "my-4" }),
                  _cache[50] || (_cache[50] = __mf_10("div", { class: "text-subtitle-2 mb-2" }, "站点参数（仅展示，插件不自动分解/转蛋）", -1)),
                  (cfg.value)
                    ? (__mf_15(), __mf_9("div", _hoisted_27, " 分解灰燼：N " + __mf_4(cfg.value.decompose?.n) + " / R " + __mf_4(cfg.value.decompose?.r) + " / SR " + __mf_4(cfg.value.decompose?.sr) + " / SSR " + __mf_4(cfg.value.decompose?.ssr) + "； 开包成本 " + __mf_4(cfg.value.pack?.cost) + " 灰燼/次 ", 1))
                    : (__mf_15(), __mf_9("div", _hoisted_28, "加载中…"))
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["modelValue"]),
      __mf_12(_component_v_dialog, {
        modelValue: confirmVisible.value,
        "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => ((confirmVisible).value = $event)),
        "max-width": "520"
      }, {
        default: __mf_19(() => [
          __mf_12(_component_v_card, { class: "pa-4" }, {
            default: __mf_19(() => [
              __mf_12(_component_v_card_title, { class: "text-h6" }, {
                default: __mf_19(() => [...(_cache[51] || (_cache[51] = [
                  __mf_11("挂单预览确认", -1)
                ]))]),
                _: 1
              }),
              __mf_12(_component_v_card_text, null, {
                default: __mf_19(() => [
                  __mf_12(_component_v_table, { density: "compact" }, {
                    default: __mf_19(() => [
                      __mf_10("tbody", null, [
                        __mf_10("tr", null, [
                          _cache[52] || (_cache[52] = __mf_10("td", null, "片名", -1)),
                          __mf_10("td", null, __mf_4(confirmRow.value?.filmName), 1)
                        ]),
                        __mf_10("tr", null, [
                          _cache[53] || (_cache[53] = __mf_10("td", null, "稀有度", -1)),
                          __mf_10("td", null, __mf_4(confirmRow.value?.rarity), 1)
                        ]),
                        __mf_10("tr", null, [
                          _cache[54] || (_cache[54] = __mf_10("td", null, "挂单张数", -1)),
                          __mf_10("td", null, __mf_4(confirmRow.value?.sellCount), 1)
                        ]),
                        __mf_10("tr", null, [
                          _cache[55] || (_cache[55] = __mf_10("td", null, "建议单价（实收）", -1)),
                          __mf_10("td", null, __mf_4(fmt(confirmPrice.value)), 1)
                        ]),
                        __mf_10("tr", null, [
                          _cache[56] || (_cache[56] = __mf_10("td", null, "买家支付单价", -1)),
                          __mf_10("td", null, __mf_4(fmt(buyerPrice.value)) + "（含5%手续费）", 1)
                        ]),
                        __mf_10("tr", null, [
                          _cache[57] || (_cache[57] = __mf_10("td", null, "预计实收合计", -1)),
                          __mf_10("td", null, __mf_4(fmt(confirmRow.value?.sellCount * confirmPrice.value)), 1)
                        ]),
                        __mf_10("tr", null, [
                          _cache[58] || (_cache[58] = __mf_10("td", null, "当前挂单占用", -1)),
                          __mf_10("td", null, __mf_4(myOrders.value?.total ?? '—') + " / 约61", 1)
                        ])
                      ])
                    ]),
                    _: 1
                  }),
                  (myOrders.value?.orderLimitWarn)
                    ? (__mf_15(), __mf_7(_component_v_alert, {
                        key: 0,
                        type: "warning",
                        variant: "tonal",
                        class: "mt-3",
                        density: "compact",
                        text: "挂单已接近上限（约61），新挂单可能失败，建议先撤单或等成交。"
                      }))
                    : __mf_8("", true),
                  __mf_12(_component_v_alert, {
                    type: "warning",
                    variant: "tonal",
                    class: "mt-3",
                    density: "compact",
                    text: "确认后逐张挂单，失败项会单独提示，不中断整批。"
                  })
                ]),
                _: 1
              }),
              __mf_12(_component_v_card_actions, { class: "justify-end" }, {
                default: __mf_19(() => [
                  __mf_12(_component_v_btn, {
                    variant: "text",
                    onClick: _cache[6] || (_cache[6] = $event => (confirmVisible.value=false))
                  }, {
                    default: __mf_19(() => [...(_cache[59] || (_cache[59] = [
                      __mf_11("取消", -1)
                    ]))]),
                    _: 1
                  }),
                  __mf_12(_component_v_btn, {
                    color: "primary",
                    loading: pending.value,
                    onClick: doSell
                  }, {
                    default: __mf_19(() => [...(_cache[60] || (_cache[60] = [
                      __mf_11("确认挂单", -1)
                    ]))]),
                    _: 1
                  }, 8, ["loading"])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["modelValue"]),
      __mf_12(_component_v_dialog, {
        modelValue: repriceVisible.value,
        "onUpdate:modelValue": _cache[9] || (_cache[9] = $event => ((repriceVisible).value = $event)),
        "max-width": "520"
      }, {
        default: __mf_19(() => [
          __mf_12(_component_v_card, { class: "pa-4" }, {
            default: __mf_19(() => [
              __mf_12(_component_v_card_title, { class: "text-h6" }, {
                default: __mf_19(() => [...(_cache[61] || (_cache[61] = [
                  __mf_11("撤单改价确认", -1)
                ]))]),
                _: 1
              }),
              __mf_12(_component_v_card_text, null, {
                default: __mf_19(() => [
                  _cache[67] || (_cache[67] = __mf_10("div", { class: "text-caption mb-2" }, "先撤下当前挂单，再按新价重新挂。不会自动撤单，需你确认。", -1)),
                  __mf_12(_component_v_table, { density: "compact" }, {
                    default: __mf_19(() => [
                      __mf_10("tbody", null, [
                        __mf_10("tr", null, [
                          _cache[62] || (_cache[62] = __mf_10("td", null, "片名", -1)),
                          __mf_10("td", null, __mf_4(repriceRow.value?.filmName), 1)
                        ]),
                        __mf_10("tr", null, [
                          _cache[63] || (_cache[63] = __mf_10("td", null, "待撤订单", -1)),
                          __mf_10("td", null, __mf_4(repriceRow.value?.listedOrders?.length || 0) + " 张", 1)
                        ]),
                        __mf_10("tr", null, [
                          _cache[64] || (_cache[64] = __mf_10("td", null, "当前挂牌价", -1)),
                          __mf_10("td", null, __mf_4(fmt(repriceRow.value?.listedOrders?.[0]?.price)), 1)
                        ]),
                        __mf_10("tr", null, [
                          _cache[65] || (_cache[65] = __mf_10("td", null, "新建议价（实收）", -1)),
                          __mf_10("td", null, __mf_4(fmt(repriceRow.value?.suggestedPrice)), 1)
                        ]),
                        __mf_10("tr", null, [
                          _cache[66] || (_cache[66] = __mf_10("td", null, "近期成交价", -1)),
                          __mf_10("td", null, __mf_4(repriceRow.value?.lastTradePrice ? fmt(repriceRow.value.lastTradePrice) : '无真实成交'), 1)
                        ])
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              __mf_12(_component_v_card_actions, { class: "justify-end" }, {
                default: __mf_19(() => [
                  __mf_12(_component_v_btn, {
                    variant: "text",
                    onClick: _cache[8] || (_cache[8] = $event => (repriceVisible.value=false))
                  }, {
                    default: __mf_19(() => [...(_cache[68] || (_cache[68] = [
                      __mf_11("取消", -1)
                    ]))]),
                    _: 1
                  }),
                  __mf_12(_component_v_btn, {
                    color: "warning",
                    loading: pending.value,
                    onClick: doReprice
                  }, {
                    default: __mf_19(() => [...(_cache[69] || (_cache[69] = [
                      __mf_11("确认撤单改价", -1)
                    ]))]),
                    _: 1
                  }, 8, ["loading"])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["modelValue"]),
      __mf_12(_component_v_dialog, {
        modelValue: buyVisible.value,
        "onUpdate:modelValue": _cache[11] || (_cache[11] = $event => ((buyVisible).value = $event)),
        "max-width": "520"
      }, {
        default: __mf_19(() => [
          __mf_12(_component_v_card, { class: "pa-4" }, {
            default: __mf_19(() => [
              __mf_12(_component_v_card_title, { class: "text-h6" }, {
                default: __mf_19(() => [...(_cache[70] || (_cache[70] = [
                  __mf_11("买入确认", -1)
                ]))]),
                _: 1
              }),
              __mf_12(_component_v_card_text, null, {
                default: __mf_19(() => [
                  __mf_12(_component_v_alert, {
                    type: "warning",
                    variant: "tonal",
                    class: "mb-3",
                    density: "compact",
                    text: "手动确认版：只有点「确认买入」才会下单扣魔力。请自行核对当前魔力余额（站点接口不提供余额查询）。"
                  }),
                  __mf_12(_component_v_table, { density: "compact" }, {
                    default: __mf_19(() => [
                      __mf_10("tbody", null, [
                        __mf_10("tr", null, [
                          _cache[71] || (_cache[71] = __mf_10("td", null, "片名", -1)),
                          __mf_10("td", null, __mf_4(buyRow.value?.filmName), 1)
                        ]),
                        __mf_10("tr", null, [
                          _cache[72] || (_cache[72] = __mf_10("td", null, "稀有度 / 称号", -1)),
                          __mf_10("td", null, __mf_4(buyRow.value?.rarity) + " / " + __mf_4(buyRow.value?.title || '—'), 1)
                        ]),
                        __mf_10("tr", null, [
                          _cache[73] || (_cache[73] = __mf_10("td", null, "花费（魔力）", -1)),
                          __mf_10("td", _hoisted_29, __mf_4(fmt(buyRow.value?.price)), 1)
                        ]),
                        __mf_10("tr", null, [
                          _cache[74] || (_cache[74] = __mf_10("td", null, "近期成交价", -1)),
                          __mf_10("td", null, __mf_4(buyCompare.value ? fmt(buyCompare.value) : '无真实成交'), 1)
                        ]),
                        __mf_10("tr", null, [
                          _cache[77] || (_cache[77] = __mf_10("td", null, "价格提示", -1)),
                          __mf_10("td", null, [
                            (buyRow.value?.aboveLastTrade)
                              ? (__mf_15(), __mf_7(_component_v_chip, {
                                  key: 0,
                                  size: "x-small",
                                  color: "warning"
                                }, {
                                  default: __mf_19(() => [...(_cache[75] || (_cache[75] = [
                                    __mf_11("高于最近成交，注意虚高", -1)
                                  ]))]),
                                  _: 1
                                }))
                              : (buyCompare.value)
                                ? (__mf_15(), __mf_7(_component_v_chip, {
                                    key: 1,
                                    size: "x-small",
                                    color: "success"
                                  }, {
                                    default: __mf_19(() => [...(_cache[76] || (_cache[76] = [
                                      __mf_11("低于/等于成交", -1)
                                    ]))]),
                                    _: 1
                                  }))
                                : (__mf_15(), __mf_9("span", _hoisted_30, "无成交参考"))
                          ])
                        ])
                      ])
                    ]),
                    _: 1
                  }),
                  (buyRow.value?.retiredHint)
                    ? (__mf_15(), __mf_9("div", _hoisted_31, " 该片可能已缴交退场，缴交后只能从市场买回。 "))
                    : __mf_8("", true)
                ]),
                _: 1
              }),
              __mf_12(_component_v_card_actions, { class: "justify-end" }, {
                default: __mf_19(() => [
                  __mf_12(_component_v_btn, {
                    variant: "text",
                    onClick: _cache[10] || (_cache[10] = $event => (buyVisible.value=false))
                  }, {
                    default: __mf_19(() => [...(_cache[78] || (_cache[78] = [
                      __mf_11("取消", -1)
                    ]))]),
                    _: 1
                  }),
                  __mf_12(_component_v_btn, {
                    color: "primary",
                    loading: pending.value,
                    onClick: doBuy
                  }, {
                    default: __mf_19(() => [...(_cache[79] || (_cache[79] = [
                      __mf_11("确认买入", -1)
                    ]))]),
                    _: 1
                  }, 8, ["loading"])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["modelValue"]),
      __mf_12(_component_v_snackbar, {
        modelValue: toast.value.show,
        "onUpdate:modelValue": _cache[12] || (_cache[12] = $event => ((toast.value.show) = $event)),
        color: toast.value.color,
        timeout: "3500",
        location: "bottom"
      }, {
        default: __mf_19(() => [
          __mf_11(__mf_4(toast.value.text), 1)
        ]),
        _: 1
      }, 8, ["modelValue", "color"])
    ]),
    _: 1
  }))
}
}

};
const Workbench = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-af430e26"]]);

export { Workbench as W, __mf_15 as _, __mf_7 as a, __mf_13 as b, __mf_0 as c };
