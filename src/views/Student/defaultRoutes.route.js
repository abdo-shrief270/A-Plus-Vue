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
      component: () => import('./QuestionsPage.vue'),
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
      path: '/question-details/:id',
      name: 'question-details',
      component: () => import('./QusetionDetailsPage.vue'),
      props: (route) => ({
        categoryId: route.params.id,
        sectionId: route.query.section,
        sectionName: route.query.sectionName,
        categoryName: route.query.categoryName,
        type: route.query.type,
      }),
      meta: {
        title: 'تفاصيل الأسئلة',
      },
    },
  ],
}
