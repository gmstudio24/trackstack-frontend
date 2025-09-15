import './bootstrap';
import '@/assets/css/app.css';
import { createApp } from 'vue';
import App from './App.vue';
import { router } from './routes.ts';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
import LocalesPl from "./locales/pl.json";
import { createI18n } from 'vue-i18n';

const i18n = createI18n({
  locale: 'pl',
  fallbackLocale: 'pl',
  messages: {
    pl: LocalesPl
  },
  legacy: false,
});

export const app = createApp(App)
  .use(router)
  .use(autoAnimatePlugin)
  .use(i18n)
  .mount("#app");