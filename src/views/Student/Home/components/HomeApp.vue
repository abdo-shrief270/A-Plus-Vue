<template>
  <div
    class="relative bg-gradient-to-br from-neutrals-50 to-secondary-50 dark:from-neutrals-900 dark:to-secondary-950 py-16 lg:py-24 overflow-hidden"
    role="section"
    aria-label="ليه تنضم معانا"
  >
    <!-- Background decorative elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <!-- Dotted pattern -->
      <div class="absolute top-20 right-20 w-24 h-24 opacity-20">
        <svg viewBox="0 0 100 100" class="w-full h-full text-primary-300 dark:text-primary-700">
          <defs>
            <pattern id="dots-bg" x="0" y="0" width="15" height="15" patternUnits="userSpaceOnUse">
              <circle cx="7.5" cy="7.5" r="1.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#dots-bg)" />
        </svg>
      </div>
    </div>

    <!-- Main Content Container -->
    <div class="relative container mx-auto px-4 lg:px-8 z-10">
      <div class="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        <!-- Features Content -->
        <div class="flex-1 order-2 lg:order-1 space-y-8 max-w-4xl">
          <!-- Section Title -->
          <div class="text-center lg:text-right animate-fade-in">
            <h2
              class="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-800 dark:text-primary-100 mb-4 leading-tight"
            >
              ليه تنضم معانا؟
            </h2>
            <p
              class="text-lg sm:text-xl text-secondary-700 dark:text-secondary-200 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              يقدملك تجربة تعليمية متكاملة تساعدك تذاكر، تتدرب، وتحقق أفضل نتيجة
            </p>
          </div>

          <!-- Features List -->
          <div class="space-y-6">
            <!-- Feature 1: Clear Study Plan -->
            <div
              class="relative overflow-hidden animate-slide-right"
              style="animation-delay: 200ms"
              role="article"
              aria-labelledby="feature-1-title"
            >
              <!-- Main curved container -->
              <div
                class="relative bg-gradient-to-r from-teal-100 via-teal-50 to-cyan-50 dark:from-teal-900 dark:via-teal-950 dark:to-cyan-950 shadow-lg border border-teal-200 dark:border-teal-700"
                style="border-radius: 60px"
              >
                <!-- Left decorative curved section -->
                <div
                  class="absolute left-0 top-0 h-full w-20 bg-gradient-to-br from-teal-200 to-teal-300 dark:from-teal-700 dark:to-teal-800 opacity-60"
                  style="border-radius: 60px 0 0 60px; clip-path: circle(70% at 0% 50%)"
                ></div>

                <!-- Content container -->
                <div class="relative flex items-center justify-between py-6 px-8 lg:py-8 lg:px-12">
                  <!-- Text content -->
                  <div class="flex-grow text-right pr-6">
                    <h3
                      id="feature-1-title"
                      class="text-xl lg:text-2xl font-bold text-teal-800 dark:text-teal-100 mb-3"
                    >
                      ذاكر بخطة واضحة وبدون توتر
                    </h3>
                    <p
                      class="text-teal-700 dark:text-teal-200 leading-relaxed text-sm lg:text-base"
                    >
                      يقدملك خطة تعليمية واضحة ومصممة مخصوص على حسب مستواك، عشان تذاكر بشكل منظم
                      وتكون مستعد كويس للامتحانات من غير توتر.
                    </p>
                  </div>

                  <!-- Icon -->
                  <div class="flex-shrink-0">
                    <div
                      class="w-12 h-12 lg:w-14 lg:h-14 bg-teal-500 dark:bg-teal-400 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <i class="pi pi-map text-white text-lg lg:text-xl"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Feature 2: Comprehensive Question Bank -->
            <div
              class="relative overflow-hidden animate-slide-right"
              style="animation-delay: 400ms"
              role="article"
              aria-labelledby="feature-2-title"
            >
              <!-- Main curved container -->
              <div
                class="relative bg-gradient-to-l from-teal-100 via-teal-50 to-cyan-50 dark:from-teal-900 dark:via-teal-950 dark:to-cyan-950 shadow-lg border border-teal-200 dark:border-teal-700"
                style="border-radius: 60px"
              >
                <!-- Right decorative curved section -->
                <div
                  class="absolute right-0 top-0 h-full w-20 bg-gradient-to-bl from-teal-200 to-teal-300 dark:from-teal-700 dark:to-teal-800 opacity-60"
                  style="border-radius: 0 60px 60px 0; clip-path: circle(70% at 100% 50%)"
                ></div>

                <!-- Content container -->
                <div class="relative flex items-center justify-between py-6 px-8 lg:py-8 lg:px-12">
                  <!-- Icon -->
                  <div class="flex-shrink-0">
                    <div
                      class="w-12 h-12 lg:w-14 lg:h-14 bg-teal-500 dark:bg-teal-400 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <i class="pi pi-database text-white text-lg lg:text-xl"></i>
                    </div>
                  </div>

                  <!-- Text content -->
                  <div class="flex-grow text-right ps-6">
                    <h3
                      id="feature-2-title"
                      class="text-xl lg:text-2xl font-bold text-teal-800 dark:text-teal-100 mb-3"
                    >
                      بنك أسئلة شامل
                    </h3>
                    <p
                      class="text-teal-700 dark:text-teal-200 leading-relaxed text-sm lg:text-base"
                    >
                      يقدملك بنك أسئلة ضخم يغطي كل الدروس والوحدات، عشان تقدر تختبر نفسك وتتمرن كويس
                      قبل الامتحان وتعرف مستواك الحقيقي.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Feature 3: Personalized Courses -->
            <div
              class="relative overflow-hidden animate-slide-right"
              style="animation-delay: 600ms"
              role="article"
              aria-labelledby="feature-3-title"
            >
              <!-- Main curved container -->
              <div
                class="relative bg-gradient-to-r from-teal-100 via-teal-50 to-cyan-50 dark:from-teal-900 dark:via-teal-950 dark:to-cyan-950 shadow-lg border border-teal-200 dark:border-teal-700"
                style="border-radius: 60px"
              >
                <!-- Left decorative curved section -->
                <div
                  class="absolute left-0 top-0 h-full w-20 bg-gradient-to-br from-teal-200 to-teal-300 dark:from-teal-700 dark:to-teal-800 opacity-60"
                  style="border-radius: 60px 0 0 60px; clip-path: circle(70% at 0% 50%)"
                ></div>

                <!-- Content container -->
                <div class="relative flex items-center justify-between py-6 px-8 lg:py-8 lg:px-12">
                  <!-- Text content -->
                  <div class="flex-grow text-right pr-6">
                    <h3
                      id="feature-3-title"
                      class="text-xl lg:text-2xl font-bold text-teal-800 dark:text-teal-100 mb-3"
                    >
                      كورسات تناسب اهتماماتك
                    </h3>
                    <p
                      class="text-teal-700 dark:text-teal-200 leading-relaxed text-sm lg:text-base"
                    >
                      اختار من بين كورسات في مجالات مختلفة تناسب اهتماماتك ومستقبلك، ومع خصومات خاصة
                      هتقدر تتعلم بأقل تكلفة وأعلى قيمة.
                    </p>
                  </div>

                  <!-- Icon -->
                  <div class="flex-shrink-0">
                    <div
                      class="w-12 h-12 lg:w-14 lg:h-14 bg-teal-500 dark:bg-teal-400 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <i class="pi pi-graduation-cap text-white text-lg lg:text-xl"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Student Image -->
        <div class="">
          <div class="relative max-w-lg mx-auto lg:mx-0">
            <!-- Main background shapes -->
            <div class="relative">
              <!-- Large background shape with dotted pattern -->
              <div
                class="absolute -inset-4 bg-gradient-to-br from-teal-100 via-cyan-100 to-teal-200 dark:from-teal-900 dark:via-cyan-900 dark:to-teal-800 rounded-3xl transform rotate-6 scale-105 opacity-80"
              ></div>
              <div
                class="absolute -inset-2 bg-gradient-to-br from-cyan-100 via-teal-100 to-cyan-200 dark:from-cyan-900 dark:via-teal-900 dark:to-cyan-800 rounded-3xl transform -rotate-3 scale-95 opacity-60"
              ></div>

              <!-- Dotted pattern overlay -->
              <div class="absolute top-4 right-4 w-16 h-16 opacity-30">
                <svg viewBox="0 0 100 100" class="w-full h-full text-teal-400 dark:text-teal-600">
                  <defs>
                    <pattern
                      id="student-dots"
                      x="0"
                      y="0"
                      width="20"
                      height="20"
                      patternUnits="userSpaceOnUse"
                    >
                      <circle cx="10" cy="10" r="2" fill="currentColor" />
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#student-dots)" />
                </svg>
              </div>

              <!-- Student image container -->
              <div
                class="relative bg-gradient-to-br from-teal-400 to-cyan-500 p-1 rounded-3xl shadow-2xl"
              >
                <div class="bg-neutrals-white dark:bg-neutrals-800 rounded-3xl overflow-hidden">
                  <img
                    :src="images.HomeWhy"
                    alt="طالبة تحمل كتب وتبتسم"
                    class="w-full h-auto object-cover aspect-[4/6]"
                    loading="lazy"
                    @error="handleImageError('studentImage')"
                  />
                </div>
              </div>

              <!-- Floating decorative elements -->
              <div
                class="absolute -top-4 -right-4 w-8 h-8 bg-teal-400 rounded-full animate-bounce-gentle shadow-lg"
              ></div>
              <div
                class="absolute -bottom-6 -left-6 w-12 h-12 bg-cyan-400 rounded-full animate-float-gentle shadow-lg"
              ></div>
              <div
                class="absolute top-1/2 -left-8 w-6 h-6 bg-teal-500 rounded-full animate-pulse-gentle shadow-md"
              ></div>
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

const images = useImages()

// Set default student image
images.value.studentImage =
  images.value.studentImage || 'https://fakeimg.pl/400x500/cccccc/ffffff?text=طالبة&font=noto'

// Image error handling
const handleImageError = (key) => {
  images.value[key] = 'https://fakeimg.pl/400x500/cccccc/ffffff?text=طالبة&font=noto'
}
</script>

<style scoped>
/* RTL support */
.rtl {
  direction: rtl;
  text-align: right;
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

/* Slide right animation for features */
.animate-slide-right {
  animation: slideRight 0.8s ease-out forwards;
  opacity: 0;
}

@keyframes slideRight {
  0% {
    opacity: 0;
    transform: translateX(-50px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Gentle floating animations */
.animate-bounce-gentle {
  animation: bounceGentle 3s ease-in-out infinite;
}

@keyframes bounceGentle {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

.animate-float-gentle {
  animation: floatGentle 4s ease-in-out infinite;
}

@keyframes floatGentle {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
  33% {
    transform: translate(5px, -10px) rotate(5deg);
  }
  66% {
    transform: translate(-5px, -5px) rotate(-5deg);
  }
}

.animate-pulse-gentle {
  animation: pulseGentle 2s ease-in-out infinite;
}

@keyframes pulseGentle {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.1);
  }
}

/* Enhanced hover effects */
[role='article']:hover {
  transform: translateY(-2px);
  transition: transform 0.3s ease;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .text-3xl {
    font-size: var(--font-size-2xl);
    line-height: var(--line-height-2xl);
  }

  .text-xl {
    font-size: var(--font-size-lg);
    line-height: var(--line-height-lg);
  }

  .w-12 {
    width: 2.5rem;
    height: 2.5rem;
  }

  .py-6 {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  .px-8 {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .animate-fade-in,
  .animate-slide-right,
  .animate-bounce-gentle,
  .animate-float-gentle,
  .animate-pulse-gentle {
    animation: none;
  }

  .animate-fade-in,
  .animate-slide-right {
    opacity: 1;
    transform: none;
  }
}

/* Enhanced focus states */
[role='article']:focus-within {
  outline: 2px solid #0d9488;
  outline-offset: 4px;
  border-radius: 3.75rem;
}
</style>
