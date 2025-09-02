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
      beforeEnter: (to, from, next) => {
        // ... Check if the reset-password-token cookie exists
        const token = window.$cookies.get('reset-password-token')
        if (!token) {
          // If the token doesn't exist, redirect to the forget-password page
          next({ name: 'verify-way' })
        } else {
          // If the token exists, allow access to the reset-password page
          next()
        }
      },
    },
    {
      path: 'otp',
      name: 'otp',
      component: () => import('./OtpPage.vue'),
      meta: {
        title: 'otp',
      },
      beforeEnter: (to, from, next) => {
        // ... Check if the reset-password-token cookie exists
        const token = window.$cookies.get('reset-password-token')
        if (!token) {
          // If the token doesn't exist, redirect to the forget-password page
          next({ name: 'verify-way' })
        } else {
          // If the token exists, allow access to the reset-password page
          next()
        }
      },
    },
    {
      path: 'reset-password',
      name: 'reset-password-verify',
      component: () => import('./ResetPasswordPage.vue'),
      meta: {
        title: 'reset-password',
      },
      beforeEnter: (to, from, next) => {
        // ... Check if the reset-password-token cookie exists
        const token = window.$cookies.get('reset-password-token')
        if (!token) {
          // If the token doesn't exist, redirect to the forget-password page
          next({ name: 'verify-way' })
        } else {
          // If the token exists, allow access to the reset-password page
          next()
        }
      },
    },
    {
      path: 'verify-way',
      name: 'verify-way',
      component: () => import('./VerifyWay.vue'),
      meta: {
        title: 'verify-way',
      },
    },
  ],
}
