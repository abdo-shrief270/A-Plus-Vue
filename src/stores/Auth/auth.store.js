import { defineStore } from 'pinia'
import { useToastService } from '@/helpers/toast.helper'
import RegisterStudentServices from '@/services/Auth/register.services'
import LoginServices from '@/services/Auth/login.services'
import router from '@/router'
import verifyOtpServices from '@/services/Auth/verify.otp.services'
import LoginTeacherServices from '@/services/Auth/login.teacher.services'
import ProfileServices from '@/services/Auth/profile.services'
import InstructorUpdateStatus from '@/services/Auth/instructor.services'
import resendCodeServices from '@/services/Auth/resendCode.services'
import forgetPasswordServices from '@/services/Auth/forgetPassword.services'
import changePasswordServices from '@/services/Auth/change.password.services'

const toast = useToastService()
export const useAuthStore = defineStore('Auth', {
  state: () => ({
    records: null,
    record: null,
    uiFlags: {
      isLoading: false,
      isCreating: false,
      isLoggingIn: false,
    },
  }),
  getters: {
    isLogin: () => window.$cookies.get('aplus-token') || false,
  },
  actions: {
    register: async function (obj) {
      try {
        this.uiFlags.isCreating = true
        const { data } = await RegisterStudentServices.create(obj)
        toast.showToast('SUCCESS', data.message, 'success')
        this.record = data.data
        window.$cookies.set('aplus-token', data.data.token, '30d')
        router.push({
          name: 'home',
        })
      } catch (error) {
        if (error.response.data.status == 409) {
          if (error.response.data.errors.type === 'instructor') {
            router.push({
              name: 'sign-in',
              query: {
                type: 'teacher',
              },
            })
          } else {
            router.push({
              name: 'verify-otp',
              query: {
                phone: obj?.phone,
              },
            })

            this.login(
              {
                country_code: obj?.country_code,
                phone: obj?.phone,
              },
              false,
            )
          }
        }
        return error
      } finally {
        this.uiFlags.isCreating = false
      }
    },

    verifyOtp: async function (obj) {
      try {
        this.uiFlags.isLoading = true
        const { data } = await verifyOtpServices.create(obj)
        toast.showToast('SUCCESS', data.message, 'success')
        router.push({
          name: 'reset-password',
        })
      } catch (error) {
        console.log(error)
        throw error
      } finally {
        this.uiFlags.isLoading = false
      }
    },

    changePassword: async function (obj) {
      try {
        this.uiFlags.isLoading = true
        const { data } = await changePasswordServices.create(obj)
        toast.showToast('SUCCESS', data.message, 'success')
      } catch (error) {
        console.log(error)
        throw error
      } finally {
        this.uiFlags.isLoading = false
      }
    },

    resendCode: async function (obj) {
      try {
        this.uiFlags.isLoading = true
        const { data } = await resendCodeServices.create(obj)
        toast.showToast('SUCCESS', data.message, 'success')
        this.record = data.data
        // window.$cookies.set('aplus-token', data.data.token, '30d');
        // // save is_teacher to cookies
        // window.$cookies.set('is_teacher', data.data.is_teacher || false, '30d');
        // window.location.href = '/';
      } catch (error) {
        console.log(error)
        throw error
      } finally {
        this.uiFlags.isLoading = false
      }
    },

    login: async function (obj, showMassage = true) {
      try {
        this.uiFlags.isLoading = true
        const { data } = await LoginServices.create(obj)
        window.$cookies.set('aplus-token', data.data.token, '30d')
        // store type of user in cookies
        window.$cookies.set('aplus-userType', data.data.type, '30d')
        this.record = data.data
        if (showMassage) {
          toast.showToast('SUCCESS', data.message, 'success')
        }
        router.push({
          name: 'home',
        })
      } catch (error) {
        console.log(error)
        throw error
      } finally {
        this.uiFlags.isLoading = false
      }
    },

    forgetPassword: async function (obj, showMassage = true) {
      try {
        this.uiFlags.isLoading = true
        const { data } = await forgetPasswordServices.create(obj)
        // store reset password token in cookies time 1 hour
        window.$cookies.set('reset-password-token', data.data.token, '1h')
        if (showMassage) {
          toast.showToast('SUCCESS', data.message, 'success')
        }
        router.push('otp')
      } catch (error) {
        console.log(error)
        throw error
      } finally {
        this.uiFlags.isLoading = false
      }
    },

    instructorLogin: async function (obj) {
      try {
        this.uiFlags.isLoading = true
        const { data } = await LoginTeacherServices.create(obj)
        toast.showToast('SUCCESS', data.message, 'success')
        this.record = data.data

        window.$cookies.set('aplus-token', data.data.token, '30d')

        // save is_teacher to cookies
        window.$cookies.set('is_teacher', data.data.is_teacher || false, '30d')

        window.location.href = '/about-us'
      } catch (error) {
        console.log(error)
        throw error
      } finally {
        this.uiFlags.isLoading = false
      }
    },

    getProfile: async function () {
      try {
        this.uiFlags.isLoggingIn = true
        const { data } = await ProfileServices.get()
        this.record = data.data
      } catch (error) {
        console.log(error)
        throw error
      } finally {
        this.uiFlags.isLoggingIn = false
      }
    },

    updateProfile: async function () {
      try {
        this.uiFlags.isLoading = true
        const { data } = await InstructorUpdateStatus.update()
        toast.showToast('SUCCESS', data.message, 'success')
        console.log(data)
      } catch (error) {
        console.log(error)
        throw error
      } finally {
        this.uiFlags.isLoading = false
      }
    },
    async checkLogin() {
      // Read user data from cookies
      if (window.$cookies.isKey('aplus-token')) {
        await this.getProfile()
      }
    },
    logout() {
      window.$cookies.remove('aplus-token')
      if (window.$cookies.isKey('aplus-userType')) {
        window.$cookies.remove('aplus-userType')
      }
      this.record = null
      window.location.reload()
    },
  },
})
