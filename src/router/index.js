import { createRouter, createWebHistory } from 'vue-router'
import defaultRoutes from '@/views/Student/defaultRoutes.route'
import authRoute from '@/views/Auth/auth.route'
import parent from '@/views/Parent/parent.route'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      redirect: { name: 'home' },
      component: () => import('@/layouts/AppLayout.vue'),
      children: [...defaultRoutes.routes],
    },
    {
      path: '',
      redirect: { name: 'sign-in' },
      component: () => import('@/layouts/AuthLayout.vue'),
      children: [...authRoute.routes],
    },
    {
      path: '',
      redirect: { name: 'home' },
      component: () => import('@/layouts/ParentView.vue'),
      children: [...parent.routes],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not found',
      component: () => import('@/views/ErrorPage.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !window.$cookies.get('aplus-token')

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'sign-in' })
  } else if (to.meta.guestOnly && isAuthenticated && to.name !== 'auth') {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
