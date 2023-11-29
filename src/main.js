import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/geral.css'
import './assets/swiper.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
