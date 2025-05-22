export default {
  routes: [
    {
      path: 'sign-in',
      name: 'sign-in',
      component: () => import('./LoginPage.vue'),
      meta: {
        title: 'sign_in',
      },
    },
    {
      path: 'sign-up',
      name: 'sign-up',
      component: () => import('./RegisterPage.vue'),
      meta: {
        title: 'sign_up',
      },
    },
  ],
}
