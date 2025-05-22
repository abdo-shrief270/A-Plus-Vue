import ApiClient from '@/helpers/api.helper';

class AuthRegister extends ApiClient {
  constructor() {
    super('auth/register');
  }
}

export default new AuthRegister();
