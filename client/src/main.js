import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'lib-flexible/flexible.js'
import '@/assets/reset.css'
import 'vant/lib/index.css';
import enrollVantUI from '@/enrollVantUI.js';

const app = createApp(App)
app.use(createPinia())
app.use(router)
enrollVantUI(app)
app.mount('#app')
