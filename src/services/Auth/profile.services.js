import ApiClient from '@/helpers/api.helper'

class Profile extends ApiClient {
  constructor() {
    super('auth/user')
  }
}

export default new Profile()
