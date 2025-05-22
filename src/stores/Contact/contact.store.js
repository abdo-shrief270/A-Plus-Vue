import { defineStore } from 'pinia'
import contactService from '@/services/contact/contact.services'
import { useToastService } from '@/helpers/toast.helper'
const toast = useToastService()
export const useContactUsStore = defineStore('contact-us', {
  state: () => ({
    records: null,
    uiFlags: {
      isCreating: false,
    },
  }),
  getters: {},
  actions: {
    create: async function (obj) {
      try {
        this.uiFlags.isCreating = true
        const { data } = await contactService.create(obj)
        toast.showToast('SUCCESS', data.message, 'success')
      } catch (error) {
        console.error(error)
        // Show a toast error message in case of failure
        throw error // rethrow error if necessary for further handling
      } finally {
        this.uiFlags.isCreating = false
      }
    },
  },
})
