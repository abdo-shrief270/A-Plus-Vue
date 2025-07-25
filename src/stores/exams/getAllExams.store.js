import { defineStore } from 'pinia'
import getAllExamsServices from '@/services/exams/getAllExams.services'
export const useGetAllExamsStore = defineStore('exams', {
  state: () => ({
    records: null,
    uiFlags: {
      isCreating: false,
    },
  }),
  getters: {},
  actions: {
    getAllExams: async function (obj) {
      try {
        this.uiFlags.isCreating = true
        const { data } = await getAllExamsServices.get(obj)
        this.records = data.data.exams
      } catch (error) {
        console.error(error)
        throw error // rethrow error if necessary for further handling
      } finally {
        this.uiFlags.isCreating = false
      }
    },
  },
})
