import ApiClient from '@/helpers/api.helper';
import axiosClient from '@/helpers/http.helper';

class InstructorUpdateStatus extends ApiClient {
  constructor() {
    super('instructor/update/status');
  }

  update() {
    return axiosClient.post(this.url);
  }
}

export default new InstructorUpdateStatus();
