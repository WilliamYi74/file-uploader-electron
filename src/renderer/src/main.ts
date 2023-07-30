import { createApp } from 'vue'
import App from './App.vue'
import pinia from '@renderer/store'
import router from '@renderer/router'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/loading/style/css'
import 'virtual:uno.css'
createApp(App).use(pinia).use(router).mount('#app')
