<template>
  <div class="relative py-16 lg:py-20" role="section" aria-label="إحصائيات المنصة">
    <!-- Background decorative elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute top-10 left-10 w-32 h-32 bg-primary-100 dark:bg-primary-900 rounded-full opacity-20 blur-xl"
      ></div>
      <div
        class="absolute bottom-10 right-10 w-24 h-24 bg-success-100 dark:bg-success-900 rounded-full opacity-20 blur-xl"
      ></div>
    </div>

    <!-- Main Content Container -->
    <div class="relative container mx-auto px-4 lg:px-8 z-10">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        <!-- Statistic Item 1: Questions -->
        <div
          class="text-center animate-fade-in"
          style="animation-delay: 0ms"
          role="article"
          aria-labelledby="stat-1-title"
        >
          <!-- Icon Container -->
          <div class="flex justify-center mb-6">
            <div class="relative">
              <div
                class="w-16 h-16 bg-gradient-to-br from-success-400 to-success-600 rounded-full flex items-center justify-center shadow-lg animate-pulse-subtle"
              >
                <i class="pi pi-briefcase text-neutrals-white text-2xl"></i>
              </div>
              <!-- Floating indicator -->
              <div
                class="absolute -top-2 -right-2 w-6 h-6 bg-warning-500 rounded-full animate-bounce-subtle"
              ></div>
            </div>
          </div>

          <!-- Number -->
          <div class="mb-4">
            <span
              class="text-4xl lg:text-5xl font-bold text-primary-800 dark:text-primary-100 countup"
              :data-target="4000"
              ref="counter1"
            >
              {{ animatedNumbers.questions }}
            </span>
            <span class="text-2xl lg:text-3xl font-bold text-success-600 dark:text-success-400 mr-2"
              >+</span
            >
          </div>

          <!-- Description -->
          <p
            id="stat-1-title"
            class="text-secondary-700 dark:text-secondary-200 text-sm lg:text-base leading-relaxed max-w-xs mx-auto"
          >
            بنك أسئلة ضخم فيه أكثر من
            <span class="font-semibold text-primary-700 dark:text-primary-300">4000</span>
            سؤال يضمنلك استعداد كامل
          </p>
        </div>

        <!-- Statistic Item 2: Videos -->
        <div
          class="text-center animate-fade-in"
          style="animation-delay: 200ms"
          role="article"
          aria-labelledby="stat-2-title"
        >
          <!-- Icon Container -->
          <div class="flex justify-center mb-6">
            <div class="relative">
              <div
                class="w-16 h-16 bg-gradient-to-br from-success-400 to-success-600 rounded-full flex items-center justify-center shadow-lg animate-pulse-subtle"
              >
                <i class="pi pi-play text-neutrals-white text-2xl"></i>
              </div>
              <!-- Floating indicator -->
              <div
                class="absolute -top-2 -right-2 w-6 h-6 bg-error-500 rounded-full animate-bounce-subtle"
              ></div>
            </div>
          </div>

          <!-- Number -->
          <div class="mb-4">
            <span
              class="text-4xl lg:text-5xl font-bold text-primary-800 dark:text-primary-100 countup"
              :data-target="300"
              ref="counter2"
            >
              {{ animatedNumbers.videos }}
            </span>
            <span class="text-2xl lg:text-3xl font-bold text-success-600 dark:text-success-400 mr-2"
              >+</span
            >
          </div>

          <!-- Description -->
          <p
            id="stat-2-title"
            class="text-secondary-700 dark:text-secondary-200 text-sm lg:text-base leading-relaxed max-w-xs mx-auto"
          >
            من العلوم للمهارات العملية..
            <span class="font-semibold text-primary-700 dark:text-primary-300">محتوى متنوع</span>
            يغطي كل الأجزاء
          </p>
        </div>

        <!-- Statistic Item 3: Students -->
        <div
          class="text-center animate-fade-in"
          style="animation-delay: 400ms"
          role="article"
          aria-labelledby="stat-3-title"
        >
          <!-- Icon Container -->
          <div class="flex justify-center mb-6">
            <div class="relative">
              <div
                class="w-16 h-16 bg-gradient-to-br from-success-400 to-success-600 rounded-full flex items-center justify-center shadow-lg animate-pulse-subtle"
              >
                <i class="pi pi-users text-neutrals-white text-2xl"></i>
              </div>
              <!-- Floating indicator -->
              <div
                class="absolute -top-2 -right-2 w-6 h-6 bg-primary-500 rounded-full animate-bounce-subtle"
              ></div>
            </div>
          </div>

          <!-- Number -->
          <div class="mb-4">
            <span
              class="text-4xl lg:text-5xl font-bold text-primary-800 dark:text-primary-100 countup"
              :data-target="2000"
              ref="counter3"
            >
              {{ animatedNumbers.students }}
            </span>
            <span class="text-2xl lg:text-3xl font-bold text-success-600 dark:text-success-400 mr-2"
              >+</span
            >
          </div>

          <!-- Description -->
          <p
            id="stat-3-title"
            class="text-secondary-700 dark:text-secondary-200 text-sm lg:text-base leading-relaxed max-w-xs mx-auto"
          >
            انضم لأكثر من
            <span class="font-semibold text-primary-700 dark:text-primary-300">2000 طالب</span>
            يذاكروا ويستعدوا معنا للنجاح
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Animated numbers state
const animatedNumbers = ref({
  questions: 0,
  videos: 0,
  students: 0,
})

// Animation controls
const isVisible = ref(false)
const observer = ref(null)

// Counter animation function
const animateCounter = (start, end, duration, callback) => {
  const startTime = performance.now()
  const difference = end - start

  const step = (currentTime) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    // Easing function for smooth animation
    const easeOutCubic = 1 - Math.pow(1 - progress, 3)
    const current = Math.floor(start + difference * easeOutCubic)

    callback(current)

    if (progress < 1) {
      requestAnimationFrame(step)
    }
  }

  requestAnimationFrame(step)
}

// Start all animations
const startAnimations = () => {
  if (isVisible.value) return

  isVisible.value = true

  // Animate questions counter
  animateCounter(0, 4000, 2000, (value) => {
    animatedNumbers.value.questions = value
  })

  // Animate videos counter with delay
  setTimeout(() => {
    animateCounter(0, 300, 1500, (value) => {
      animatedNumbers.value.videos = value
    })
  }, 200)

  // Animate students counter with delay
  setTimeout(() => {
    animateCounter(0, 2000, 1800, (value) => {
      animatedNumbers.value.students = value
    })
  }, 400)
}

// Intersection Observer setup
const setupIntersectionObserver = () => {
  observer.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isVisible.value) {
          startAnimations()
        }
      })
    },
    {
      threshold: 0.3,
      rootMargin: '0px 0px -100px 0px',
    },
  )
}

onMounted(() => {
  setupIntersectionObserver()

  // Observe the main container
  const mainElement = document.querySelector('[role="section"][aria-label="إحصائيات المنصة"]')
  if (mainElement && observer.value) {
    observer.value.observe(mainElement)
  }
})

onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect()
  }
})
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
  opacity: 0;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Subtle pulse animation for icons */
.animate-pulse-subtle {
  animation: pulseSubtle 2s ease-in-out infinite;
}

@keyframes pulseSubtle {
  0%,
  100% {
    transform: scale(1);
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  50% {
    transform: scale(1.05);
    box-shadow:
      0 8px 12px -2px rgba(0, 0, 0, 0.15),
      0 4px 8px -2px rgba(0, 0, 0, 0.1);
  }
}

/* Subtle bounce animation for indicators */
.animate-bounce-subtle {
  animation: bounceSubtle 2s ease-in-out infinite;
}

@keyframes bounceSubtle {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

/* Number counter styling */
.countup {
  background: linear-gradient(135deg, #1e40af, #059669);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-variant-numeric: tabular-nums;
}

/* Dark mode adjustments */
@media (prefers-color-scheme: dark) {
  .countup {
    background: linear-gradient(135deg, #60a5fa, #34d399);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .text-4xl {
    font-size: var(--font-size-3xl);
    line-height: var(--line-height-3xl);
  }

  .text-2xl {
    font-size: var(--font-size-xl);
    line-height: var(--line-height-xl);
  }

  .w-16 {
    width: 3.5rem;
    height: 3.5rem;
  }

  .text-2xl.pi {
    font-size: 1.25rem;
  }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .animate-fade-in,
  .animate-pulse-subtle,
  .animate-bounce-subtle {
    animation: none;
  }

  .animate-fade-in {
    opacity: 1;
    transform: none;
  }
}

/* Enhanced focus states */
[role='article']:focus-within {
  outline: 2px solid #059669;
  outline-offset: 4px;
  border-radius: 8px;
}
</style>
