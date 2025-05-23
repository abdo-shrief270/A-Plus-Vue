import ApiClient from '@/helpers/api.helper'

class AuthForgetPassword extends ApiClient {
  constructor() {
    super('auth/user/reset-password')
  }
}

export default new AuthForgetPassword()
