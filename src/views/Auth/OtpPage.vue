<template>
  <div
    class="bg-gradient-to-br from-teal-50 to-indigo-50 dark:from-surface-950 dark:to-surface-900 px-6 py-12 md:px-12 lg:px-20 min-h-screen flex items-center justify-center relative"
  >
    <img
      :src="images.homeHeroBg"
      class="absolute inset-0 w-full h-full object-cover opacity-5 dark:opacity-5 z-0 transform transition-transform duration-1000"
      :class="{ 'scale-110': isParallax }"
      alt="خلفية صفحة التحقق من رمز OTP"
      loading="lazy"
      @error="handleImageError('homeHeroBg')"
    />
    <div
      class="bg-white dark:bg-surface-900 p-8 md:p-12 rounded-3xl shadow-xl w-full max-w-xl mx-auto flex flex-col gap-8 transition-all duration-300 z-1"
    >
      <!-- Header Section -->
      <div class="flex flex-col items-center gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-16 w-16 text-primary-500 dark:text-teal-400"
          width="33"
          height="32"
          viewBox="0 0 33 32"
          fill="none"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.09219 2.87829C5.94766 3.67858 4.9127 4.62478 4.01426 5.68992C7.6857 5.34906 12.3501 5.90564 17.7655 8.61335C23.5484 11.5047 28.205 11.6025 31.4458 10.9773C31.1517 10.087 30.7815 9.23135 30.343 8.41791C26.6332 8.80919 21.8772 8.29127 16.3345 5.51998C12.8148 3.76014 9.71221 3.03521 7.09219 2.87829ZM28.1759 5.33332C25.2462 2.06 20.9887 0 16.25 0C14.8584 0 13.5081 0.177686 12.2209 0.511584C13.9643 0.987269 15.8163 1.68319 17.7655 2.65781C21.8236 4.68682 25.3271 5.34013 28.1759 5.33332ZM32.1387 14.1025C28.2235 14.8756 22.817 14.7168 16.3345 11.4755C10.274 8.44527 5.45035 8.48343 2.19712 9.20639C2.0292 9.24367 1.86523 9.28287 1.70522 9.32367C1.2793 10.25 0.939308 11.2241 0.695362 12.2356C1.955909 12.166 1.22514 12.0998 1.50293 12.0381C5.44966 11.161 11.0261 11.1991 17.7655 14.5689C23.8261 17.5991 28.6497 17.561 31.9029 16.838C32.0144 16.8133 32.1242 16.7877 32.2322 16.7613C32.2441 16.509 32.25 16.2552 32.25 16C32.25 15.358 32.2122 14.7248 32.1387 14.1025ZM31.7098 20.1378C27.8326 20.8157 22.5836 20.5555 16.3345 17.431C10.274 14.4008 5.45035 14.439 2.19712 15.1619C1.475 15.3223 0.825392 15.5178 0.252344 15.7241C0.250782 15.8158 0.25 15.9078 0.25 16C0.25 24.8366 7.41344 32 16.25 32C23.6557 32 29.8862 26.9687 31.7098 20.1378Z"
            class="fill-current"
          />
        </svg>
        <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-50 text-center">
          تحقق من رمز التحقق
        </h1>
        <p class="text-center text-surface-600 dark:text-surface-300">
          تأكد من رقم التحقق المرسل عبر
          <span class="text-primary-500 font-medium">
            {{ createObj.otpMethod === 'phone' ? createObj.phone : createObj.email }}
          </span>
        </p>
      </div>

      <!-- Form Section -->
      <form @submit.prevent="verifyOtp" class="flex flex-col gap-6 animate-fade-in">
        <InputOtp
          v-model="createObj.otp"
          size="large"
          class="w-full m-auto items-center justify-center"
          placeholder="0"
          :invalid="v$.otp.$error"
          :aria-label="$t('verify_otp.otpInput')"
          @blur="v$.otp.$touch"
        />
        <span v-if="v$.otp.$error" class="text-red-500 text-sm text-center">
          {{ $t('errors.required') }}
        </span>
        <a-button
          type="submit"
          label="تحقق"
          iconPos="right"
          icon="pi pi-check"
          :loading="loading"
          :disabled="uiFlags.isLoading || v$.otp.$error || !createObj.otp"
          @click="submit"
        />
        <button
          class="text-primary-500 font-medium hover:text-primary-600 transition-colors text-center"
          @click="resendCode"
          :disabled="uiFlags.isLoading"
          :aria-label="$t('verify_otp.resendCode')"
        >
          إعادة ارسال الكود
        </button>
      </form>
    </div>
    <Toast />
  </div>
</template>

<script setup>
import useImages from '@/helpers/images.helper'
import { ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useAuthStore } from '@/stores/Auth/auth.store'
import { useRoute } from 'vue-router'
import InputOtp from 'primevue/inputotp'
import router from '@/router'

// Variables
const { verifyOtp, resendCode, uiFlags } = useAuthStore()
const route = useRoute()
const loading = ref(false)
const images = useImages()
const createObj = ref({
  phone: route.query.phone || '',
  email: route.query.email || '',
  otpMethod: route.query.otpMethod || 'phone',
  otp: null,
})

// Validation rules for OTP
const rules = {
  otp: { required, $validator: (value) => /^[0-9]{4}$/.test(value) },
}

const v$ = useVuelidate(rules, createObj)

// Form submission
const submit = async () => {
  v$.value.$touch()
  if (v$.value.otp.$error || !createObj.value.otp) return

  try {
    loading.value = true

    const payload = {
      token: window.$cookies.get('reset-password-token'),
      otp: createObj.value.otp,
    }
    await verifyOtp(payload)
    router.push('reset-password')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Improved focus styles for accessibility */
button:focus,
input:focus,
a:focus,
.p-inputotp:focus {
  outline: 2px solid var(--p-primary-color);
  outline-offset: 2px;
}

/* Smooth transitions for dark mode */
* {
  transition:
    background-color 0.3s,
    color 0.3s,
    border-color 0.3s;
}

/* Red asterisk for required fields */
.text-red-500 {
  color: #ef4444; /* Tailwind's red-500 */
}

/* OTP input styling */
:deep(.p-inputotp-input) {
  width: 100%;
  height: 65px;
  text-align: center;
  font-size: 1.5rem;
  border-radius: 0.5rem;
}
</style>
