<template>
  <div class="grid grid-cols-1 md:grid-cols-2 min-h-screen">
    <!-- الصورة -->
    <div
      class="hidden px-12 md:flex relative items-start justify-center bg-primary-100 overflow-hidden"
    >
      <img src="../../assets/images/auth/authBg.png" class="absolute w-full h-full object-cover" />
      <div class="z-[100] mt-4 w-full flex flex-col items-start justify-start">
        <div>
          <a-button
            label="عودة"
            severity="link"
            variant="text"
            icon="pi pi-arrow-right"
            iconPos="right"
            class="text-white"
            style="color: white"
            @click="$router.push('/')"
          />
        </div>
        <div class="self-center text-center mt-4">
          <h1 class="text-4xl font-bold text-white">هلا والله فيك</h1>
          <p class="text-white text-xl my-4">افتح حسابك الحين وابداء رحلتك الدراسية!</p>
        </div>
      </div>
      <img
        :src="parentAccount ? images.parentAuth : images.girlAuth"
        class="absolute z-10 bottom-0 w-[70%] max-h-[75%] object-contain"
        alt="auth image"
      />
    </div>

    <!-- الفورم -->
    <div class="container mx-auto flex flex-col items-center justify-start mt-4">
      <div class="m-8 w-full max-w-xl">
        <!-- الشعار -->
        <div class="flex justify-end mb-8">
          <img :src="images.logo" alt="logo" class="h-12" />
        </div>

        <div v-if="!parentAccount">
          <!-- الخطوة الأولى -->
          <div v-if="step === 1" class="border border-primary-200 rounded-2xl p-8">
            <h2 class="text-xl font-bold mb-6 text-center">هلا والله فيك</h2>
            <p class="text-center text-gray-600 mb-6">افتح حسابك الحين وابدأ رحلتك الدراسية!</p>

            <div class="space-y-4">
              <a-input
                v-model="createObj.user_name"
                type="text"
                label="اسم المستخدم"
                placeholder="ادخل اسمك"
              />
              <a-input
                v-model="createObj.email"
                type="email"
                label="البريد الالكتروني"
                placeholder="ادخل بريدك الالكتروني"
              />
              <a-input
                v-model="createObj.password"
                type="password"
                label="كلمة المرور"
                placeholder="ادخل كلمة المرور"
              />
              <a-phone v-model:phone="createObj.phone" v-model:code="createObj.country_code" />

              <div>
                <label class="block font-medium mb-1">الجنس</label>
                <div class="flex gap-4">
                  <Button
                    :outlined="createObj.gender !== 'male'"
                    :severity="createObj.gender === 'male' ? 'primary' : 'secondary'"
                    class="w-full"
                    @click="createObj.gender = 'male'"
                    >ذكر</Button
                  >
                  <Button
                    :outlined="createObj.gender !== 'female'"
                    :severity="createObj.gender === 'female' ? 'primary' : 'secondary'"
                    class="w-full"
                    @click="createObj.gender = 'female'"
                    >أنثى</Button
                  >
                </div>
              </div>

              <Button label="التالي" class="w-full mt-4" @click="step++" />
              <Button
                label="فتح حساب ولي أمر"
                outlined
                class="w-full text-sm text-center mt-2"
                @click="parentAccount = true"
              />
            </div>
          </div>

          <!-- الخطوة الثانية -->
          <div v-else class="border border-primary-200 rounded-2xl p-8">
            <h2 class="text-xl font-bold mb-6 text-center">حدد هدفك وموعد امتحانك بسهولة</h2>
            <div class="space-y-4">
              <a-select
                v-model="createObj.goal"
                :options="goalOptions"
                label="حدد هدفك"
                placeholder="مثال: قدرات عامة"
              />
              <a-input v-model="createObj.exam_date" type="date" label="تاريخ الامتحان" />
              <div class="flex gap-4 mt-4">
                <Button label="رجوع" outlined class="w-full" @click="step--" />
                <Button label="إنشاء الحساب" class="w-full" @click="submitForm" />
              </div>
            </div>
          </div>
        </div>

        <!-- واجهة ولي الأمر -->
        <div v-else class="border border-primary-200 rounded-2xl p-8">
          <h2 class="text-xl font-bold mb-6 text-center">فتح حساب ولي أمر</h2>
          <p class="text-center text-gray-600 mb-6">أدخل بياناتك لربط حساب الطالب</p>

          <div class="space-y-4">
            <a-input
              v-model="createObj.user_name"
              type="text"
              label="اسم المستخدم"
              placeholder="ادخل اسمك"
            />
            <a-input
              v-model="createObj.email"
              type="email"
              label="البريد الالكتروني"
              placeholder="ادخل بريدك الالكتروني"
            />
            <a-phone v-model:phone="createObj.phone" v-model:code="createObj.country_code" />

            <Button label="إنشاء الحساب" class="w-full mt-4" @click="submitForm" />
            <Button
              label="عودة لحساب الطالب"
              outlined
              class="w-full text-sm text-center mt-2"
              @click="parentAccount = false"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useImages from '@/helpers/images.helper'

const images = useImages()

const parentAccount = ref(false)
const step = ref(1)

const goalOptions = [
  { label: 'قدرات عامة', value: 'قدرات عامة' },
  { label: 'تحصيلي', value: 'تحصيلي' },
]

const createObj = ref({
  user_name: '',
  email: '',
  password: '',
  phone: '',
  country_code: '+966',
  gender: 'male',
  goal: '',
  exam_date: '',
})

const submitForm = () => {
  console.log('بيانات التسجيل:', createObj.value)
}
</script>
