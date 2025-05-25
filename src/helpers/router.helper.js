import { useAuthStore } from '@/stores/Auth/auth.store'

export const authGuard = (to, from, next) => {
  const tokenExists = window.$cookies.isKey(`aplus-token`)
  if (tokenExists) {
    next()
  } else {
    // Token doesn't exist, allow navigation to the requested route
    next({ name: 'home' })
  }
}

export const guestGuard = (to, from, next) => {
  const tokenExists = window.$cookies.isKey(`aplus-token`)
  if (tokenExists) {
    next()
  } else {
    next({ name: 'sign-in' })
  }
}
