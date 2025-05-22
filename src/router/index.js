import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'
import dashboardRoute from '@/views/Dashboard/dashboard.route'
import authRoute from '@/views/Auth/auth.route'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      redirect: { name: 'home' },
      component: () => import('@/layouts/AppLayout.vue'),
      children: [...dashboardRoute.routes],
    },
    {
      path: '',
      redirect: { name: 'sign-in' },
      component: () => import('@/layouts/AuthLayout.vue'),
      children: [...authRoute.routes],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not found',
      component: () => import('@/views/ErrorPage.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('e-token')

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'home' })
  } else if (to.meta.guestOnly && isAuthenticated && to.name !== 'auth') {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
