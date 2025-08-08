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
    {
      path: '/students',
      name: 'students',
      component: () => import('@/views/Parent/StudentsPage.vue'),
      beforeEnter: parentOnlyGuard,
    },
    {
      path: '/recharge',
      name: 'recharge',
      component: () => import('@/views/Parent/RechargePage.vue'),
      beforeEnter: parentOnlyGuard,
    },
    {
      path: '/parent-settings',
      name: 'parent-settings',
      component: () => import('@/views/Parent/ParentSettingsPage.vue'),
      beforeEnter: parentOnlyGuard,
    },
  ],
}
