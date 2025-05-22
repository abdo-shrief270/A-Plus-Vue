import ApiClient from '@/helpers/api.helper';

class VerifyOtp extends ApiClient {
  constructor() {
    super('verify-otp');
  }
}

export default new VerifyOtp();
