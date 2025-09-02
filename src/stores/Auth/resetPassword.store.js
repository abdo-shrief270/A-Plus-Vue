import { defineStore } from 'pinia'
import router from '@/router'
import AuthForgetPassword from '@/services/Auth/forgetPassword.services'
export const useResetPasswordStore = defineStore('reset-password', {
  state: () => ({
    records: null,
    uiFlags: {
      isCreating: false,
    },
  }),
  getters: {},
  actions: {
    forgetPassword: async function (obj) {
      try {
        this.uiFlags.isCreating = true
        const { data } = await AuthForgetPassword.create(obj)
        // store token in cookie
        window.$cookies.set('reset-password-token', data.data.token, '1h')
        window.$cookies.set('reset-password-type', data.data.type, '1h')
        router.push({ name: 'otp' })
        this.records = data.data
      } catch (error) {
        console.error(error)
        throw error // rethrow error if necessary for further handling
      } finally {
        this.uiFlags.isCreating = false
      }
    },
  },
})
