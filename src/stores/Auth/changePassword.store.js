import { defineStore } from 'pinia'
import router from '@/router'
import changePasswordServices from '@/services/Auth/changePassword.services'
export const useChangePasswordStore = defineStore('change-password', {
  state: () => ({
    records: null,
    uiFlags: {
      isCreating: false,
    },
  }),
  getters: {},
  actions: {
    changePassword: async function (obj) {
      try {
        this.uiFlags.isCreating = true
        const { data } = await changePasswordServices.create(obj)
        // store token in cookie
        this.records = data.data
        router.push({ name: 'sign-in' })
      } catch (error) {
        console.error(error)
        throw error // rethrow error if necessary for further handling
      } finally {
        this.uiFlags.isCreating = false
      }
    },
  },
})
