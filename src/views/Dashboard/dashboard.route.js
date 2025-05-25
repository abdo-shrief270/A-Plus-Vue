import { authGuard } from '@/helpers/router.helper'

export default {
  routes: [
    {
      path: '',
      name: 'home',
      component: () => import('./Home/HomePage.vue'),
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
      component: () => import('./QuestionsPage.vue'),
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
      path: 'profile',
      name: 'profile',
      component: () => import('./Profile/ProfilePage.vue'),
      beforeEnter: authGuard,
    },
  ],
}
