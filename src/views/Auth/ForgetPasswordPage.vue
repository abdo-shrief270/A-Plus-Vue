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
          <h2 class="text-xl font-bold mb-6 text-center">نسيت كلمة المرور؟</h2>

          <div class="space-y-4">
            <a-input
              v-model="email"
              type="email"
              label="البريد الإلكتروني"
              placeholder="ادخل بريدك الإلكتروني لاستعادة كلمة المرور"
            />

            <Button label="إرسال رابط الاستعادة" class="w-full mt-4" @click="sendResetLink" />

            <div class="text-center mt-4">
              <p class="text-sm text-gray-600">
                تذكرت كلمة المرور؟
                <span class="text-primary cursor-pointer underline">تسجيل الدخول</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useImages from '@/helpers/images.helper'
import { usePageImage } from '@/composables/usePageImage'

const images = useImages()
usePageImage(new URL('@/assets/images/auth/girlAuth.png', import.meta.url).href)

const email = ref('')

const sendResetLink = () => {
  console.log('استعادة كلمة المرور:', email.value)
  // Call API to send reset link
}
</script>
