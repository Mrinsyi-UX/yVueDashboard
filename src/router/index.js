import { createRouter, createWebHistory } from 'vue-router'
import DashboardHome from '../pages/DashboardHome.vue'
import DefectDaily from '../pages/DefectDaily.vue'
import Defect_List from '../pages/Defect_List.vue'

const routes = [
  { path: '/', name: 'home', component: DashboardHome },
  { path: '/defects', name: 'defects', component: DefectDaily },
  { path: '/defect_list', name: 'defect_list', component: Defect_List },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
