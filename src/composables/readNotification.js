import { ref } from 'vue';
import createAxiosInstance from '@/services/api/instance';
// import { showToast } from '@/helpers/toast.helper';

export function useReadNotification() {
  const editing = ref(false);
  const error = ref(null);

  const axiosInstance = new createAxiosInstance();
  const baseUrl = `${import.meta.env.VITE_API_BASE_URL}/v3`;

  const readNotification = async (id, payload) => {
    editing.value = true;
    error.value = null;

    try {
      const { data } = await axiosInstance.post(`${baseUrl}/${id}`, payload);
      error.value = { success: true };
      // showToast('success', data?.message, 'success');

      return data;
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      editing.value = false;
    }
  };

  return {
    editing,
    error,
    readNotification
  };
}
