import ApiClient from '@/helpers/api.helper';

class AuthLogin extends ApiClient {
  constructor() {
    super('auth/login');
  }
}

export default new AuthLogin();
