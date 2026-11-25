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
    const __mfApplyHostProvidedExports = (exportModule) => {
      __mf_0 = exportModule["createApp"];
      __mf_1 = exportModule["ref"];
      __mf_2 = exportModule["normalizeClass"];
      __mf_3 = exportModule["toDisplayString"];
      __mf_4 = exportModule["Fragment"];
      __mf_5 = exportModule["computed"];
      __mf_6 = exportModule["createBlock"];
      __mf_7 = exportModule["createCommentVNode"];
      __mf_8 = exportModule["createElementBlock"];
      __mf_9 = exportModule["createElementVNode"];
      __mf_10 = exportModule["createTextVNode"];
      __mf_11 = exportModule["createVNode"];
      __mf_12 = exportModule["onMounted"];
      __mf_13 = exportModule["openBlock"];
      __mf_14 = exportModule["renderList"];
      __mf_15 = exportModule["resolveComponent"];
      __mf_16 = exportModule["watch"];
      __mf_17 = exportModule["withCtx"];
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

const _hoisted_1 = { class: "text-h5 font-weight-bold" };
const _hoisted_2 = { class: "text-caption text-medium-emphasis" };
const _hoisted_3 = {
  key: 1,
  class: "text-center pa-6 text-medium-emphasis"
};
const _hoisted_4 = {
  class: "text-truncate",
  style: {"max-width":"180px"}
};
const _hoisted_5 = { class: "text-caption text-medium-emphasis" };
const _hoisted_6 = { class: "text-h5" };
const _hoisted_7 = { class: "text-h5" };
const _hoisted_8 = { class: "text-h5" };


const _sfc_main = {
  __name: 'Workbench',
  props: {
  api: { type: Object, default: () => ({}) },
},
  emits: ['action', 'close'],
  setup(__props) {

const props = __props;


const tab = __mf_1('overview');
const status = __mf_1(null);  // null=加载中，避免首屏误报"未找到 API Key"
const overview = __mf_1(null);
const dupGroups = __mf_1([]);
const trades = __mf_1(null);
const dupLoading = __mf_1(false);
const tradesLoading = __mf_1(false);
const loaded = __mf_1(false);
const pending = __mf_1(false);
const confirmVisible = __mf_1(false);
const confirmRow = __mf_1(null);

const fmt = (v) => (v === null || v === undefined ? '—' : Number(v).toLocaleString('zh-CN'));
const overviewCards = __mf_5(() => {
  const o = overview.value || {};
  return [
    { label: '收藏卡', value: o.totalCards ?? '—' },
    { label: '守护濒危', value: o.guardingFlames ?? '—' },
    { label: '薪王', value: o.xinwang ?? '—' },
    { label: '完成卡册', value: o.completedAlbums ?? '—' },
    { label: '段位', value: o.rank ?? '—' },
    { label: '卡册进度', value: (o.spines || []).length ?? '—' },
  ]
});
const buyerPrice = __mf_5(() => confirmRow.value ? Math.ceil(confirmRow.value.suggestedPrice / 0.95) : 0);

// 宿主注入 api 的 baseURL 已含 /api/v1/，传相对路径；返回 payload 直接读取
async function req(path, method = 'get', data = undefined) {
  const r = await props.api[method](`plugin/MtCardManager/${path}`, data);
  return r
}

async function loadStatus() {
  try { const r = await req('status'); if (r?.success) status.value = r.data; } catch {}
}
async function loadOverview() {
  try {
    const r = await req('overview');
    if (r?.success) overview.value = r.data;
    loaded.value = true;
  } catch { loaded.value = true; }
}
async function loadDup() {
  dupLoading.value = true;
  try { const r = await req('dup-plan'); if (r?.success) dupGroups.value = r.data; }
  finally { dupLoading.value = false; }
}
async function loadTrades() {
  tradesLoading.value = true;
  try { const r = await req('mytrades'); if (r?.success) trades.value = r.data; }
  finally { tradesLoading.value = false; }
}
function previewSell(row) { confirmRow.value = row; confirmVisible.value = true; }
async function doSell() {
  pending.value = true;
  let ok = 0; const fails = [];
  try {
    for (const c of confirmRow.value.sellCards) {
      try {
        const r = await req('sell', 'post', { card_id: c.cardId, net_price: confirmRow.value.suggestedPrice });
        if (r?.success) ok++; else fails.push(`${c.title || c.cardId}: ${r?.message || '失败'}`);
      } catch (e) { fails.push(`${c.title || c.cardId}: 异常`); }
    }
    confirmVisible.value = false;
    await loadDup();
  } finally { pending.value = false; }
}

__mf_12(() => { loadStatus(); loadOverview(); });
__mf_16(tab, (t) => {
  if (t === 'dup' && !dupGroups.value.length) loadDup();
  if (t === 'trades' && !trades.value) loadTrades();
});

return (_ctx, _cache) => {
  const _component_v_alert = __mf_15("v-alert");
  const _component_v_tab = __mf_15("v-tab");
  const _component_v_tabs = __mf_15("v-tabs");
  const _component_v_card = __mf_15("v-card");
  const _component_v_col = __mf_15("v-col");
  const _component_v_row = __mf_15("v-row");
  const _component_v_window_item = __mf_15("v-window-item");
  const _component_v_progress_linear = __mf_15("v-progress-linear");
  const _component_v_chip = __mf_15("v-chip");
  const _component_v_btn = __mf_15("v-btn");
  const _component_v_table = __mf_15("v-table");
  const _component_v_window = __mf_15("v-window");
  const _component_v_card_title = __mf_15("v-card-title");
  const _component_v_card_text = __mf_15("v-card-text");
  const _component_v_card_actions = __mf_15("v-card-actions");
  const _component_v_dialog = __mf_15("v-dialog");
  const _component_v_container = __mf_15("v-container");

  return (__mf_13(), __mf_6(_component_v_container, {
    fluid: "",
    class: "pa-2 mt-card"
  }, {
    default: __mf_17(() => [
      (status.value && !status.value.has_key)
        ? (__mf_13(), __mf_6(_component_v_alert, {
            key: 0,
            type: "warning",
            variant: "tonal",
            class: "mb-3",
            text: "未找到馒头 API Key，请先在 MP「站点管理」给馒头填写 apikey（控制台→实验室→存取令牌）"
          }))
        : __mf_7("", true),
      __mf_11(_component_v_tabs, {
        modelValue: tab.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((tab).value = $event)),
        color: "primary"
      }, {
        default: __mf_17(() => [
          __mf_11(_component_v_tab, { value: "overview" }, {
            default: __mf_17(() => [...(_cache[4] || (_cache[4] = [
              __mf_10("总览", -1)
            ]))]),
            _: 1
          }),
          __mf_11(_component_v_tab, { value: "dup" }, {
            default: __mf_17(() => [...(_cache[5] || (_cache[5] = [
              __mf_10("重复卡挂单", -1)
            ]))]),
            _: 1
          }),
          __mf_11(_component_v_tab, { value: "trades" }, {
            default: __mf_17(() => [...(_cache[6] || (_cache[6] = [
              __mf_10("我的成交", -1)
            ]))]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["modelValue"]),
      __mf_11(_component_v_window, {
        modelValue: tab.value,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((tab).value = $event)),
        class: "mt-3"
      }, {
        default: __mf_17(() => [
          __mf_11(_component_v_window_item, { value: "overview" }, {
            default: __mf_17(() => [
              (overview.value)
                ? (__mf_13(), __mf_6(_component_v_row, { key: 0 }, {
                    default: __mf_17(() => [
                      (__mf_13(true), __mf_8(__mf_4, null, __mf_14(overviewCards.value, (m) => {
                        return (__mf_13(), __mf_6(_component_v_col, {
                          key: m.label,
                          cols: "6",
                          md: "2"
                        }, {
                          default: __mf_17(() => [
                            __mf_11(_component_v_card, {
                              variant: "tonal",
                              class: "text-center pa-3"
                            }, {
                              default: __mf_17(() => [
                                __mf_9("div", _hoisted_1, __mf_3(m.value), 1),
                                __mf_9("div", _hoisted_2, __mf_3(m.label), 1)
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
                : (loaded.value)
                  ? (__mf_13(), __mf_8("div", _hoisted_3, "暂无数据"))
                  : __mf_7("", true)
            ]),
            _: 1
          }),
          __mf_11(_component_v_window_item, { value: "dup" }, {
            default: __mf_17(() => [
              __mf_11(_component_v_alert, {
                type: "info",
                variant: "tonal",
                class: "mb-3",
                density: "compact",
                text: "同片同稀有度留 1 张（优先薪王）。挂牌价 < 近期成交价 标红提示可能被秒扫。"
              }),
              (dupLoading.value)
                ? (__mf_13(), __mf_6(_component_v_progress_linear, {
                    key: 0,
                    indeterminate: ""
                  }))
                : (__mf_13(), __mf_6(_component_v_table, {
                    key: 1,
                    density: "compact"
                  }, {
                    default: __mf_17(() => [
                      _cache[7] || (_cache[7] = __mf_9("thead", null, [
                        __mf_9("tr", null, [
                          __mf_9("th", null, "片名"),
                          __mf_9("th", null, "稀有度"),
                          __mf_9("th", null, "可卖"),
                          __mf_9("th", null, "建议价"),
                          __mf_9("th", null, "市场最低"),
                          __mf_9("th", null, "近期成交"),
                          __mf_9("th", null, "操作")
                        ])
                      ], -1)),
                      __mf_9("tbody", null, [
                        (__mf_13(true), __mf_8(__mf_4, null, __mf_14(dupGroups.value, (g) => {
                          return (__mf_13(), __mf_8("tr", {
                            key: g.filmId + g.rarity
                          }, [
                            __mf_9("td", _hoisted_4, __mf_3(g.filmName), 1),
                            __mf_9("td", null, __mf_3(g.rarity), 1),
                            __mf_9("td", null, __mf_3(g.sellCount), 1),
                            __mf_9("td", null, [
                              __mf_10(__mf_3(fmt(g.suggestedPrice)), 1),
                              __mf_9("div", _hoisted_5, __mf_3(g.priceBasis), 1)
                            ]),
                            __mf_9("td", null, __mf_3(g.marketLowest ? fmt(g.marketLowest) : '—'), 1),
                            __mf_9("td", {
                              class: __mf_2(g.lastTradePrice ? '' : 'text-medium-emphasis')
                            }, __mf_3(g.lastTradePrice ? fmt(g.lastTradePrice) : '无成交'), 3),
                            __mf_9("td", null, [
                              (__mf_13(true), __mf_8(__mf_4, null, __mf_14(g.sellCards, (c) => {
                                return (__mf_13(), __mf_6(_component_v_chip, {
                                  key: c.cardId,
                                  size: "small",
                                  color: c.riskLow ? 'error' : 'default',
                                  class: "mr-1 mb-1",
                                  variant: "tonal"
                                }, {
                                  default: __mf_17(() => [
                                    __mf_10(__mf_3(c.title || '卡'), 1),
                                    (c.myPrice)
                                      ? (__mf_13(), __mf_8(__mf_4, { key: 0 }, [
                                          __mf_10(" 挂" + __mf_3(fmt(c.myPrice)), 1)
                                        ], 64))
                                      : __mf_7("", true),
                                    (c.riskLow)
                                      ? (__mf_13(), __mf_8(__mf_4, { key: 1 }, [
                                          __mf_10(" ·低价风险")
                                        ], 64))
                                      : __mf_7("", true)
                                  ]),
                                  _: 2
                                }, 1032, ["color"]))
                              }), 128)),
                              __mf_11(_component_v_btn, {
                                size: "x-small",
                                color: "primary",
                                loading: pending.value,
                                onClick: $event => (previewSell(g))
                              }, {
                                default: __mf_17(() => [
                                  __mf_10(" 挂" + __mf_3(g.sellCount) + "张 ", 1)
                                ]),
                                _: 2
                              }, 1032, ["loading", "onClick"])
                            ])
                          ]))
                        }), 128))
                      ])
                    ]),
                    _: 1
                  }))
            ]),
            _: 1
          }),
          __mf_11(_component_v_window_item, { value: "trades" }, {
            default: __mf_17(() => [
              (trades.value)
                ? (__mf_13(), __mf_6(_component_v_row, {
                    key: 0,
                    class: "mb-2"
                  }, {
                    default: __mf_17(() => [
                      __mf_11(_component_v_col, { cols: "4" }, {
                        default: __mf_17(() => [
                          __mf_11(_component_v_card, {
                            variant: "tonal",
                            class: "text-center pa-3"
                          }, {
                            default: __mf_17(() => [
                              __mf_9("div", _hoisted_6, __mf_3(trades.value.count), 1),
                              _cache[8] || (_cache[8] = __mf_9("div", { class: "text-caption" }, "成交笔数", -1))
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      __mf_11(_component_v_col, { cols: "4" }, {
                        default: __mf_17(() => [
                          __mf_11(_component_v_card, {
                            variant: "tonal",
                            class: "text-center pa-3"
                          }, {
                            default: __mf_17(() => [
                              __mf_9("div", _hoisted_7, __mf_3(fmt(trades.value.totalNet)), 1),
                              _cache[9] || (_cache[9] = __mf_9("div", { class: "text-caption" }, "净收入", -1))
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      __mf_11(_component_v_col, { cols: "4" }, {
                        default: __mf_17(() => [
                          __mf_11(_component_v_card, {
                            variant: "tonal",
                            class: "text-center pa-3"
                          }, {
                            default: __mf_17(() => [
                              __mf_9("div", _hoisted_8, __mf_3(fmt(trades.value.totalFee)), 1),
                              _cache[10] || (_cache[10] = __mf_9("div", { class: "text-caption" }, "手续费", -1))
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }))
                : __mf_7("", true),
              __mf_11(_component_v_table, { density: "compact" }, {
                default: __mf_17(() => [
                  _cache[11] || (_cache[11] = __mf_9("thead", null, [
                    __mf_9("tr", null, [
                      __mf_9("th", null, "时间"),
                      __mf_9("th", null, "片名"),
                      __mf_9("th", null, "稀有度"),
                      __mf_9("th", null, "成交价"),
                      __mf_9("th", null, "手续费")
                    ])
                  ], -1)),
                  __mf_9("tbody", null, [
                    (__mf_13(true), __mf_8(__mf_4, null, __mf_14((trades.value ? trades.value.trades : []), (t, i) => {
                      return (__mf_13(), __mf_8("tr", { key: i }, [
                        __mf_9("td", null, __mf_3(t.tradedAt), 1),
                        __mf_9("td", null, __mf_3(t.filmName), 1),
                        __mf_9("td", null, __mf_3(t.rarity), 1),
                        __mf_9("td", null, __mf_3(fmt(t.price)), 1),
                        __mf_9("td", null, __mf_3(fmt(t.fee)), 1)
                      ]))
                    }), 128))
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["modelValue"]),
      __mf_11(_component_v_dialog, {
        modelValue: confirmVisible.value,
        "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((confirmVisible).value = $event)),
        "max-width": "520"
      }, {
        default: __mf_17(() => [
          __mf_11(_component_v_card, { class: "pa-4" }, {
            default: __mf_17(() => [
              __mf_11(_component_v_card_title, { class: "text-h6" }, {
                default: __mf_17(() => [...(_cache[12] || (_cache[12] = [
                  __mf_10("挂单预览确认", -1)
                ]))]),
                _: 1
              }),
              __mf_11(_component_v_card_text, null, {
                default: __mf_17(() => [
                  __mf_11(_component_v_table, { density: "compact" }, {
                    default: __mf_17(() => [
                      __mf_9("tbody", null, [
                        __mf_9("tr", null, [
                          _cache[13] || (_cache[13] = __mf_9("td", null, "片名", -1)),
                          __mf_9("td", null, __mf_3(confirmRow.value?.filmName), 1)
                        ]),
                        __mf_9("tr", null, [
                          _cache[14] || (_cache[14] = __mf_9("td", null, "稀有度", -1)),
                          __mf_9("td", null, __mf_3(confirmRow.value?.rarity), 1)
                        ]),
                        __mf_9("tr", null, [
                          _cache[15] || (_cache[15] = __mf_9("td", null, "挂单张数", -1)),
                          __mf_9("td", null, __mf_3(confirmRow.value?.sellCount), 1)
                        ]),
                        __mf_9("tr", null, [
                          _cache[16] || (_cache[16] = __mf_9("td", null, "建议单价（实收）", -1)),
                          __mf_9("td", null, __mf_3(fmt(confirmRow.value?.suggestedPrice)), 1)
                        ]),
                        __mf_9("tr", null, [
                          _cache[17] || (_cache[17] = __mf_9("td", null, "买家支付单价", -1)),
                          __mf_9("td", null, __mf_3(fmt(buyerPrice.value)) + "（含5%手续费）", 1)
                        ]),
                        __mf_9("tr", null, [
                          _cache[18] || (_cache[18] = __mf_9("td", null, "预计实收合计", -1)),
                          __mf_9("td", null, __mf_3(fmt(confirmRow.value?.sellCount * confirmRow.value?.suggestedPrice)), 1)
                        ])
                      ])
                    ]),
                    _: 1
                  }),
                  __mf_11(_component_v_alert, {
                    type: "warning",
                    variant: "tonal",
                    class: "mt-3",
                    density: "compact",
                    text: "确认后逐张挂单，失败项会单独提示，不中断整批。"
                  })
                ]),
                _: 1
              }),
              __mf_11(_component_v_card_actions, { class: "justify-end" }, {
                default: __mf_17(() => [
                  __mf_11(_component_v_btn, {
                    variant: "text",
                    onClick: _cache[2] || (_cache[2] = $event => (confirmVisible.value=false))
                  }, {
                    default: __mf_17(() => [...(_cache[19] || (_cache[19] = [
                      __mf_10("取消", -1)
                    ]))]),
                    _: 1
                  }),
                  __mf_11(_component_v_btn, {
                    color: "primary",
                    loading: pending.value,
                    onClick: doSell
                  }, {
                    default: __mf_17(() => [...(_cache[20] || (_cache[20] = [
                      __mf_10("确认挂单", -1)
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
      }, 8, ["modelValue"])
    ]),
    _: 1
  }))
}
}

};
const Workbench = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-0656c20b"]]);

export { Workbench as W, __mf_13 as _, __mf_6 as a, __mf_12 as b, __mf_0 as c };
