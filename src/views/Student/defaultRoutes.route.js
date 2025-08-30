import { authGuard, dashboardGuard } from '@/helpers/router.helper'

export default {
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./Home/HomePage.vue'),
      beforeEnter: authGuard,
      meta: {
        title: 'home',
      },
    },
    {
      path: '/plan',
      name: 'plan',
      component: () => import('./PlanPage.vue'),
      meta: {
        title: 'plan',
      },
    },
    {
      path: '/models',
      name: 'models',
      component: () => import('./ModelsPage.vue'),
      meta: {
        title: 'models',
      },
    },
    {
      path: '/questions',
      name: 'questions',
      component: () => import('./qst/QuestionsPage.vue'),
      meta: {
        title: 'questions',
      },
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('./ContactUs/ContactPage.vue'),
      meta: {
        title: 'contact',
      },
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('./Profile/ProfilePage.vue'),
      beforeEnter: authGuard,
    },
    {
      path: '/questions/comparison-list',
      name: 'comparison-list',
      component: () => import('./qst/Comparison_list/ComparidonListPage.vue'),
    },
    {
      path: '/questions/qst-details/:id',
      name: 'qst_details',
      component: () => import('./qst/qst_details/qstDetailsPage.vue'),
    },
  ],
}
