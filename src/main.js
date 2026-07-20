import { createApp } from 'vue';
import constantsPlugin from 'vue-options-api-constants-plugin';

import App from '@/App.vue';

import 'normalize.css/normalize.css';
import '@sarap422/font-dinish/font-face.css';
import '@/styles/consolas.css';
import '@/styles/style.css';

const app = createApp(App);
app.use(constantsPlugin);
app.mount('#app');
