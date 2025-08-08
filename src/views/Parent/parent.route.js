import { parentOnlyGuard } from '@/helpers/router.helper'

export default {
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/Parent/DashboardPage.vue'),
      beforeEnter: parentOnlyGuard,
    },
    {
      path: '/courses',
      name: 'courses',
      component: () => import('@/views/Parent/CoursesPage.vue'),
      beforeEnter: parentOnlyGuard,
    },
  ],
}
