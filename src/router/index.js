import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/attendance',
    },
    {
      path: '/attendance',
      name: 'AttendanceList',
      component: () => import('../views/AttendanceList.vue'),
    },
    {
      path: '/attendance/create',
      name: 'AttendanceCreate',
      component: () => import('../views/AttendanceForm.vue'),
    },
    {
      path: '/attendance/edit/:id',
      name: 'AttendanceEdit',
      component: () => import('../views/AttendanceForm.vue'),
    },
  ],
})

export default router
