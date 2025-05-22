import { ref } from 'vue';
import { useApi } from '@/composables/useApi';
import { showToast } from '@/helpers/toast.helper';

export const useAuthService = () => {
  const api = new useApi('auth');
  const loading = ref(false);
  const error = ref(null);

  const post = async (endpoint, payload) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.axiosInstance.post(
        `${api.baseUrl}/${endpoint}`,
        payload
      );
      if (data?.message) {
        showToast('success', data.message, 'success');
      }
      return data;
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const login = (payload) => post('login', payload);
  const register = (payload) => post('register', payload);
  const verifyAccounts = (payload) => post('verify-account', payload);
  const logout = (payload) => post('logout', payload);
  const passwordSendOtp = (payload) => post('password/send-otp', payload);
  const passwordReset = (payload) => post('password/reset', payload);
  const resendOtp = (payload) => post('resend-otp', payload);
  const passwordVerifyOtp = (payload) => post('password/verify-otp', payload);

  return {
    ...api,
    login,
    register,
    verifyAccounts,
    logout,
    passwordSendOtp,
    passwordReset,
    resendOtp,
    passwordVerifyOtp
  };
};
