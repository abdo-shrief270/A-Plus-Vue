<template>
  <div class="grid grid-cols-1 md:grid-cols-2 min-h-screen">
    <!-- الصورة -->
    <div
      class="hidden px-12 md:flex relative items-start justify-center bg-primary-100 overflow-hidden"
    >
      <img
        src="../../assets/images/auth/authBg.png"
        class="absolute w-full h-full object-cover"
        alt="background"
      />

      <div class="z-[100] mt-4 w-full flex flex-col items-start justify-start">
        <div>
          <a-button
            label="عودة"
            severity="link"
            variant="text"
            icon="pi pi-arrow-right"
            iconPos="right"
            class="text-white"
            @click="$router.push('/')"
          />
        </div>
        <div class="self-center text-center mt-4">
          <h1 class="text-4xl font-bold text-white">{{ welcomeMessage }}</h1>
          <p class="text-white text-xl my-4">{{ welcomeSubtext }}</p>
        </div>
      </div>

      <img
        :src="parentAccount ? images.parentAuth : images.girlAuth"
        class="absolute z-10 bottom-0 w-[70%] max-h-[75%] object-contain"
        :alt="parentAccount ? 'Parent illustration' : 'Student illustration'"
      />
    </div>

    <!-- الفورم -->
    <div class="container mx-auto flex flex-col items-center justify-start mt-4">
      <div class="m-8 w-full max-w-xl">
        <!-- الشعار -->
        <div class="flex justify-end mb-8">
          <img :src="images.logo" alt="logo" class="h-12" />
        </div>

        <!-- Student Registration -->
        <div>
          <!-- الخطوة الأولى -->
          <div v-if="step === 1" class="border border-primary-200 rounded-2xl p-8">
            <h2 class="text-xl font-bold mb-6 text-center">هلا والله فيك</h2>
            <p class="text-center text-gray-600 mb-6">افتح حسابك الحين وابدأ رحلتك الدراسية!</p>

            <form class="space-y-4" @submit.prevent="stepNext">
              <a-input
                v-model="createObj.name"
                type="text"
                label="اسم المستخدم"
                @input="checkUserNameValidation()"
                placeholder="ادخل اسمك"
                :error="v$.name.$error || (!userNameValidation && createObj.name)"
                :errorMessage="
                  !userNameValidation && createObj.name
                    ? 'اسم المستخدم غير صحيح'
                    : 'اسم المستخدم مطلوب'
                "
                @blur="v$.name.$touch"
              />

              <a-input
                v-model="createObj.email"
                type="email"
                label="البريد الالكتروني"
                placeholder="ادخل بريدك الالكتروني"
                :error="v$.email.$error"
                :errorMessage="getEmailError()"
                @blur="v$.email.$touch"
              />

              <a-password
                v-model="createObj.password"
                label="كلمة المرور"
                placeholder="ادخل كلمة المرور"
                :error="v$.password.$error"
                :errorMessage="getPasswordError()"
                @blur="v$.password.$touch"
              />

              <a-password
                v-model="createObj.password_confirmation"
                label="تاكيد كلمة المرور"
                placeholder="تاكيد كلمة المرور"
                :error="v$.password_confirmation.$error"
                :errorMessage="getPasswordConfirmationError()"
                @blur="v$.password_confirmation.$touch"
              />

              <a-phone
                v-model="createObj.phone"
                v-model:code="createObj.country_code"
                :error="v$.phone.$error"
                :errorMessage="v$.phone.required.$invalid && 'رقم الهاتف مطلوب'"
                @blur="v$.phone.$touch"
              />

              <div>
                <label class="block font-medium mb-1">الجنس</label>
                <div class="flex gap-4">
                  <Button
                    type="button"
                    :outlined="createObj.gender !== 'male'"
                    :severity="createObj.gender === 'male' ? 'primary' : 'secondary'"
                    class="w-full"
                    @click="createObj.gender = 'male'"
                  >
                    ذكر
                  </Button>
                  <Button
                    type="button"
                    :outlined="createObj.gender !== 'female'"
                    :severity="createObj.gender === 'female' ? 'primary' : 'secondary'"
                    class="w-full"
                    @click="createObj.gender = 'female'"
                  >
                    أنثى
                  </Button>
                </div>
              </div>

              <Button
                label="التالي"
                class="w-full mt-4"
                type="submit"
                :disabled="v$.$invalid || checkUserNameStore.errors"
              />

              <Button
                :label="!parentAccount ? 'انشاء حساب لولي الامر' : 'انشاء حساب للطالب'"
                outlined
                class="w-full text-sm text-center mt-2"
                type="button"
                @click="switchAccountType()"
              />
            </form>
          </div>

          <!-- الخطوة الثانية -->
          <div v-else class="border border-primary-200 rounded-2xl p-8">
            <h2 class="text-xl font-bold mb-6 text-center">حدد هدفك وموعد امتحانك بسهولة</h2>

            <form class="space-y-4" @submit.prevent="submitForm">
              <a-select
                v-model="createObj.exam_id"
                :options="exam_idOptions"
                label="حدد هدفك"
                placeholder="مثال: قدرات عامة"
                :error="v$.exam_id?.$error"
                :errorMessage="v$.exam_id?.required?.$invalid && 'يرجى اختيار هدفك'"
                @blur="v$.exam_id?.$touch"
              />

              <div>
                <label class="block font-medium mb-1">تاريخ الامتحان</label>
                <DatePicker
                  v-model="createObj.exam_date"
                  type="date"
                  placeholder="تاريخ الامتحان"
                  :minDate="minExamDate"
                  class="w-full"
                  :error="v$.exam_date?.$error"
                  :errorMessage="v$.exam_date?.required?.$invalid && 'تاريخ الامتحان مطلوب'"
                  @blur="v$.exam_date?.$touch"
                />
              </div>

              <div class="flex gap-4 mt-4">
                <Button label="رجوع" outlined class="w-full" type="button" @click="step--" />
                <Button label="إنشاء الحساب" class="w-full" type="submit" :disabled="v$.$invalid" />
              </div>
            </form>
          </div>
        </div>

        <!-- Sign In Link -->
        <div class="mt-6 text-center">
          <p class="text-gray-600">
            لديك حساب بالفعل؟
            <router-link to="/sign-in" class="text-primary font-medium hover:underline">
              تسجيل الدخول
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'
import { debounce } from 'vue-debounce'
import { useCheckUserNameStore } from '@/stores/Auth/checkUserName.store'
import { useAuthStore } from '@/stores/Auth/auth.store'
import { useGetAllExamsStore } from '@/stores/exams/getAllExams.store'
import useImages from '@/helpers/images.helper'

const checkUserNameStore = useCheckUserNameStore()
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const getAllExamsStore = useGetAllExamsStore()
const images = useImages()

const parentAccount = ref(false)
const step = ref(1)

const minExamDate = computed(() => {
  const today = new Date()
  today.setDate(today.getDate() + 7) // زود 7 أيام
  return today
})

const createObj = ref({
  name: null,
  email: null,
  password: null,
  password_confirmation: null,
  phone: null,
  country_code: '+966',
  exam_id: null,
  exam_date: null,
  type: 'student',
  gender: 'male',
})

// Validation rules
const rules = computed(() => {
  const base = {
    name: { required },
    email: { required, email },
    password: { required, minLength: minLength(8) },
    password_confirmation: {
      required,
      sameAs: sameAs(computed(() => createObj.value.password)),
    },
    phone: { required },
    country_code: { required },
  }

  if (!parentAccount.value && step.value === 2) {
    base.exam_id = { required }
    base.exam_date = { required }
  }

  return base
})

const v$ = useVuelidate(rules, createObj)

const exams = computed(() =>
  Array.isArray(getAllExamsStore.records) ? getAllExamsStore.records : [],
)

const exam_idOptions = computed(() =>
  exams.value.map((e) => ({
    name: e.name,
    value: e.id,
  })),
)

const welcomeMessage = computed(() =>
  parentAccount.value ? 'مرحباً بك ولي الأمر' : 'هلا والله فيك',
)

const welcomeSubtext = computed(() =>
  parentAccount.value
    ? 'أنشئ حساباً لمتابعة تقدم طفلك الدراسي'
    : 'افتح حسابك الحين وابداء رحلتك الدراسية!',
)

// Error message helpers
const getEmailError = () => {
  if (v$.value.email.required.$invalid) return 'البريد الإلكتروني مطلوب'
  if (v$.value.email.email.$invalid) return 'يرجى إدخال بريد إلكتروني صحيح'
  return ''
}

const getPasswordError = () => {
  if (v$.value.password.required.$invalid) return 'كلمة المرور مطلوبة'
  if (v$.value.password.minLength.$invalid) return 'كلمة المرور يجب أن تكون 8 أحرف على الأقل'
  return ''
}

const getPasswordConfirmationError = () => {
  if (v$.value.password_confirmation.required.$invalid) return 'تأكيد كلمة المرور مطلوب'
  if (v$.value.password_confirmation.sameAs.$invalid) return 'كلمة المرور غير متطابقة'
  return ''
}

const switchAccountType = () => {
  parentAccount.value = !parentAccount.value
  if (parentAccount.value) {
    router.replace({ query: { ...route.query, type: 'parent' } })
  } else {
    router.replace({ query: { ...route.query, type: 'student' } })
  }
  step.value = 1
  createObj.value = {
    name: null,
    email: null,
    password: null,
    password_confirmation: null,
    phone: null,
    country_code: '+966',
    exam_id: null,
    exam_date: null,
    type: parentAccount.value ? 'parent' : 'student',
    gender: 'male',
  }
  v$.value.$reset()
}

const userNameValidation = ref(false)
const stepNext = () => {
  v$.value.name.$touch()
  v$.value.email.$touch()
  v$.value.password.$touch()
  v$.value.password_confirmation.$touch()
  v$.value.phone.$touch()
  v$.value.country_code.$touch()

  if (
    !v$.value.name.$error &&
    !v$.value.email.$error &&
    !v$.value.password.$error &&
    !v$.value.password_confirmation.$error &&
    !v$.value.phone.$error &&
    !v$.value.country_code.$error
  ) {
    step.value = 2
  }
}

const checkUserNameValidation = debounce(async () => {
  await checkUserNameStore.checkUserName({
    user_name: createObj.value.name,
  })
  if (checkUserNameStore.errors) {
    userNameValidation.value = false
    v$.value.name.$touch()
  } else {
    userNameValidation.value = true
  }
}, 500)

const submitForm = async () => {
  v$.value.$touch()
  if (v$.value.$invalid) return

  const submitData = {
    ...createObj.value,
    user_name: createObj.value.name,
    exam_id:
      typeof createObj.value.exam_id === 'object'
        ? createObj.value.exam_id.value
        : createObj.value.exam_id,
  }

  console.log('Submitting:', submitData)
  await authStore.register(submitData)
}

// React to route
watch(
  () => route.query.type,
  (type) => {
    type === 'parent' ? (parentAccount.value = true) : (parentAccount.value = false)

    parentAccount.value
      ? router.replace({ query: { ...route.query, type: 'parent' } })
      : router.replace({ query: { ...route.query, type: 'student' } })
    v$.value.$reset()
  },
  { immediate: true },
)

onMounted(() => {
  if (!route.query.type) {
    router.replace({ query: { ...route.query, type: 'student' } })
  }
  getAllExamsStore.getAllExams()
})
</script>
