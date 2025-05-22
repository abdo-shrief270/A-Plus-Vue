import ApiClient from '@/helpers/api.helper'

class CheckUserName extends ApiClient {
  constructor() {
    super('auth/username/check')
  }
}

export default new CheckUserName()
