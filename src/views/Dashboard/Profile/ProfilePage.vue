<template>
  <div
    class="shadow-lg dark:from-surface-950 dark:to-surface-900 px-6 py-4 md:px-12 lg:px-20 flex items-center justify-center relative rtl"
    role="region"
    aria-label="الملف الشخصي"
  >
    <!-- Banner Image -->
    <img
      :src="images.profileBanner"
      class="absolute inset-0 w-full h-full object-cover opacity-5 dark:opacity-5 z-0 transform transition-transform duration-1000"
      loading="lazy"
      @error="handleImageError('profileBanner')"
    />
    <div
      class="bg-white dark:bg-surface-900 p-8 md:p-12 rounded-3xl shadow-xl w-full max-w-4xl mx-auto flex flex-col gap-8 transition-all duration-300 z-1"
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
          الملف الشخصي
        </h1>
      </div>

      <!-- Profile Information -->
      <div v-if="isLoading" class="text-center text-surface-600 dark:text-surface-300">
        جاري تحميل البيانات...
      </div>
      <div v-else-if="user" class="flex flex-col gap-6 animate-fade-in">
        <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Editable Fields -->
          <div class="flex flex-col gap-2">
            <a-input
              label="الاسم"
              placeholder="أدخل اسمك"
              v-model="form.name"
              :errorMessage="$t('errors.required')"
              :error="v$.name.$error"
              @blur="v$.name.$touch"
              :disabled="!isEditing"
              aria-required="true"
            />
          </div>
          <div class="flex flex-col gap-2">
            <a-input
              label="اسم المستخدم"
              v-model="form.user_name"
              placeholder="اسم المستخدم"
              disabled
              aria-readonly="true"
            />
          </div>
          <div class="flex flex-col gap-2">
            <a-input
              label="البريد الإلكتروني"
              placeholder="أدخل بريدك الإلكتروني"
              v-model="form.email"
              :errorMessage="$t('errors.email')"
              :error="v$.email.$error"
              @blur="v$.email.$touch"
              :disabled="!isEditing"
              aria-required="true"
            />
          </div>
          <div class="flex flex-col gap-2">
            <a-input
              label="رقم الهاتف"
              v-model="form.phone"
              placeholder="رقم الهاتف"
              disabled
              aria-readonly="true"
            />
          </div>
          <div class="flex flex-col gap-2">
            <a-input
              label="النوع"
              v-model="form.type"
              placeholder="النوع"
              disabled
              aria-readonly="true"
            />
          </div>
          <div class="flex flex-col gap-2">
            <a-select v-model="form.gender" label="النوع" :options="genders" />
          </div>

          <!-- Buttons -->
          <div class="md:col-span-2 flex justify-center space-x-4 space-x-reverse gap-4">
            <a-button
              v-if="!isEditing"
              label="تعديل الملف"
              iconPos="right"
              icon="pi pi-pencil"
              :disabled="authStore.uiFlags.isLoading"
              @click="isEditing = true"
              aria-label="تعديل الملف"
            />
            <a-button
              v-else
              type="submit"
              label="حفظ التغييرات"
              iconPos="right"
              icon="pi pi-check"
              :loading="isSubmitting"
              :disabled="authStore.uiFlags.isLoading || v$.$error"
              aria-label="حفظ التغييرات"
            />
            <a-button
              v-if="isEditing"
              label="إلغاء"
              iconPos="right"
              icon="pi pi-times"
              :disabled="uiFlags.isLoading"
              @click="cancelEdit"
              aria-label="إلغاء التعديل"
            />
          </div>
        </form>
      </div>
      <div v-else class="text-center text-surface-600 dark:text-surface-300">
        تعذر تحميل بيانات الملف الشخصي
      </div>
    </div>
    <Toast />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { useAuthStore } from '@/stores/Auth/auth.store'
import useImages from '@/helpers/images.helper'
import Toast from 'primevue/toast'
import { optionsGender } from '@/enums/genders.enums'

// Variables
const genders = computed(() => optionsGender.value())
const images = useImages()
const authStore = computed(() => useAuthStore())

const isEditing = ref(false)
const isSubmitting = ref(false)
const isLoading = ref(false)

const user = computed(() => authStore.value?.record || null)
const form = computed(() => {
  return {
    name: user.value?.name || '',
    user_name: user.value?.user_name || '',
    email: user.value?.email || '',
    phone: user.value?.phone || '',
    type: user.value?.type || '',
    gender: genders.value.find((g) => g.value === user.value?.gender) || '',
  }
})
const rules = {
  name: { required },
  email: { required, email },
}

const v$ = useVuelidate(rules, form)

const initializeForm = () => {
  if (user.value) {
    form.value.name = user.value.name || ''
    form.value.email = user.value.email || ''
  } else {
    console.warn('No user data available for form initialization')
  }
}

const handleImageError = (key) => {
  images[key] = 'https://fakeimg.pl/800x200/cccccc/ffffff?text=بديل&font=noto'
}

const submitForm = async () => {
  v$.value.$touch()
  if (v$.value.$error) return
  isSubmitting.value = true
  try {
    await authStore.value?.updateProfile(form.value)
    isEditing.value = false
  } catch (error) {
    console.error('Profile update error:', error)
  } finally {
    isSubmitting.value = false
  }
}

const cancelEdit = () => {
  isEditing.value = false
  initializeForm()
}

onMounted(async () => {
  if (authStore.value?.uiFlags.isLogin && !authStore.value?.uiFlags.record) {
    isLoading.value = true
    try {
      await authStore.value?.checkLogin()
      initializeForm()
    } catch (error) {
      console.error('Failed to fetch profile:', error)
    } finally {
      isLoading.value = false
    }
  } else {
    initializeForm()
  }
})
</script>

<style scoped>
.rtl {
  direction: rtl;
  text-align: right;
  font-family: var(--font-family-sans);
}

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

button:focus,
input:focus,
a:focus {
  outline: 2px solid var(--p-primary-color);
  outline-offset: 2px;
}

* {
  transition:
    background-color 0.3s,
    color 0.3s,
    border-color 0.3s;
}
</style>
