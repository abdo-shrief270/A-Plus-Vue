import { defineStore } from 'pinia'
import checkUserNameServices from '@/services/Auth/checkUserName.services'
import { useToastService } from '@/helpers/toast.helper'
const toast = useToastService()
export const useCheckUserNameStore = defineStore('check-username', {
  state: () => ({
    records: null,
    uiFlags: {
      isCreating: false,
    },
    errors: false,
  }),
  getters: {},
  actions: {
    checkUserName: async function (obj) {
      try {
        this.uiFlags.isCreating = true
        const { data } = await checkUserNameServices.create(obj)
        this.records = data
        if (data?.data?.available) {
          this.errors = false
        }
        if (!data?.data?.available) {
          this.errors = true
        }
      } catch (error) {
        console.error(error)
        this.errors = true
        // Show a toast error message in case of failure
        throw error // rethrow error if necessary for further handling
      } finally {
        this.uiFlags.isCreating = false
      }
    },
  },
})
