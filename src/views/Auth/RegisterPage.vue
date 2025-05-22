<template>
  <div
    class="bg-gradient-to-br from-teal-50 to-indigo-100 dark:from-surface-950 dark:to-surface-800 px-6 py-12 md:px-12 lg:px-20 min-h-screen flex items-center justify-center relative overflow-hidden font-sans"
  >
    <!-- Background Image -->
    <img
      :src="images.homeHeroBg"
      class="absolute inset-0 w-full h-full object-cover opacity-10 dark:opacity-10 z-0 transform transition-transform duration-1000 ease-in-out"
      :class="{ 'scale-110': isParallax }"
      alt="خلفية القسم الرئيسي"
      loading="lazy"
      @error="handleImageError('homeHeroBg')"
    />

    <!-- Form Container -->
    <div
      class="bg-white dark:bg-surface-800 p-8 md:p-12 rounded-3xl shadow-lg w-full max-w-2xl mx-auto flex flex-col gap-8 transition-all duration-500 z-10 hover:shadow-xl"
    >
      <!-- Header Section -->
      <div class="flex flex-col items-center gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-16 w-16 text-primary-600 dark:text-teal-400 animate-float"
          width="33"
          height="33"
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
        <h1
          class="text-3xl font-bold text-surface-900 dark:text-surface-50 text-center animate-fade-in"
        >
          إنشاء حساب جديد
        </h1>
        <p class="text-center text-surface-600 dark:text-surface-300">
          لديك حساب بالفعل؟
          <router-link
            to="/sign-in"
            class="text-primary-600 font-medium hover:text-primary-700 transition-colors duration-300"
            aria-label="تسجيل الدخول"
          >
            سجل الدخول
          </router-link>
        </p>
      </div>

      <!-- Step Indicator -->
      <div class="flex justify-center gap-3 mb-6">
        <div
          v-for="step in totalSteps"
          :key="step"
          :class="[
            'h-1.5 rounded-full transition-all duration-600 ease-in-out',
            currentStep >= step ? 'bg-primary-600 w-10' : 'bg-surface-300 dark:bg-surface-600 w-5',
          ]"
        ></div>
      </div>

      <!-- Form Steps -->
      <form @submit.prevent="handleSubmit" class="flex flex-col gap-6 animate-slide-in">
        <!-- Step 1: User Type Selection with Unsplash Images -->
        <div v-if="currentStep === 1" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            :class="[
              'relative p-5 rounded-xl shadow-md transition-all duration-300 cursor-pointer',
              userType === 'student'
                ? 'bg-primary-50 dark:bg-primary-900 border-2 border-primary-600 animate-fade-scale'
                : 'bg-surface-100 dark:bg-surface-800',
            ]"
            @click="setUserType('student')"
          >
            <img
              :src="images.student"
              class="w-24 h-24 mx-auto mb-3 rounded-full object-cover border-2 border-surface-300 dark:border-surface-600 transition-transform duration-300 hover:scale-105"
              alt="طالب في بيئة تعليمية"
              loading="lazy"
            />
            <span class="font-semibold text-surface-900 dark:text-surface-50">طالب</span>
            <div
              v-if="userType === 'student'"
              class="absolute inset-0 bg-primary-600 bg-opacity-10 rounded-xl z-[-1]"
            ></div>
          </button>
          <button
            type="button"
            :class="[
              'relative p-5 rounded-xl shadow-md transition-all duration-300 cursor-pointer',
              userType === 'parent'
                ? 'bg-primary-50 dark:bg-primary-900 border-2 border-primary-600 animate-fade-scale'
                : 'bg-surface-100 dark:bg-surface-800',
            ]"
            @click="setUserType('parent')"
          >
            <img
              :src="images.parent"
              class="w-24 h-24 mx-auto mb-3 rounded-full object-cover border-2 border-surface-300 dark:border-surface-600 transition-transform duration-300 hover:scale-105"
              alt="ولي أمر في بيئة عائلية"
              loading="lazy"
            />
            <span class="font-semibold text-surface-900 dark:text-surface-50">ولي أمر</span>
            <div
              v-if="userType === 'parent'"
              class="absolute inset-0 bg-primary-600 bg-opacity-10 rounded-xl z-[-1]"
            ></div>
          </button>
        </div>

        <!-- Step 2: Common Fields -->
        <div v-if="currentStep === 2" class="flex flex-col gap-6">
          <div class="flex flex-col gap-2 relative">
            <a-input
              label="الاسم"
              placeholder="الاسم"
              v-model="createObj.name"
              :errorMessage="$t('errors.required')"
              :error="v$.name.$error"
              @blur="v$.name.$touch"
              class="transition-all duration-300 focus:ring-2 focus:ring-primary-600 rounded-lg"
            />
          </div>
          <div class="flex flex-col gap-2 relative">
            <a-input
              label="اسم المستخدم"
              placeholder="اسم المستخدم"
              v-model="createObj.user_name"
              :errorMessage="$t('errors.required')"
              :error="v$.user_name.$error"
              @blur="v$.user_name.$touch"
              class="transition-all duration-300 focus:ring-2 focus:ring-primary-600 rounded-lg"
              @input="checkUsernameAvailability()"
            />
            <div v-if="isUsernameAvailable !== null" class="text-sm mt-1">
              <span v-if="isUsernameAvailable" class="text-green-600">اسم المستخدم متاح</span>
              <span v-else class="text-red-600">اسم المستخدم غير متاح</span>
            </div>
          </div>
          <div class="flex flex-col gap-2 relative">
            <a-input
              label="البريد الإلكتروني"
              placeholder="البريد الإلكتروني"
              v-model="createObj.email"
              :errorMessage="$t('errors.email')"
              :error="v$.email.$error"
              @blur="v$.email.$touch"
              class="transition-all duration-300 focus:ring-2 focus:ring-primary-600 rounded-lg"
            />
          </div>
          <div class="flex flex-col gap-2 relative">
            <a-input
              label="رقم الهاتف"
              placeholder="رقم الهاتف"
              v-model="createObj.phone"
              :errorMessage="$t('errors.required')"
              :error="v$.phone.$error"
              @blur="v$.phone.$touch"
              class="transition-all duration-300 focus:ring-2 focus:ring-primary-600 rounded-lg"
            />
          </div>
          <div class="flex flex-col gap-2 relative">
            <a-select v-model="createObj.gender" label="النوع" :options="genders" />
          </div>
          <div class="flex flex-col gap-2 relative">
            <a-password
              label="كلمة المرور"
              placeholder="كلمة المرور"
              v-model="createObj.password"
              :errorMessage="$t('errors.required')"
              :error="v$.password.$error"
              @blur="v$.password.$touch"
              class="transition-all duration-300 focus:ring-2 focus:ring-primary-600 rounded-lg"
            />
          </div>
          <div class="flex flex-col gap-2 relative">
            <a-password
              label="تأكيد كلمة المرور"
              placeholder="تأكيد كلمة المرور"
              v-model="createObj.password_confirmation"
              :errorMessage="$t('errors.required')"
              :error="v$.password_confirmation.$error"
              @blur="v$.password_confirmation.$touch"
              class="transition-all duration-300 focus:ring-2 focus:ring-primary-600 rounded-lg"
            />
          </div>
        </div>

        <!-- Step 3: Student-Specific Fields -->
        <div v-if="currentStep === 3 && userType === 'student'" class="flex flex-col gap-6">
          <div class="flex flex-col gap-2 relative">
            <a-select
              label="رقم الامتحان"
              placeholder="اختر نوع الامتحان"
              v-model="createObj.exam_id"
              :options="examOptions"
              :errorMessage="$t('errors.required')"
              :error="v$.exam_id.$error"
              @blur="v$.exam_id.$touch"
              class="transition-all duration-300 focus:ring-2 focus:ring-primary-600 rounded-lg"
            />
          </div>
          <div class="flex flex-col gap-2 relative">
            <DatePicker
              label="تاريخ الامتحان"
              showIcon
              fluid
              iconDisplay="input"
              placeholder="تاريخ الامتحان"
              v-model="createObj.exam_date"
              :errorMessage="$t('errors.required')"
              :error="v$.exam_date.$error"
              @blur="v$.exam_date.$touch"
              class="transition-all duration-300 focus:ring-2 focus:ring-primary-600 rounded-lg"
            />
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex justify-between gap-4">
          <a-button
            v-if="currentStep > 1"
            type="button"
            icon="pi pi-arrow-right"
            iconPos="right"
            label="الرجوع"
            :disabled="uiFlags.isLoading"
            class="bg-surface-200 dark:bg-surface-700 text-surface-900 dark:text-surface-50 hover:bg-surface-300 dark:hover:bg-surface-600 transition-all duration-300 rounded-lg"
            @click="previousStep"
          />
          <a-button
            v-if="currentStep < totalSteps"
            type="button"
            label="التالي"
            icon="pi pi-arrow-left"
            :disabled="isNextDisabled"
            class="bg-primary-600 text-white hover:bg-primary-700 transition-all duration-300 rounded-lg"
            @click="nextStep"
          />
          <a-button
            v-if="currentStep === totalSteps"
            type="submit"
            label="إنشاء الحساب"
            icon="pi pi-user-plus"
            :loading="loading"
            :disabled="uiFlags.isLoading || v$.$error"
            class="bg-primary-600 text-white hover:bg-primary-700 transition-all duration-300 rounded-lg"
            @click="submit"
          />
        </div>
      </form>
    </div>
    <Toast />
  </div>
</template>

<script setup>
import useImages from '@/helpers/images.helper'
import { ref, computed, inject } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, sameAs } from '@vuelidate/validators'
import { useAuthStore } from '@/stores/Auth/auth.store'
import { useRoute, useRouter } from 'vue-router'
import { optionsGender } from '@/enums/genders.enums'
import { debounce } from 'vue-debounce'

const { register, uiFlags } = useAuthStore()
const $api = inject('$api')
const checkUsername = new $api('auth/username/check')
const router = useRouter()
const route = useRoute()
const loading = ref(false)
const isUsernameAvailable = ref(null) // New state for username availability
const images = useImages()
const currentStep = ref(1)
const userType = ref(route.query.type || 'student')
const genders = computed(() => optionsGender.value())
const createObj = ref({
  name: '',
  user_name: '',
  email: '',
  phone: '',
  exam_id: '',
  exam_date: '',
  password: '',
  password_confirmation: '',
  type: userType.value,
  gender: '',
})

const totalSteps = computed(() => (userType.value === 'student' ? 3 : 2))
const examOptions = [
  { value: '1', name: 'تحصيلي' },
  { value: '2', name: 'قدرات' },
]

const setUserType = (type) => {
  userType.value = type
  createObj.value.type = type
  if (type === 'parent') {
    createObj.value.exam_id = ''
    createObj.value.exam_date = ''
  }
  currentStep.value = 1
  router.push({ query: { type } })
}

const rules = computed(() => {
  const baseRules = {
    name: { required },
    user_name: { required },
    email: { required, email },
    phone: { required },
    password: { required },
    password_confirmation: { required, sameAs: sameAs(computed(() => createObj.value.password)) },
    type: { required },
    gender: { required },
  }

  if (userType.value === 'student' && currentStep.value === 3) {
    return {
      ...baseRules,
      exam_id: { required },
      exam_date: { required },
    }
  }
  return baseRules
})

const v$ = useVuelidate(rules, createObj)

const isNextDisabled = computed(() => {
  if (currentStep.value === 1) {
    return !userType.value
  }
  if (currentStep.value === 2) {
    return (
      v$.value.name.$invalid ||
      v$.value.user_name.$invalid ||
      v$.value.email.$invalid ||
      v$.value.phone.$invalid ||
      v$.value.password.$invalid ||
      v$.value.password_confirmation.$invalid ||
      isUsernameAvailable.value == false
    )
  }
  if (currentStep.value === 3 && userType.value === 'student') {
    return v$.value.exam_id.$invalid || v$.value.exam_date.$invalid
  }
  return false
})

const nextStep = () => {
  if (currentStep.value === 1) {
    if (!isNextDisabled.value) {
      currentStep.value++
    }
  } else if (currentStep.value === 2) {
    v$.value.name.$touch()
    v$.value.user_name.$touch()
    v$.value.email.$touch()
    v$.value.phone.$touch()
    v$.value.password.$touch()
    v$.value.password_confirmation.$touch()
    if (!isNextDisabled.value) {
      currentStep.value++
    }
  } else if (currentStep.value === 3 && userType.value === 'student') {
    v$.value.exam_id.$touch()
    v$.value.exam_date.$touch()
    if (!isNextDisabled.value) {
      currentStep.value++
    }
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const submit = async () => {
  v$.value.$touch()
  if (v$.value.$error) return
  try {
    loading.value = true
    const dataToSend = { ...createObj.value }
    if (userType.value === 'parent') {
      delete dataToSend.exam_id
      delete dataToSend.exam_date
    }
    await register(dataToSend)
  } finally {
    loading.value = false
  }
}

const handleSubmit = (e) => {
  e.preventDefault()
}

const checkUsernameAvailability = debounce(async () => {
  if (!createObj.value.user_name) {
    isUsernameAvailable.value = null
    return
  }
  try {
    loading.value = true
    const { data } = await checkUsername.create({ user_name: createObj.value.user_name })
    console.log(data)
    isUsernameAvailable.value = data.data.available // Adjust based on your API response
    console.log('Username check response:', data)
  } catch (error) {
    console.error('Username check failed:', error)
    isUsernameAvailable.value = false
  } finally {
    loading.value = false
  }
}, 400)
</script>

<style scoped></style>
