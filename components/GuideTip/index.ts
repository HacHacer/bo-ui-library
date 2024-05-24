import type { App } from 'vue';
import _GuideTip from './component.vue';

const GuideTip = Object.assign(_GuideTip, {
  install: (app: App) => {
    app.component(_GuideTip.name, _GuideTip);
  },
});

export default GuideTip;