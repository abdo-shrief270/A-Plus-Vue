import ApiClient from '@/helpers/api.helper';

class Profile extends ApiClient {
  constructor() {
    super('profile');
  }
}

export default new Profile();
