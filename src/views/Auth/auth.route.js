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
    {
      path: 'forget-password',
      name: 'forget-password',
      component: () => import('./ForgetPasswordPage.vue'),
      meta: {
        title: 'forget-password',
      },
    },
    {
      path: 'otp',
      name: 'otp',
      component: () => import('./OtpPage.vue'),
      meta: {
        title: 'otp',
      },
    },
    {
      path: 'reset-password',
      name: 'reset-password',
      component: () => import('./ResetPasswordPage.vue'),
      meta: {
        title: 'reset-password',
      },
    },
  ],
}
