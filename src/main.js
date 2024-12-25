import { createApp } from 'vue'
import App from './App.vue'

import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css';
import router from './router'

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(createPinia())
import { useMenuBarStore } from '@/store/PiniaStore'
const store = useMenuBarStore()
store.categoryList()
app.mount('#app')