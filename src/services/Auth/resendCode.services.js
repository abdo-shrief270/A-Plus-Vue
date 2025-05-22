import ApiClient from '@/helpers/api.helper';

class resendCodeServices extends ApiClient {
  constructor() {
    super('auth/resend');
  }
}

export default new resendCodeServices();
