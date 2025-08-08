<template>
  <div
    class="relative bg-gradient-to-br from-primary-50 to-secondary-100 dark:from-primary-950 dark:to-secondary-900 overflow-hidden"
    role="banner"
    aria-label="القسم الرئيسي"
  >
    <!-- Background Image -->
    <img
      :src="images.homeHeroBg"
      class="absolute inset-0 w-full h-full object-cover opacity-10 dark:opacity-5 z-0 transform transition-transform duration-1000"
      :class="{ 'scale-110': isParallax }"
      alt="خلفية القسم الرئيسي"
      loading="lazy"
      @error="handleImageError('homeHeroBg')"
    />

    <!-- Hero Content -->
    <div
      class="relative flex flex-col lg:flex-row items-center justify-center min-h-[80vh] px-4 lg:px-8 z-10"
    >
      <!-- Text Content -->
      <div
        class="flex-1 text-center lg:text-right py-12 lg:py-16 xl:py-20 max-w-3xl animate-fade-in"
        style="animation-delay: 200ms"
      >
        <h1
          class="text-4xl sm:text-5xl xl:text-6xl font-bold text-primary-800 dark:text-primary-100 mb-6 leading-tight"
        >
          <span
            class="block bg-gradient-to-r from-primary-500 to-success-500 bg-clip-text text-transparent"
          >
            هيا بنا نبني مستقبلك التعليمي
          </span>
        </h1>
        <p
          class="text-lg sm:text-xl text-secondary-700 dark:text-secondary-200 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
        >
          انضم إلينا لتطوير مهاراتك الأكاديمية وتحقيق أهدافك مع منصتنا التعليمية المتطورة.
        </p>
        <div class="flex items-center justify-start gap-4">
          <Button
            label="إنطلق الآن"
            type="button"
            class="bg-primary-500 hover:bg-primary-600 dark:bg-primary-400 dark:hover:bg-primary-500 text-neutrals-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500"
            @click="startNow"
            aria-label="ابدأ رحلتك التعليمية الآن"
          />
          <Button
            label="تعرف على المزيد"
            type="button"
            outlined
            class="border-primary-500 text-primary-500 hover:bg-primary-50 dark:border-primary-300 dark:text-primary-300 dark:hover:bg-primary-900 font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500"
            @click="learnMore"
            aria-label="تعرف على المزيد عن منصتنا"
          />
        </div>
      </div>

      <!-- Hero Image -->
      <div
        class="flex-1 relative flex items-center justify-center lg:justify-end py-8 lg:py-0 animate-fade-in"
        style="animation-delay: 400ms"
      >
        <div
          class="relative p-2 rounded-3xl bg-gradient-to-r from-success-400 via-warning-400 to-primary-400 shadow-xl"
        >
          <div
            class="bg-neutrals-white dark:bg-secondary-900 p-4 rounded-2xl overflow-hidden relative"
          >
            <div
              class="absolute inset-0 bg-neutrals-white dark:bg-neutrals-950 opacity-20 shine-effect"
            ></div>
            <img
              :src="images.heroImage"
              alt="شخصية تعليمية"
              class="w-full max-w-md object-contain"
              loading="lazy"
              @error="handleImageError('heroImage')"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Hot Deals Banner -->
    <div
      v-if="showBanner"
      class="relative bg-primary-400 dark:bg-primary-900 text-neutrals-white py-4 px-6 lg:px-20 flex flex-col sm:flex-row justify-between items-center gap-4 -mt-4 shadow-lg transition-all duration-500"
      :class="{ 'translate-y-full opacity-0': !showBanner }"
      role="alert"
      aria-live="polite"
    >
      <div class="font-bold text-lg flex items-center gap-2">
        <i class="pi pi-fire text-warning-500"></i>
        عروض حصرية!
      </div>
      <div class="inline-flex gap-4 items-center">
        <span class="text-sm sm:text-base leading-normal">
          استفد من خصومات تصل إلى 50% على اشتراكاتنا التعليمية الآن!
        </span>
        <a
          class="text-neutrals-white underline font-semibold hover:text-primary-200 transition-colors duration-200"
          href="#"
          @click.prevent="learnMore"
          aria-label="تعرف على المزيد عن العروض"
        >
          اكتشف العروض
        </a>
      </div>
      <Button
        icon="pi pi-times"
        text
        rounded
        class="!text-neutrals-white hover:!bg-neutrals-500/20"
        @click="dismissBanner"
        aria-label="إغلاق إعلان العروض"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useImages from '@/helpers/images.helper'

const images = useImages()

const showBanner = ref(true)
const isParallax = ref(false)

// Parallax effect on scroll
const handleScroll = () => {
  const scrollPosition = window.scrollY
  isParallax.value = scrollPosition > 50
}

// Placeholder actions
const startNow = () => {
  console.log('Start Now button clicked')
  // Add logic for navigation or modal
}

const learnMore = () => {
  console.log('Learn More clicked')
  // Add logic for navigation or modal
}

const dismissBanner = () => {
  showBanner.value = false
}

// Image error handling
const handleImageError = (key) => {
  images.value[key] = `https://fakeimg.pl/${
    key === 'homeHeroBg' ? '1920x1080' : '400x400'
  }/cccccc/ffffff?text=بديل&font=noto`
}

// Initialize scroll listener
import { onMounted, onUnmounted } from 'vue'
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
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

/* Shine effect */
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
  .text-4xl {
    font-size: var(--font-size-3xl);
    line-height: var(--line-height-3xl);
  }
  .text-lg {
    font-size: var(--font-size-base);
    line-height: var(--line-height-base);
  }
  .max-w-3xl {
    max-width: 90%;
  }
}
</style>
