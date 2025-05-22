import ApiClient from '@/helpers/api.helper';

class InstructorLogin extends ApiClient {
  constructor() {
    super('instructor/auth/login');
  }
}

export default new InstructorLogin();
