// http client helper
import axios from 'axios'
import { useToastService } from './toast.helper'
const { showToast } = useToastService()

const lang = 'ar'
const URL = import.meta.env.VITE_BASE_API_URL
const axiosClient = axios.create({
  baseURL: URL,
  headers: {
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Accept-Language': lang,
  },
})

axiosClient.interceptors.request.use((config) => {
  const token = window.$cookies.get('aplus-token') || {}
  config.headers.Authorization = `Bearer ${token}`
  return config
})

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error

    if (response) {
      const { status, data } = response
      console.log(response)
      const errorMsg = data?.message || 'حدث خطأ ما'

      // Handle validation errors (400)
      if (status === 400 && data.errors) {
        const validationMessages = Object.values(data.errors).flat().join('\n')
        showToast('خطأ', validationMessages, 'error')
        return Promise.reject(error)
      }

      switch (status) {
        case 401:
          // Unauthorized - remove auth and redirect
          showToast('خطأ', errorMsg, 'error')
          break

        case 403:
          showToast('خطأ', errorMsg, 'error')
          break

        case 500:
          showToast('خطأ', errorMsg, 'error')
          break

        default:
          showToast('خطأ', errorMsg, 'error')
      }
    } else {
      // Network or CORS issue
      showToast('خطأ', 'خطأ في الشبكة', 'error')
    }

    return Promise.reject(error)
  },
)

export default axiosClient
