<template>
  <div class="grid grid-cols-1 md:grid-cols-2 min-h-screen">
    <!-- الصورة -->
    <div
      class="hidden px-12 md:flex relative items-start justify-center bg-primary-100 overflow-hidden"
    >
      <img src="../../assets/images/auth/authBg.png" class="absolute w-full h-full object-cover" />
      <div class="z-[100] mt-4 w-full flex flex-col items-start justify-start">
        <div class="self-center text-center mt-4">
          <h1 class="text-2xl font-bold text-white">استعد لامتحاناتك مع خطتنا المجانية!</h1>
          <p class="text-white text-lg my-4">سجل الآن وخليك متفوق</p>
        </div>
      </div>
      <img
        src="../../assets/images/auth/girlAuth.png"
        class="absolute z-10 bottom-0 w-[70%] max-h-[75%] object-contain"
        alt="auth image"
      />
    </div>

    <!-- النموذج -->
    <div class="container mx-auto flex flex-col items-center justify-center mt-4">
      <div class="m-8 w-full max-w-xl">
        <!-- الشعار -->
        <div class="flex justify-end mb-8">
          <img :src="images.logo" alt="logo" class="h-12" />
        </div>

        <!-- النموذج -->
        <div class="border border-primary-200 rounded-2xl p-8">
          <h2 class="text-xl font-bold mb-6 text-center">سجل الآن وابدأ خطة دراستك من هنا!</h2>

          <form class="space-y-4" @submit.prevent="login">
            <a-input
              v-model="loginObj.user_name"
              type="text"
              label="اسم المستخدم"
              placeholder="ادخل اسم المستخدم"
              :error="v$.user_name.$error"
              :errorMessage="v$.user_name.required.$invalid && 'اسم المستخدم مطلوب'"
              @blur="v$.user_name.$touch"
            />

            <a-password
              v-model="loginObj.password"
              label="كلمة المرور"
              placeholder="ادخل كلمة المرور"
              :error="v$.password.$error"
              :errorMessage="v$.password.required.$invalid && 'كلمة المرور مطلوبة'"
              @blur="v$.password.$touch"
            />

            <router-link
              to="/verify-way"
              class="text-right text-sm text-primary underline cursor-pointer"
            >
              هل نسيت كلمة المرور؟
            </router-link>

            <Button
              label="تسجيل الدخول"
              class="w-full mt-4"
              type="submit"
              :disabled="v$.$invalid || authStore.uiFlags.isLoading"
            />

            <div class="text-center mt-4">
              <p class="text-sm text-gray-600">
                لست مشتركاً بعد؟
                <router-link to="/sign-up" class="text-primary cursor-pointer underline">
                  فتح حساب
                </router-link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import useImages from '@/helpers/images.helper'
import { usePageImage } from '@/composables/usePageImage'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useAuthStore } from '@/stores/Auth/auth.store'

const authStore = useAuthStore()
const images = useImages()
usePageImage(new URL('@/assets/images/auth/girlAuth.png', import.meta.url).href)

const loginObj = ref({
  user_name: '',
  password: '',
})

// validation rules
const rules = computed(() => ({
  user_name: { required },
  password: { required },
}))

const v$ = useVuelidate(rules, loginObj)

const login = async () => {
  v$.value.$touch()
  if (v$.value.$invalid) return
  await authStore.login(loginObj.value)
}
</script>
