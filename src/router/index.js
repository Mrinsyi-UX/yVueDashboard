import { createRouter, createWebHistory } from 'vue-router'
import DashboardHome from '../pages/DashboardHome.vue'
import DefectDaily from '../pages/DefectDaily.vue'
import Defect_List from '../pages/Defect_List.vue'
import WorkCellDashboard from '../pages/WorkcellDashboard.vue'
import WorkcellStation from '@/pages/WorkcellStation.vue'
import WorkcellZoneStation from '@/pages/WorkcellZoneStationDetail.vue'

const routes = [
  { path: '/', name: 'home', component: DashboardHome },
  { path: '/defects', name: 'defects', component: DefectDaily },
  { path: '/defect_list', name: 'defect_list', component: Defect_List },
  { path: '/workcell', name: 'workcell', component: WorkCellDashboard },
  { path: '/workcellstation', name:'workcellstation', component: WorkcellStation},
  { path: '/workcellzonestation', name:'workcellzonestation', component: WorkcellZoneStation}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
