import { defineStore } from 'pinia'
import getCategoriesServices from '@/services/examCategories/getCategories.services'
export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    records: null,
    uiFlags: {
      isCreating: false,
    },
  }),
  getters: {
    getCategoriesData: (state) => state.records,
  },
  actions: {
    getCategories: async function (obj) {
      try {
        this.uiFlags.isCreating = true
        const { data } = await getCategoriesServices.get(obj)
        this.records = data
      } catch (error) {
        console.error(error)
        throw error // rethrow error if necessary for further handling
      } finally {
        this.uiFlags.isCreating = false
      }
    },
  },
})
