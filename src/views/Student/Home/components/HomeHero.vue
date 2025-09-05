<template>
  <div
    class="relative bg-gradient-to-br from-neutrals-50 to-primary-50 dark:from-neutrals-900 dark:to-primary-950 py-16 lg:py-24 overflow-hidden"
    role="section"
    aria-label="قسم رحلة التفوق"
  >
    <!-- Background Decorative Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <!-- Dotted patterns -->
      <div class="absolute top-10 left-10 w-20 h-20 opacity-30">
        <svg viewBox="0 0 100 100" class="w-full h-full text-primary-300 dark:text-primary-700">
          <defs>
            <pattern id="dots1" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="2" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#dots1)" />
        </svg>
      </div>

      <div class="absolute bottom-20 right-10 w-16 h-16 opacity-20">
        <svg viewBox="0 0 100 100" class="w-full h-full">
          <defs>
            <pattern id="dots2" x="0" y="0" width="15" height="15" patternUnits="userSpaceOnUse">
              <circle cx="7.5" cy="7.5" r="1.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#dots2)" />
        </svg>
      </div>
    </div>

    <!-- Main Content Container -->
    <div class="relative container mx-auto px-4 lg:px-8 z-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-16">
        <!-- Text Content -->
        <div class="animate-fade-in">
          <h2
            class="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-800 dark:text-primary-100 mb-6 leading-tight"
          >
            انطلاقتك نحو التفوق تبدأ من هنا..
            <span
              class="block text-2xl sm:text-3xl lg:text-4xl text-success-600 dark:text-success-400 mt-2"
            >
              يلا نبدأ؟
            </span>
          </h2>

          <p class="text-lg sm:text-xl mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            كل حاجة محتاجها عشان تحليك واثق وتحقق أعلى نتيجة، مذاكرة أسهل، نتائج أفضل، وثقة أكبر في
            اختبار القدرات.
          </p>

          <div class="flex justify-center lg:justify-start">
            <Button
              label="ابدأ رحلتك الآن"
              type="button"
              @click="startJourney"
              aria-label="ابدأ رحلتك التعليمية نحو التفوق"
            />
          </div>
        </div>

        <!-- Student Image with Decorative Elements -->
        <div
          class="flex items-center justify-center lg:justify-end animate-dash animate-fade-in relative"
        >
          <img :src="images.HomeHero" alt="" class="float-animation" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import useImages from '@/helpers/images.helper'

const images = useImages()

// Set default student image
images.value.studentImage =
  images.value.studentImage || 'https://fakeimg.pl/400x400/cccccc/ffffff?text=طالب&font=noto'

// Placeholder action
const startJourney = () => {
  console.log('Start Journey button clicked')
  // Add logic for navigation or modal
}
</script>

<style scoped>
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-30px);
  }
}

.float-animation {
  animation: float 4s ease-in-out infinite;
}

@keyframes dash {
  to {
    stroke-dashoffset: -10;
  }
}

/* RTL support */
.rtl {
  direction: rtl;
  text-align: right;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .w-80 {
    width: 16rem;
  }
  .h-80 {
    height: 16rem;
  }
  .text-3xl {
    font-size: var(--font-size-2xl);
    line-height: var(--line-height-2xl);
  }
  .text-lg {
    font-size: var(--font-size-base);
    line-height: var(--line-height-base);
  }
}

/* Enhanced button hover effects */
.btn-enhanced:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}
</style>
