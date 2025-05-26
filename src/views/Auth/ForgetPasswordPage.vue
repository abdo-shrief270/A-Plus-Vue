<template>
  <div
    class="bg-gradient-to-br from-teal-50 to-indigo-50 dark:from-surface-950 dark:to-surface-900 px-6 py-12 md:px-12 lg:px-20 min-h-screen flex items-center justify-center relative"
  >
    <img
      :src="images.homeHeroBg"
      class="absolute inset-0 w-full h-full object-cover opacity-5 dark:opacity-5 z-0 transform transition-transform duration-1000"
      :class="{ 'scale-110': isParallax }"
      alt="خلفية صفحة استعادة كلمة المرور"
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
          استعادة كلمة المرور
        </h1>
        <p class="text-center text-surface-600 dark:text-surface-300">
          اختر إرسال رمز التحقق عبر رقم الهاتف أو البريد الإلكتروني او اسم المستخدم
        </p>
      </div>

      <!-- Form Section -->
      <form @submit.prevent="" class="flex flex-col gap-6 animate-fade-in">
        <div class="flex flex-col gap-2">
          <label class="text-surface-900 dark:text-surface-50 font-medium">
            طريقة إرسال رمز التحقق <span class="text-red-500">*</span>
          </label>
          <div class="flex gap-4">
            <div class="flex items-center gap-2">
              <RadioButton
                inputId="phone"
                name="otpMethod"
                value="phone"
                v-model="createObj.otpMethod"
                aria-label="إرسال عبر الهاتف"
              />
              <label for="phone" class="text-surface-900 dark:text-surface-50">الهاتف</label>
            </div>
            <div class="flex items-center gap-2">
              <RadioButton
                inputId="email"
                name="otpMethod"
                value="email"
                v-model="createObj.otpMethod"
                aria-label="إرسال عبر البريد الإلكتروني"
              />
              <label for="email" class="text-surface-900 dark:text-surface-50"
                >البريد الإلكتروني</label
              >
            </div>

            <div class="flex items-center gap-2">
              <RadioButton
                inputId="user_name"
                name="otpMethod"
                value="user_name"
                v-model="createObj.otpMethod"
                aria-label="إرسال عبر البريد الإلكتروني"
              />
              <label for="user_name" class="text-surface-900 dark:text-surface-50"
                >إسم المستخدم</label
              >
            </div>
          </div>
        </div>

        <div v-if="createObj.otpMethod === 'phone'" class="flex flex-col gap-2">
          <a-phone
            v-model="createObj.phone"
            class="md:col-span-2"
            :errorMessage="v$.phone.required.$invalid && $t('errors.required')"
            :error="v$.phone.$error"
            @blur="v$.phone.$touch"
            @country="(val) => (createObj.country_code = val)"
          />
        </div>

        <div v-if="createObj.otpMethod === 'email'" class="flex flex-col gap-2">
          <a-input
            label="البريد الإلكتروني"
            placeholder="أدخل بريدك الإلكتروني"
            v-model="createObj.email"
            :errorMessage="$t('errors.email')"
            :error="v$.email.$error"
            @blur="v$.email.$touch"
          >
            <template #label>
              <span>البريد الإلكتروني <span class="text-red-500">*</span></span>
            </template>
          </a-input>
        </div>

        <div v-if="createObj.otpMethod === 'user_name'" class="flex flex-col gap-2">
          <a-input
            label="إسم المستخدم"
            placeholder="أدخل  اسم المستخدم"
            v-model="createObj.user_name"
            :errorMessage="$t('errors.required')"
            :error="v$.user_name.$error"
            @blur="v$.user_name.$touch"
          >
            <template #label>
              <span> اسم المستخدم <span class="text-red-500">*</span></span>
            </template>
          </a-input>
        </div>

        <a-button
          type="submit"
          label="إرسال رمز التحقق"
          iconPos="right"
          icon="pi pi-envelope"
          :loading="loading"
          :disabled="uiFlags.isLoading || isInvalid"
          @click="submit()"
        />

        <router-link
          to="/sign-in"
          class="text-primary-500 font-medium hover:text-primary-600 transition-colors text-center"
          aria-label="العودة إلى تسجيل الدخول"
        >
          العودة إلى تسجيل الدخول
        </router-link>
      </form>
    </div>
    <Toast />
  </div>
</template>

<script setup>
import useImages from '@/helpers/images.helper'
import { ref, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { useAuthStore } from '@/stores/Auth/auth.store'
import RadioButton from 'primevue/radiobutton'
import { useRouter } from 'vue-router'

// Variables
const router = useRouter()
const { forgetPassword, uiFlags } = useAuthStore()
const loading = ref(false)
const images = useImages()
const createObj = ref({
  phone: '',
  email: '',
  user_name: '',
  country_code: '',
  otpMethod: 'phone', // Default to phone
})

// Dynamic validation rules based on otpMethod
const rules = computed(() => ({
  otpMethod: { required },
  phone: createObj.value.otpMethod === 'phone' ? { required } : {},
  user_name: createObj.value.otpMethod === 'user_name' ? { required } : {},
  email: createObj.value.otpMethod === 'email' ? { required, email } : {},
  country_code: createObj.value.otpMethod === 'phone' ? { required } : {},
}))

const v$ = useVuelidate(rules, createObj)

// Compute form validity to enable/disable submit button
const isInvalid = computed(() => {
  if (!createObj.value.otpMethod) return true
  if (createObj.value.otpMethod === 'phone') {
    return v$.value.phone.$error || !createObj.value.phone
  }
  if (createObj.value.otpMethod === 'email') {
    return v$.value.email.$error || !createObj.value.email
  }
  if (createObj.value.otpMethod === 'user_name') {
    return v$.value.user_name.$error || !createObj.value.user_name
  }
  return false
})

const submit = async () => {
  v$.value.$touch()
  if (isInvalid.value) return

  try {
    loading.value = true
    // Prepare payload with only the relevant field
    const payload = {
      otpMethod: createObj.value.otpMethod,
      [createObj.value.otpMethod]: createObj.value[createObj.value.otpMethod],
    }

    if (createObj.value.otpMethod === 'phone') {
      payload.country_code = createObj.value.country_code
    }

    await forgetPassword(payload)
    // add query params to route with type ot otpmethod
    const query = {
      otpMethod: createObj.value.otpMethod,
      [createObj.value.otpMethod]: createObj.value[createObj.value.otpMethod],
    }

    // Add country_code to query if otpMethod is 'phone'
    if (createObj.value.otpMethod === 'phone') {
      query.country_code = createObj.value.country_code
    }

    // Single router.push with dynamic query
    router.push({
      name: 'otp',
      query,
    })
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
.p-radiobutton:focus {
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
</style>
