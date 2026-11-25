import { importShared } from './__federation_fn_import-JrT3xvdd.js';

const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const {resolveComponent:_resolveComponent,openBlock:_openBlock,createBlock:_createBlock,createCommentVNode:_createCommentVNode,createTextVNode:_createTextVNode,withCtx:_withCtx,createVNode:_createVNode,renderList:_renderList,Fragment:_Fragment,createElementBlock:_createElementBlock,toDisplayString:_toDisplayString,createElementVNode:_createElementVNode,normalizeClass:_normalizeClass} = await importShared('vue');


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

const {ref,computed,watch,onMounted} = await importShared('vue');



const _sfc_main = {
  __name: 'Workbench',
  props: {
  api: { type: Object, default: () => ({}) },
},
  emits: ['action', 'close'],
  setup(__props) {

const props = __props;


const tab = ref('overview');
const status = ref({ has_key: false });
const overview = ref(null);
const dupGroups = ref([]);
const trades = ref(null);
const dupLoading = ref(false);
const tradesLoading = ref(false);
const loaded = ref(false);
const pending = ref(false);
const confirmVisible = ref(false);
const confirmRow = ref(null);

const fmt = (v) => (v === null || v === undefined ? '—' : Number(v).toLocaleString('zh-CN'));
const overviewCards = computed(() => {
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
const buyerPrice = computed(() => confirmRow.value ? Math.ceil(confirmRow.value.suggestedPrice / 0.95) : 0);

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

onMounted(() => { loadStatus(); loadOverview(); });
watch(tab, (t) => {
  if (t === 'dup' && !dupGroups.value.length) loadDup();
  if (t === 'trades' && !trades.value) loadTrades();
});

return (_ctx, _cache) => {
  const _component_v_alert = _resolveComponent("v-alert");
  const _component_v_tab = _resolveComponent("v-tab");
  const _component_v_tabs = _resolveComponent("v-tabs");
  const _component_v_card = _resolveComponent("v-card");
  const _component_v_col = _resolveComponent("v-col");
  const _component_v_row = _resolveComponent("v-row");
  const _component_v_window_item = _resolveComponent("v-window-item");
  const _component_v_progress_linear = _resolveComponent("v-progress-linear");
  const _component_v_chip = _resolveComponent("v-chip");
  const _component_v_btn = _resolveComponent("v-btn");
  const _component_v_table = _resolveComponent("v-table");
  const _component_v_window = _resolveComponent("v-window");
  const _component_v_card_title = _resolveComponent("v-card-title");
  const _component_v_card_text = _resolveComponent("v-card-text");
  const _component_v_card_actions = _resolveComponent("v-card-actions");
  const _component_v_dialog = _resolveComponent("v-dialog");
  const _component_v_container = _resolveComponent("v-container");

  return (_openBlock(), _createBlock(_component_v_container, {
    fluid: "",
    class: "pa-2 mt-card"
  }, {
    default: _withCtx(() => [
      (!status.value.has_key)
        ? (_openBlock(), _createBlock(_component_v_alert, {
            key: 0,
            type: "warning",
            variant: "tonal",
            class: "mb-3",
            text: "未找到馒头 API Key，请先在 MP「站点管理」给馒头填写 apikey（控制台→实验室→存取令牌）"
          }))
        : _createCommentVNode("", true),
      _createVNode(_component_v_tabs, {
        modelValue: tab.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((tab).value = $event)),
        color: "primary"
      }, {
        default: _withCtx(() => [
          _createVNode(_component_v_tab, { value: "overview" }, {
            default: _withCtx(() => [...(_cache[4] || (_cache[4] = [
              _createTextVNode("总览", -1)
            ]))]),
            _: 1
          }),
          _createVNode(_component_v_tab, { value: "dup" }, {
            default: _withCtx(() => [...(_cache[5] || (_cache[5] = [
              _createTextVNode("重复卡挂单", -1)
            ]))]),
            _: 1
          }),
          _createVNode(_component_v_tab, { value: "trades" }, {
            default: _withCtx(() => [...(_cache[6] || (_cache[6] = [
              _createTextVNode("我的成交", -1)
            ]))]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["modelValue"]),
      _createVNode(_component_v_window, {
        modelValue: tab.value,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((tab).value = $event)),
        class: "mt-3"
      }, {
        default: _withCtx(() => [
          _createVNode(_component_v_window_item, { value: "overview" }, {
            default: _withCtx(() => [
              (overview.value)
                ? (_openBlock(), _createBlock(_component_v_row, { key: 0 }, {
                    default: _withCtx(() => [
                      (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(overviewCards.value, (m) => {
                        return (_openBlock(), _createBlock(_component_v_col, {
                          key: m.label,
                          cols: "6",
                          md: "2"
                        }, {
                          default: _withCtx(() => [
                            _createVNode(_component_v_card, {
                              variant: "tonal",
                              class: "text-center pa-3"
                            }, {
                              default: _withCtx(() => [
                                _createElementVNode("div", _hoisted_1, _toDisplayString(m.value), 1),
                                _createElementVNode("div", _hoisted_2, _toDisplayString(m.label), 1)
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
                  ? (_openBlock(), _createElementBlock("div", _hoisted_3, "暂无数据"))
                  : _createCommentVNode("", true)
            ]),
            _: 1
          }),
          _createVNode(_component_v_window_item, { value: "dup" }, {
            default: _withCtx(() => [
              _createVNode(_component_v_alert, {
                type: "info",
                variant: "tonal",
                class: "mb-3",
                density: "compact",
                text: "同片同稀有度留 1 张（优先薪王）。挂牌价 < 近期成交价 标红提示可能被秒扫。"
              }),
              (dupLoading.value)
                ? (_openBlock(), _createBlock(_component_v_progress_linear, {
                    key: 0,
                    indeterminate: ""
                  }))
                : (_openBlock(), _createBlock(_component_v_table, {
                    key: 1,
                    density: "compact"
                  }, {
                    default: _withCtx(() => [
                      _cache[7] || (_cache[7] = _createElementVNode("thead", null, [
                        _createElementVNode("tr", null, [
                          _createElementVNode("th", null, "片名"),
                          _createElementVNode("th", null, "稀有度"),
                          _createElementVNode("th", null, "可卖"),
                          _createElementVNode("th", null, "建议价"),
                          _createElementVNode("th", null, "市场最低"),
                          _createElementVNode("th", null, "近期成交"),
                          _createElementVNode("th", null, "操作")
                        ])
                      ], -1)),
                      _createElementVNode("tbody", null, [
                        (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(dupGroups.value, (g) => {
                          return (_openBlock(), _createElementBlock("tr", {
                            key: g.filmId + g.rarity
                          }, [
                            _createElementVNode("td", _hoisted_4, _toDisplayString(g.filmName), 1),
                            _createElementVNode("td", null, _toDisplayString(g.rarity), 1),
                            _createElementVNode("td", null, _toDisplayString(g.sellCount), 1),
                            _createElementVNode("td", null, [
                              _createTextVNode(_toDisplayString(fmt(g.suggestedPrice)), 1),
                              _createElementVNode("div", _hoisted_5, _toDisplayString(g.priceBasis), 1)
                            ]),
                            _createElementVNode("td", null, _toDisplayString(g.marketLowest ? fmt(g.marketLowest) : '—'), 1),
                            _createElementVNode("td", {
                              class: _normalizeClass(g.lastTradePrice ? '' : 'text-medium-emphasis')
                            }, _toDisplayString(g.lastTradePrice ? fmt(g.lastTradePrice) : '无成交'), 3),
                            _createElementVNode("td", null, [
                              (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(g.sellCards, (c) => {
                                return (_openBlock(), _createBlock(_component_v_chip, {
                                  key: c.cardId,
                                  size: "small",
                                  color: c.riskLow ? 'error' : 'default',
                                  class: "mr-1 mb-1",
                                  variant: "tonal"
                                }, {
                                  default: _withCtx(() => [
                                    _createTextVNode(_toDisplayString(c.title || '卡'), 1),
                                    (c.myPrice)
                                      ? (_openBlock(), _createElementBlock(_Fragment, { key: 0 }, [
                                          _createTextVNode(" 挂" + _toDisplayString(fmt(c.myPrice)), 1)
                                        ], 64))
                                      : _createCommentVNode("", true),
                                    (c.riskLow)
                                      ? (_openBlock(), _createElementBlock(_Fragment, { key: 1 }, [
                                          _createTextVNode(" ·低价风险")
                                        ], 64))
                                      : _createCommentVNode("", true)
                                  ]),
                                  _: 2
                                }, 1032, ["color"]))
                              }), 128)),
                              _createVNode(_component_v_btn, {
                                size: "x-small",
                                color: "primary",
                                loading: pending.value,
                                onClick: $event => (previewSell(g))
                              }, {
                                default: _withCtx(() => [
                                  _createTextVNode(" 挂" + _toDisplayString(g.sellCount) + "张 ", 1)
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
          _createVNode(_component_v_window_item, { value: "trades" }, {
            default: _withCtx(() => [
              (trades.value)
                ? (_openBlock(), _createBlock(_component_v_row, {
                    key: 0,
                    class: "mb-2"
                  }, {
                    default: _withCtx(() => [
                      _createVNode(_component_v_col, { cols: "4" }, {
                        default: _withCtx(() => [
                          _createVNode(_component_v_card, {
                            variant: "tonal",
                            class: "text-center pa-3"
                          }, {
                            default: _withCtx(() => [
                              _createElementVNode("div", _hoisted_6, _toDisplayString(trades.value.count), 1),
                              _cache[8] || (_cache[8] = _createElementVNode("div", { class: "text-caption" }, "成交笔数", -1))
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      _createVNode(_component_v_col, { cols: "4" }, {
                        default: _withCtx(() => [
                          _createVNode(_component_v_card, {
                            variant: "tonal",
                            class: "text-center pa-3"
                          }, {
                            default: _withCtx(() => [
                              _createElementVNode("div", _hoisted_7, _toDisplayString(fmt(trades.value.totalNet)), 1),
                              _cache[9] || (_cache[9] = _createElementVNode("div", { class: "text-caption" }, "净收入", -1))
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      _createVNode(_component_v_col, { cols: "4" }, {
                        default: _withCtx(() => [
                          _createVNode(_component_v_card, {
                            variant: "tonal",
                            class: "text-center pa-3"
                          }, {
                            default: _withCtx(() => [
                              _createElementVNode("div", _hoisted_8, _toDisplayString(fmt(trades.value.totalFee)), 1),
                              _cache[10] || (_cache[10] = _createElementVNode("div", { class: "text-caption" }, "手续费", -1))
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }))
                : _createCommentVNode("", true),
              _createVNode(_component_v_table, { density: "compact" }, {
                default: _withCtx(() => [
                  _cache[11] || (_cache[11] = _createElementVNode("thead", null, [
                    _createElementVNode("tr", null, [
                      _createElementVNode("th", null, "时间"),
                      _createElementVNode("th", null, "片名"),
                      _createElementVNode("th", null, "稀有度"),
                      _createElementVNode("th", null, "成交价"),
                      _createElementVNode("th", null, "手续费")
                    ])
                  ], -1)),
                  _createElementVNode("tbody", null, [
                    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList((trades.value ? trades.value.trades : []), (t, i) => {
                      return (_openBlock(), _createElementBlock("tr", { key: i }, [
                        _createElementVNode("td", null, _toDisplayString(t.tradedAt), 1),
                        _createElementVNode("td", null, _toDisplayString(t.filmName), 1),
                        _createElementVNode("td", null, _toDisplayString(t.rarity), 1),
                        _createElementVNode("td", null, _toDisplayString(fmt(t.price)), 1),
                        _createElementVNode("td", null, _toDisplayString(fmt(t.fee)), 1)
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
      _createVNode(_component_v_dialog, {
        modelValue: confirmVisible.value,
        "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((confirmVisible).value = $event)),
        "max-width": "520"
      }, {
        default: _withCtx(() => [
          _createVNode(_component_v_card, { class: "pa-4" }, {
            default: _withCtx(() => [
              _createVNode(_component_v_card_title, { class: "text-h6" }, {
                default: _withCtx(() => [...(_cache[12] || (_cache[12] = [
                  _createTextVNode("挂单预览确认", -1)
                ]))]),
                _: 1
              }),
              _createVNode(_component_v_card_text, null, {
                default: _withCtx(() => [
                  _createVNode(_component_v_table, { density: "compact" }, {
                    default: _withCtx(() => [
                      _createElementVNode("tbody", null, [
                        _createElementVNode("tr", null, [
                          _cache[13] || (_cache[13] = _createElementVNode("td", null, "片名", -1)),
                          _createElementVNode("td", null, _toDisplayString(confirmRow.value?.filmName), 1)
                        ]),
                        _createElementVNode("tr", null, [
                          _cache[14] || (_cache[14] = _createElementVNode("td", null, "稀有度", -1)),
                          _createElementVNode("td", null, _toDisplayString(confirmRow.value?.rarity), 1)
                        ]),
                        _createElementVNode("tr", null, [
                          _cache[15] || (_cache[15] = _createElementVNode("td", null, "挂单张数", -1)),
                          _createElementVNode("td", null, _toDisplayString(confirmRow.value?.sellCount), 1)
                        ]),
                        _createElementVNode("tr", null, [
                          _cache[16] || (_cache[16] = _createElementVNode("td", null, "建议单价（实收）", -1)),
                          _createElementVNode("td", null, _toDisplayString(fmt(confirmRow.value?.suggestedPrice)), 1)
                        ]),
                        _createElementVNode("tr", null, [
                          _cache[17] || (_cache[17] = _createElementVNode("td", null, "买家支付单价", -1)),
                          _createElementVNode("td", null, _toDisplayString(fmt(buyerPrice.value)) + "（含5%手续费）", 1)
                        ]),
                        _createElementVNode("tr", null, [
                          _cache[18] || (_cache[18] = _createElementVNode("td", null, "预计实收合计", -1)),
                          _createElementVNode("td", null, _toDisplayString(fmt(confirmRow.value?.sellCount * confirmRow.value?.suggestedPrice)), 1)
                        ])
                      ])
                    ]),
                    _: 1
                  }),
                  _createVNode(_component_v_alert, {
                    type: "warning",
                    variant: "tonal",
                    class: "mt-3",
                    density: "compact",
                    text: "确认后逐张挂单，失败项会单独提示，不中断整批。"
                  })
                ]),
                _: 1
              }),
              _createVNode(_component_v_card_actions, { class: "justify-end" }, {
                default: _withCtx(() => [
                  _createVNode(_component_v_btn, {
                    variant: "text",
                    onClick: _cache[2] || (_cache[2] = $event => (confirmVisible.value=false))
                  }, {
                    default: _withCtx(() => [...(_cache[19] || (_cache[19] = [
                      _createTextVNode("取消", -1)
                    ]))]),
                    _: 1
                  }),
                  _createVNode(_component_v_btn, {
                    color: "primary",
                    loading: pending.value,
                    onClick: doSell
                  }, {
                    default: _withCtx(() => [...(_cache[20] || (_cache[20] = [
                      _createTextVNode("确认挂单", -1)
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
const Workbench = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-ed6c1ab5"]]);

export { Workbench as W };
