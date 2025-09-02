import ApiClient from '@/helpers/api.helper'

class ChangePassword extends ApiClient {
  constructor() {
    super('auth/user/change-password')
  }
}

export default new ChangePassword()
