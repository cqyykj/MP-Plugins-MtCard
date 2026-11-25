import { _ as __mf_13, a as __mf_6, W as Workbench } from './Workbench-Di-HbphI.js';

const _sfc_main = {
  __name: 'Page',
  props: {
  api: { type: Object, default: () => ({}) },
},
  emits: ['action', 'close'],
  setup(__props) {




return (_ctx, _cache) => {
  return (__mf_13(), __mf_6(Workbench, {
    api: __props.api,
    onAction: _cache[0] || (_cache[0] = $event => (_ctx.$emit('action'))),
    onClose: _cache[1] || (_cache[1] = $event => (_ctx.$emit('close')))
  }, null, 8, ["api"]))
}
}

};

export { _sfc_main as default };
