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
    <div class="container mx-auto flex flex-col items-center justify-start mt-4">
      <div class="m-8 w-full max-w-xl">
        <!-- الشعار -->
        <div class="flex justify-end mb-8">
          <img :src="images.logo" alt="logo" class="h-12" />
        </div>

        <!-- النموذج -->
        <div class="border border-primary-200 rounded-2xl p-8 mt-32">
          <h2 class="text-xl font-bold mb-6 text-center">ادخل رمز التحقق المرسل إليك</h2>

          <div class="flex justify-center gap-4 mb-4" dir="ltr">
            <input
              v-for="(digit, index) in otp"
              :key="index"
              :ref="(el) => (otpInputs[index] = el)"
              v-model="otp[index]"
              type="text"
              inputmode="numeric"
              pattern="[0-9]*"
              maxlength="1"
              class="w-14 h-14 text-center text-2xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 hover:border-primary-300"
              :class="{
                'border-primary ring-1 ring-primary': otp[index],
                'animate-pulse border-red-300': showError && !otp[index],
              }"
              @input="handleInput($event, index)"
              @keydown="handleKeydown($event, index)"
              @paste="handlePaste($event, index)"
              @focus="handleFocus(index)"
              autocomplete="one-time-code"
            />
          </div>

          <!-- رسالة خطأ -->
          <div v-if="showError" class="text-center mb-4">
            <p class="text-sm text-red-500">{{ errorMessage }}</p>
          </div>

          <!-- عداد الوقت المتبقي -->
          <div v-if="countdown > 0" class="text-center mb-4">
            <p class="text-sm text-gray-500">
              يمكنك إعادة الإرسال خلال {{ formatTime(countdown) }}
            </p>
          </div>

          <Button
            label="تأكيد الرمز"
            class="w-full mt-4"
            :disabled="!isOtpComplete"
            @click="submitOtp"
          />

          <div class="text-center mt-4">
            <p class="text-sm text-gray-600">
              لم يصلك الرمز؟
              <span
                class="cursor-pointer underline transition-colors duration-200"
                :class="
                  countdown > 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-primary hover:text-primary-600'
                "
                @click="resendOtp"
              >
                إعادة الإرسال
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'
import useImages from '@/helpers/images.helper'
import { usePageImage } from '@/composables/usePageImage'
import { useOtpStore } from '@/stores/Auth/otp.store'
import { useRouter } from 'vue-router'
import { useResetPasswordStore } from '@/stores/Auth/resetPassword.store'

const resetPasswordStore = useResetPasswordStore()
const router = useRouter()
const otpStore = useOtpStore()
const images = useImages()
usePageImage(new URL('@/assets/images/auth/girlAuth.png', import.meta.url).href)

// State
const otp = ref(['', '', '', ''])
const otpInputs = ref([])
const isSubmitting = ref(false)
const showError = ref(false)
const errorMessage = ref('')
const countdown = ref(0)
let countdownInterval = null

// Computed
const isOtpComplete = computed(() => otp.value.every((digit) => digit !== ''))

// Methods
const focusInput = (index) => {
  nextTick(() => {
    if (otpInputs.value[index]) {
      otpInputs.value[index].focus()
    }
  })
}

const clearError = () => {
  showError.value = false
  errorMessage.value = ''
}

const showErrorMessage = (message) => {
  errorMessage.value = message
  showError.value = true
  setTimeout(clearError, 3000)
}

const handleInput = (event, index) => {
  clearError()
  let value = event.target.value

  // Only allow numbers
  value = value.replace(/[^0-9]/g, '')

  if (value.length > 1) {
    value = value.charAt(0)
  }

  otp.value[index] = value

  // Auto-focus next input if current is filled
  if (value && index < 3) {
    focusInput(index + 1)
  }
}

const handleKeydown = (event, index) => {
  // Handle backspace
  if (event.key === 'Backspace') {
    event.preventDefault()

    if (otp.value[index]) {
      // Clear current input
      otp.value[index] = ''
    } else if (index > 0) {
      // Move to previous input and clear it
      otp.value[index - 1] = ''
      focusInput(index - 1)
    }
  }

  // Handle arrow keys for Arabic (left/right should match visual order)
  else if (event.key === 'ArrowRight' && index > 0) {
    event.preventDefault()
    focusInput(index - 1)
  } else if (event.key === 'ArrowLeft' && index < 3) {
    event.preventDefault()
    focusInput(index + 1)
  }

  // Handle Enter
  else if (event.key === 'Enter') {
    event.preventDefault()
    if (isOtpComplete.value) {
      submitOtp()
    }
  }

  // Prevent non-numeric input
  else if (
    !/[0-9]/.test(event.key) &&
    !['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)
  ) {
    event.preventDefault()
  }
}

const handlePaste = (event, startIndex) => {
  event.preventDefault()
  clearError()

  const pastedData = event.clipboardData.getData('text')
  const numbers = pastedData.replace(/[^0-9]/g, '').split('')

  // Fill inputs starting from the current index
  for (let i = 0; i < Math.min(numbers.length, 4 - startIndex); i++) {
    if (startIndex + i < 4) {
      otp.value[startIndex + i] = numbers[i]
    }
  }

  // Focus the next empty input or the last input
  const nextEmptyIndex = otp.value.findIndex((digit) => digit === '')
  if (nextEmptyIndex !== -1) {
    focusInput(nextEmptyIndex)
  } else {
    focusInput(3)
  }
}

const handleFocus = (index) => {
  // Select all text when focusing (for better UX)
  nextTick(() => {
    if (otpInputs.value[index]) {
      otpInputs.value[index].select()
    }
  })
}

const submitOtp = async () => {
  if (!isOtpComplete.value || isSubmitting.value) return

  const code = otp.value.join('')

  if (code.length !== 4) {
    showErrorMessage('يرجى إدخال رمز التحقق كاملاً')
    return
  }

  try {
    isSubmitting.value = true
    clearError()

    console.log('OTP entered:', code)
    await otpStore.otp({
      otp: code,
      token: window.$cookies.get('reset-password-token'),
    })
    // Redirect to login page after successful verification
    router.push({ name: 'reset-password-verify' })
  } catch (error) {
    console.error('OTP verification failed:', error)
    showErrorMessage('رمز التحقق غير صحيح، يرجى المحاولة مرة أخرى')

    // Clear OTP and focus first input
    otp.value = ['', '', '', '']
    focusInput(0)
  } finally {
    isSubmitting.value = false
  }
}

const resendOtp = async () => {
  if (countdown.value > 0) return
  try {
    clearError()
    console.log('Resending OTP...')
    await otpStore.otp({
      token: window.$cookies.get('reset-password-token'),
    })
    // Start countdown (e.g., 60 seconds)
    startCountdown(60)
  } catch (error) {
    console.error('Failed to resend OTP:', error)
    showErrorMessage('فشل في إعادة إرسال رمز التحقق، يرجى المحاولة مرة أخرى')
  }
}

const startCountdown = (seconds) => {
  countdown.value = seconds
  countdownInterval = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(countdownInterval)
      countdownInterval = null
    }
  }, 1000)
}

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// Lifecycle
onMounted(() => {
  // Auto-focus first input
  focusInput(0)

  // Start initial countdown if needed
  // startCountdown(60)
})

onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval)
  }
})
</script>
