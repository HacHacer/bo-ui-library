import type { App } from 'vue';
import _tipButton from './component.vue';

const tipButton = Object.assign(_tipButton, {
  install: (app: App) => {
    app.component(_tipButton.name, _tipButton);
  },
});

export default tipButton;