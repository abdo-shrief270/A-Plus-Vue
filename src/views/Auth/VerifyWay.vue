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

    <div class="container mx-auto flex flex-col items-center justify-start mt-4">
      <div class="m-8 w-full max-w-xl">
        <!-- الشعار -->
        <div class="flex justify-end items-center my-8">
          <img :src="images.logo" alt="logo" class="h-12" />
        </div>

        <h2 class="text-2xl font-bold text-primary-700 text-center my-12">اختر وسيلة التحقق</h2>

        <!-- خيارات التحقق -->
        <div class="border border-primary-200 rounded-2xl p-8">
          <div class="flex items-center justify-center gap-4">
            <Button
              :class="
                selected === 'username' ? 'bg-primary text-white' : 'bg-white text-primary border'
              "
              class="border rounded-full px-6 py-2"
              outlined="true"
              @click="selectWay('username')"
            >
              اسم المستخدم
            </Button>

            <Button
              :class="
                selected === 'email' ? 'bg-primary text-white' : 'bg-white text-primary border'
              "
              class="border rounded-full px-6 py-2"
              @click="selectWay('email')"
              outlined="true"
            >
              البريد الإلكتروني
            </Button>

            <Button
              :class="
                selected === 'phone' ? 'bg-primary text-white' : 'bg-white text-primary border'
              "
              class="border rounded-full px-6 py-2"
              @click="selectWay('phone')"
              outlined="true"
            >
              الجوال
            </Button>
          </div>
        </div>
      </div>

      <!-- المودال -->
      <Dialog v-model:visible="visible" modal header="أدخل البيانات" class="w-[90vw] md:w-[30vw]">
        <div v-if="selected === 'username'">
          <label class="block mb-2 text-sm font-medium">اسم المستخدم</label>
          <InputText v-model="inputValue" class="w-full" />
        </div>
        <div v-else-if="selected === 'email'">
          <label class="block mb-2 text-sm font-medium">البريد الإلكتروني</label>
          <InputText v-model="inputValue" class="w-full" />
        </div>
        <div v-else-if="selected === 'phone'">
          <label class="block mb-2 text-sm font-medium">رقم الجوال</label>
          <a-phone v-model="inputValue" mask="9999-999-9999" class="w-full" />
        </div>

        <template #footer>
          <Button label="استمرار" @click="submit" class="bg-primary w-full text-white" />
        </template>
      </Dialog>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import InputMask from 'primevue/inputmask'
import useImages from '@/helpers/images.helper'

const images = useImages()
const selected = ref(null)
const visible = ref(false)
const inputValue = ref('')

const selectWay = (way) => {
  selected.value = way
  inputValue.value = ''
  visible.value = true
}

const submit = () => {
  console.log(`Selected method: ${selected.value}, Input: ${inputValue.value}`)
  visible.value = false
}
</script>
<style scoped>
/* Add custom styling to match the image */
:deep(.p-dialog) {
  border-radius: 12px;
  direction: rtl;
}
:deep(.p-dialog .p-dialog-header) {
  border-bottom: none;
  padding-bottom: 0;
}
:deep(.p-dialog .p-dialog-content) {
  padding: 1rem;
}
:deep(.p-dropdown) {
  border: 1px solid #d1d5db;
  border-radius: 6px;
}
:deep(.p-inputmask) {
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 0.5rem;
}
</style>
