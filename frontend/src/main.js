import { createApp } from 'vue'

// Vuetify
import router from './router/index.js'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Auth
import api from './api';

// Components
import App from './App.vue'

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App).use(vuetify).use(router);
app.config.globalProperties.$api = api;
app.mount('#app');
