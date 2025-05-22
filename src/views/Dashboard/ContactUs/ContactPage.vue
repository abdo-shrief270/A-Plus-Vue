<template>
  <section
    class="bg-gradient-to-r from-primary-50 to-secondary-100 dark:from-primary-950 dark:to-secondary-900 min-h-screen flex items-center justify-center py-12 px-4 animate-fade-in"
    role="region"
    aria-label="تواصل معنا"
  >
    <div class="container mx-auto max-w-4xl">
      <!-- Decorative Banner -->
      <div class="flex justify-center mb-8">
        <div
          class="relative p-2 rounded-xl bg-gradient-to-r from-success-400 to-primary-400 shadow-xl"
        >
          <img
            :src="bannerImage"
            alt="تواصل معنا"
            class="h-40 w-full object-cover rounded-lg"
            loading="lazy"
            @error="handleImageError"
          />
          <div
            class="absolute inset-0 bg-neutrals-white dark:bg-neutrals-950 opacity-20 rounded-lg shine-effect"
          ></div>
        </div>
      </div>

      <!-- Contact Form -->
      <div class="bg-neutrals-white dark:bg-secondary-900 p-8 rounded-xl shadow-lg">
        <h1 class="text-3xl font-bold text-primary-800 dark:text-primary-100 mb-6 text-center">
          تواصل معنا
        </h1>
        <form @submit.prevent="submitForm" class="space-y-6" role="form" aria-label="نموذج التواصل">
          <div>
            <label
              for="name"
              class="block text-sm font-semibold text-secondary-700 dark:text-secondary-200 mb-2"
            >
              الاسم
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              class="w-full p-3 rounded-lg border border-primary-200 dark:border-primary-800 bg-neutrals-white dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300"
              placeholder="أدخل اسمك"
              required
              aria-required="true"
            />
          </div>
          <div>
            <label
              for="email"
              class="block text-sm font-semibold text-secondary-700 dark:text-secondary-200 mb-2"
            >
              البريد الإلكتروني
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              class="w-full p-3 rounded-lg border border-primary-200 dark:border-primary-800 bg-neutrals-white dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300"
              placeholder="أدخل بريدك الإلكتروني"
              required
              aria-required="true"
            />
          </div>
          <div>
            <label
              for="message"
              class="block text-sm font-semibold text-secondary-700 dark:text-secondary-200 mb-2"
            >
              الرسالة
            </label>
            <textarea
              id="message"
              v-model="form.description"
              rows="5"
              class="w-full p-3 rounded-lg border border-primary-200 dark:border-primary-800 bg-neutrals-white dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300 resize-none"
              placeholder="اكتب رسالتك هنا"
              required
              aria-required="true"
            ></textarea>
          </div>
          <button
            type="submit"
            class="w-full bg-gradient-to-r from-primary-500 to-success-500 hover:from-primary-600 hover:to-success-600 text-neutrals-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500"
            :disabled="isSubmitting"
            aria-label="إرسال الرسالة"
          >
            {{ isSubmitting ? 'جاري الإرسال...' : 'إرسال' }}
          </button>
        </form>
      </div>

      <!-- Contact Info and Social Media -->
      <div class="mt-8 text-center">
        <p class="text-secondary-700 dark:text-secondary-200 mb-4">أو تواصل معنا مباشرة عبر:</p>
        <p class="text-secondary-700 dark:text-secondary-200 mb-4">
          البريد الإلكتروني:
          <a
            href="mailto:support@platform.com"
            class="text-primary-500 hover:text-primary-600 transition-all duration-300"
            >support@platform.com</a
          >
        </p>
        <p class="text-secondary-700 dark:text-secondary-200 mb-6">
          الهاتف:
          <a
            href="tel:+966123456789"
            class="text-primary-500 hover:text-primary-600 transition-all duration-300"
            >+966 123 456 789</a
          >
        </p>
        <div class="flex justify-center space-x-4">
          <a
            v-for="(icon, index) in socialIcons"
            :key="index"
            :href="icon.href"
            class="text-secondary-500 hover:text-primary-600 transition-all duration-300 animate-pulse"
            :aria-label="`تابعنا على ${icon.label}`"
            :class="[icon.class]"
          >
            <span class="sr-only">{{ icon.label }}</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useContactUsStore } from '@/stores/Contact/contact.store'

const contactService = useContactUsStore()

const bannerImage = ref('https://fakeimg.pl/800x200/4ecf6a/ffffff?text=تواصل+معنا&font=noto')
const form = ref({
  name: '',
  email: '',
  description: '',
})
const isSubmitting = ref(false)

const socialIcons = [
  { href: '#', label: 'فيسبوك', class: 'pi pi-facebook' },
  { href: '#', label: 'تويتر', class: 'pi pi-twitter' },
  { href: '#', label: 'جيت هب', class: 'pi pi-github' },
  { href: '#', label: 'لينكدإن', class: 'pi pi-linkedin' },
]

const handleImageError = () => {
  bannerImage.value = 'https://fakeimg.pl/800x200/cccccc/ffffff?text=بديل&font=noto'
}

const submitForm = async () => {
  isSubmitting.value = true
  try {
    // Simulate form submission (replace with actual API call)
    await contactService.create(form.value)
    form.value = { name: '', email: '', description: '' } // Reset form
  } catch (error) {
    console.error('Form submission error:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.rtl {
  direction: rtl;
  text-align: right;
  font-family: var(--font-family-sans);
}

/* Fade-in animation */
.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Pulse animation for social icons */
.animate-pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

/* Shine effect for banner */
.shine-effect {
  animation: shine 4s infinite linear;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.7) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  background-size: 200% 100%;
}

@keyframes shine {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .text-3xl {
    font-size: var(--font-size-2xl);
    line-height: var(--line-height-2xl);
  }
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .h-40 {
    height: 120px;
  }
}
</style>
