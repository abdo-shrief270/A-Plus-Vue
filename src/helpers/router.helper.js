import { useAuthStore } from '@/stores/Auth/auth.store'
import { ref } from 'vue'

// authGuard
export const authGuard = (to, from, next) => {
  const tokenExists = window.$cookies.isKey('aplus-token')
  const userType = window.$cookies.get('aplus-userType') || 'guest'

  if (tokenExists) {
    if (userType === 'parent' || userType === 'admin') {
      if (to.name === 'home') {
        next({ name: 'dashboard' })
      } else {
        next()
      }
    } else {
      next()
    }
  } else {
    if (to.name !== 'home') {
      next({ name: 'home' })
    } else {
      next()
    }
  }
}

// guestGuard
export const guestGuard = (to, from, next) => {
  const tokenExists = window.$cookies.isKey('aplus-token')
  if (tokenExists) {
    next()
  } else {
    if (to.name !== 'sign-in') {
      next({ name: 'sign-in' })
    } else {
      next()
    }
  }
}

// dashboardGuard
export const dashboardGuard = (to, from, next) => {
  const authStore = useAuthStore()
  const tokenExists = window.$cookies.isKey('aplus-token')
  const userType = window.$cookies.get('aplus-userType')

  if (tokenExists) {
    if (userType === 'parent' || userType === 'admin') {
      if (to.path !== '/dashboard') {
        next('/dashboard')
      } else {
        next()
      }
    } else {
      if (to.name !== 'home') {
        next({ name: 'home' })
      } else {
        next()
      }
    }
  } else {
    if (to.name !== 'home') {
      next({ name: 'home' })
    } else {
      next()
    }
  }
}

export const parentOnlyGuard = (to, from, next) => {
  const tokenExists = window.$cookies.isKey('aplus-token')
  const userType = window.$cookies.get('aplus-userType')

  if (tokenExists && userType === 'parent') {
    next()
  } else {
    next({ name: 'home' })
  }
}
