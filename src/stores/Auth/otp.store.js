import { defineStore } from 'pinia'
import router from '@/router'
import verifyOtpServices from '@/services/Auth/verify.otp.services'
export const useOtpStore = defineStore('checkOTP', {
  state: () => ({
    records: null,
    uiFlags: {
      isCreating: false,
    },
  }),
  getters: {},
  actions: {
    otp: async function (obj) {
      try {
        this.uiFlags.isCreating = true
        const { data } = await verifyOtpServices.create(obj)
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
