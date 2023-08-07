import { createApp, defineCustomElement } from 'vue';
import { createPinia } from 'pinia';

import '@/assets/styles/main.scss';

import WeatherWidget from '@/WeatherWidget.ce.vue';

const app = createApp(WeatherWidget);
const pinia = createPinia();

const WrappedWeatherWidget = defineCustomElement(WeatherWidget);
window.customElements.define('weather-widget', WrappedWeatherWidget);

app.use(pinia);
app.mount('#app');
