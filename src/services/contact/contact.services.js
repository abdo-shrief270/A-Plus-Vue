import ApiClient from '@/helpers/api.helper'

class ContactService extends ApiClient {
  constructor() {
    super('contact')
  }
}

export default new ContactService()
