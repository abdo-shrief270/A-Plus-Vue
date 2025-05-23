import ApiClient from '@/helpers/api.helper'

class VerifyOtp extends ApiClient {
  constructor() {
    super('auth/user/checkOTP')
  }
}

export default new VerifyOtp()
