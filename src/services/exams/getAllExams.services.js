import ApiClient from '@/helpers/api.helper'

class getAllExams extends ApiClient {
  constructor() {
    super('exams')
  }
}

export default new getAllExams()
