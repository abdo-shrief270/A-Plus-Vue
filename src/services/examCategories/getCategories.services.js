import ApiClient from '@/helpers/api.helper'

class getCategories extends ApiClient {
  constructor() {
    super('exams/data')
  }
}

export default new getCategories()
