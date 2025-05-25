<template>
  <footer
    class="relative overflow-hidden bg-primary-50 dark:bg-primary-950 border-t border-primary-200 dark:border-primary-800 p-6 lg:p-8 shadow-lg transition-colors duration-300"
    role="contentinfo"
    aria-label="معلومات القاعدة"
    itemscope
    itemtype="http://schema.org/WPFooter"
  >
    <!-- Background Image with Lazy Loading -->
    <img
      v-if="images.homeHeroBg"
      :src="images.homeHeroBg"
      class="absolute inset-0 w-full h-full object-cover opacity-10 dark:opacity-10 z-0 transform transition-transform duration-1000 will-change-transform"
      :class="{ 'scale-110': isParallax }"
      alt="خلفية القسم الرئيسي"
      loading="lazy"
      decoding="async"
      @error="handleImageError('footer')"
    />

    <!-- Content Container -->
    <div
      class="container mx-auto relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12"
    >
      <!-- Logo and Description -->
      <div class="flex flex-col items-start animate-slide-up" style="--delay: 0.1s">
        <div class="flex items-center mb-4">
          <div class="relative p-1 rounded-full bg-gradient-to-r from-success-400 to-primary-400">
            <img
              :src="images.logo"
              alt="شعار منصة ESY"
              class="h-12 w-12 object-contain transition-transform duration-300 hover:scale-110"
              loading="lazy"
              decoding="async"
              @error="handleImageError('logo')"
            />
            <div
              class="absolute inset-0 bg-neutrals-white dark:bg-neutrals-950 opacity-20 rounded-full shine-effect"
            ></div>
          </div>
          <span
            class="text-2xl font-bold text-primary-800 dark:text-primary-100 ms-2"
            itemprop="name"
          >
            ESY
          </span>
        </div>
        <p
          class="text-secondary-700 dark:text-secondary-200 text-base leading-relaxed"
          itemprop="description"
        >
          ربط العالم بموارد تعليمية عالية الجودة لتحقيق مستقبل أفضل.
        </p>
        <!-- Newsletter Signup -->
        <form
          @submit.prevent="handleNewsletterSignup"
          class="mt-4 w-full"
          aria-label="الاشتراك في النشرة الإخبارية"
        >
          <div class="flex flex-col sm:flex-row gap-2">
            <div class="relative flex-1">
              <input
                type="email"
                v-model="email"
                placeholder="ادخل بريدك الإلكتروني"
                class="w-full p-2 rounded-lg border border-primary-300 dark:border-primary-700 bg-transparent text-secondary-700 dark:text-secondary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                :class="{ 'border-red-500': emailError }"
                aria-label="البريد الإلكتروني للنشرة الإخبارية"
                required
                aria-describedby="email-error"
              />
              <span
                v-if="emailError"
                id="email-error"
                class="absolute -bottom-6 text-red-500 text-xs"
                >{{ emailError }}</span
              >
            </div>
            <button
              type="submit"
              class="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="اشترك الآن"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? 'جاري الاشتراك...' : 'اشترك' }}
            </button>
          </div>
        </form>
      </div>

      <!-- About Us -->
      <nav
        class="animate-slide-up"
        style="--delay: 0.2s"
        aria-label="روابط معلومات عنا"
        role="navigation"
      >
        <h2
          class="mb-4 text-sm font-semibold text-primary-900 dark:text-primary-100 uppercase tracking-wider"
        >
          عنا
        </h2>
        <ul class="space-y-2">
          <li v-for="(item, index) in websiteSections.about" :key="index">
            <RouterLink
              :to="item.route"
              class="text-secondary-700 dark:text-secondary-200 hover:text-primary-500 transition-all duration-300"
              :aria-label="`انتقل إلى ${item.title}`"
            >
              {{ item.title }}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <!-- Services -->
      <nav
        class="animate-slide-up"
        style="--delay: 0.3s"
        aria-label="روابط الخدمات"
        role="navigation"
      >
        <h2
          class="mb-4 text-sm font-semibold text-primary-900 dark:text-primary-100 uppercase tracking-wider"
        >
          خدماتنا
        </h2>
        <ul class="space-y-2">
          <li v-for="(item, index) in websiteSections.services" :key="index">
            <a
              :href="`/services#${item.toLowerCase()}`"
              class="text-secondary-700 dark:text-secondary-200 hover:text-primary-500 transition-all duration-300 transform hover:scale-105 inline-block focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg px-2 py-1"
              :aria-label="`خدمة ${item}`"
            >
              {{ item }}
            </a>
          </li>
        </ul>
      </nav>

      <!-- Contact Info -->
      <div class="animate-slide-up" style="--delay: 0.4s">
        <h2
          class="mb-4 text-sm font-semibold text-primary-900 dark:text-primary-100 uppercase tracking-wider"
        >
          تواصلوا معنا
        </h2>
        <ul class="space-y-2" itemscope itemtype="http://schema.org/ContactPoint">
          <li>
            <a
              href="mailto:support@esy.com"
              class="text-secondary-700 dark:text-secondary-200 hover:text-primary-500 transition-all duration-300 inline-flex items-center gap-2"
              aria-label="راسلنا عبر البريد الإلكتروني"
              itemprop="email"
            >
              <i class="pi pi-envelope"></i>
              support@esy.com
            </a>
          </li>
          <li>
            <a
              href="tel:+1234567890"
              class="text-secondary-700 dark:text-secondary-200 hover:text-primary-500 transition-all duration-300 inline-flex items-center gap-2"
              aria-label="اتصل بنا"
              itemprop="telephone"
            >
              <i class="pi pi-phone"></i>
              +123-456-7890
            </a>
          </li>
          <li>
            <span
              class="text-secondary-700 dark:text-secondary-200 inline-flex items-center gap-2"
              aria-label="عنوان المكتب"
              itemprop="address"
            >
              <i class="pi pi-map-marker"></i>
              123 شارع التعليم، المدينة
            </span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Separator and Bottom Section -->
    <hr class="my-6 border-primary-200 dark:border-primary-800 transition-colors duration-300" />
    <div
      class="container mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center gap-4 animate-slide-up"
      style="--delay: 0.5s"
    >
      <div class="flex flex-col items-center md:items-start text-center md:text-right">
        <span class="text-secondary-700 dark:text-secondary-200 text-sm" itemprop="copyrightNotice">
          © {{ currentYear }} منصة التعليم. جميع الحقوق محفوظة.
        </span>
        <div class="flex gap-4 mt-2">
          <a
            href="/privacy"
            class="text-secondary-700 dark:text-secondary-200 hover:text-primary-500 text-sm transition-colors duration-300"
            aria-label="سياسة الخصوصية"
          >
            سياسة الخصوصية
          </a>
          <a
            href="/terms"
            class="text-secondary-700 dark:text-secondary-200 hover:text-primary-500 text-sm transition-colors duration-300"
            aria-label="شروط الاستخدام"
          >
            شروط الاستخدام
          </a>
        </div>
      </div>
      <div class="flex space-x-4">
        <a
          v-for="(icon, index) in socialIcons"
          :key="index"
          :href="icon.href"
          class="text-secondary-500 hover:text-primary-600 transition-all duration-300 transform hover:scale-110"
          :aria-label="`تابعنا على ${icon.label}`"
          :class="[icon.class]"
          target="_blank"
          rel="noopener noreferrer"
          itemprop="sameAs"
        >
          <span class="sr-only">{{ icon.label }}</span>
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import useImages from '@/helpers/images.helper'

const images = useImages()
const email = ref('')
const emailError = ref('')
const isSubmitting = ref(false)
const isParallax = ref(false)

// Dynamic year for copyright
const currentYear = computed(() => new Date().getFullYear())

const websiteSections = {
  about: [
    { title: 'من نحن', route: '/about' },
    { title: 'تواصل معنا', route: '/contact' },
  ],
  services: ['دوراتنا', 'الدعم الفني', 'مركز المساعدة', 'المجتمع'],
}

const socialIcons = [
  { href: 'https://facebook.com/esy', label: 'فيسبوك', class: 'pi pi-facebook' },
  { href: 'https://twitter.com/esy', label: 'تويتر', class: 'pi pi-twitter' },
  { href: 'https://github.com/esy', label: 'جيت هب', class: 'pi pi-github' },
  { href: 'https://linkedin.com/company/esy', label: 'لينكدإن', class: 'pi pi-linkedin' },
]

// Parallax effect
const handleScroll = () => {
  isParallax.value = window.scrollY > 100
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// Email validation
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

// Newsletter signup handler
const handleNewsletterSignup = async () => {
  if (!email.value) {
    emailError.value = 'البريد الإلكتروني مطلوب'
    return
  }

  if (!validateEmail(email.value)) {
    emailError.value = 'الرجاء إدخال بريد إلكتروني صحيح'
    return
  }

  isSubmitting.value = true
  emailError.value = ''

  try {
    // Simulated API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log('Subscribing:', email.value)
    email.value = ''
    // Add toast notification here
  } catch (error) {
    console.error('Subscription failed:', error)
    emailError.value = 'فشل الاشتراك، حاول مرة أخرى'
  } finally {
    isSubmitting.value = false
  }
}

// Image error handler
const handleImageError = (type) => {
  console.error(`Failed to load ${type} image`)
}
</script>

<style scoped>
.rtl {
  direction: rtl;
  text-align: right;
  font-family: var(--font-family-sans);
}

/* Slide-up animation with stagger */
.animate-slide-up {
  animation: slideUp 0.6s ease-out forwards;
  animation-delay: var(--delay);
}

@keyframes slideUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Enhanced Shine effect for logo */
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

/* Input focus states */
input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(var(--primary-500-rgb), 0.3);
}

/* Hover effects for links */
a {
  position: relative;
}

a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -2px;
  right: 0;
  background-color: var(--primary-500);
  transition: width 0.3s ease-in-out;
}

a:hover::after {
  width: 100%;
  left: 0;
}

/* Performance optimizations */
img {
  will-change: transform, opacity;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .container {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

@media (max-width: 768px) {
  .grid-cols-2 {
    grid-template-columns: 1fr;
  }
  .text-2xl {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }
  .text-sm {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
}

@media (max-width: 640px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .flex-row {
    flex-direction: column;
  }
}
</style>
