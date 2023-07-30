import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'
import Login from '../pages/login.vue'
import Upload from '../pages/upload.vue'
const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'LOGIN', component: Login },
  { path: '/upload', name: 'UPLOAD', component: Upload }
]
const router = createRouter({
  routes,
  history: createWebHashHistory()
})
export default router
