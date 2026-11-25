import { b as __mf_13, _ as __mf_15, a as __mf_7, W as Workbench } from './Workbench-CTlbPujo.js';

const _sfc_main = {
  __name: 'Config',
  props: {
  initialConfig: { type: Object, default: () => ({}) },
  api: { type: Object, default: () => ({}) },
},
  emits: ['layout', 'close'],
  setup(__props, { emit: __emit }) {


const emit = __emit;

__mf_13(() => {
  emit('layout', { maxWidth: '80rem' });
});

return (_ctx, _cache) => {
  return (__mf_15(), __mf_7(Workbench, {
    api: __props.api,
    "initial-tab": "overview",
    onClose: _cache[0] || (_cache[0] = $event => (_ctx.$emit('close')))
  }, null, 8, ["api"]))
}
}

};

export { _sfc_main as default };
