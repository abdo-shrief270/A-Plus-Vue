<template>
  <div
    class="flex flex-col lg:flex-row justify-center items-center py-12 px-4 container mx-auto gap-2"
    role="region"
    aria-label="مميزات التطبيق"
  >
    <!-- Left Content: Feature Cards -->
    <div class="w-full lg:w-2/3">
      <h2
        class="text-4xl font-bold text-right mb-8 text-primary-800 dark:text-primary-200 tracking-tight"
      >
        مميزاتنا
      </h2>
      <div
        class="grid gap-6 bg-gradient-to-br from-primary-50 to-secondary-100 dark:from-primary-950 dark:to-secondary-900 rounded-3xl shadow-xl p-8 transition-all duration-500 hover:shadow-2xl scrollbar-hide"
      >
        <TransitionGroup name="list" tag="div" class="grid gap-6">
          <div
            v-for="(item, index) in items"
            :key="index"
            class="bg-neutrals-white dark:bg-secondary-900 rounded-2xl shadow-md transition-all duration-300 transform overflow-hidden"
            role="article"
            :aria-labelledby="`feature-title-${index}`"
          >
            <div class="p-6 flex items-start gap-5 rtl">
              <div class="flex-shrink-0">
                <div
                  :class="[
                    item.bgColor,
                    'rounded-full p-4 flex items-center justify-center transition-transform duration-300',
                  ]"
                  :aria-hidden="true"
                >
                  <i :class="[item.iconClass, 'text-neutrals-white text-2xl']"></i>
                </div>
              </div>
              <div class="flex-grow">
                <h3
                  :id="`feature-title-${index}`"
                  class="text-2xl font-semibold mb-3 text-secondary-900 dark:text-neutrals-100"
                >
                  {{ item.title }}
                </h3>
                <p class="text-secondary-700 dark:text-secondary-300 leading-relaxed">
                  {{ item.description }}
                </p>
                <div v-if="item.stats" class="mt-4 flex flex-wrap gap-4 text-sm">
                  <span
                    v-for="(stat, statIndex) in item.stats"
                    :key="statIndex"
                    class="flex items-center gap-2 bg-neutrals-200 dark:bg-secondary-800 rounded-full px-3 py-1"
                  >
                    <i :class="[stat.icon, 'text-primary-600 dark:text-primary-400']"></i>
                    <span class="font-medium">{{ stat.value }}</span>
                    <div
                      class="h-1 w-12 bg-neutrals-300 dark:bg-secondary-700 rounded-full overflow-hidden"
                      :aria-hidden="true"
                    >
                      <div
                        class="h-full bg-primary-500 dark:bg-primary-400 transition-all duration-1000"
                        :style="{ width: stat.progress + '%' }"
                      ></div>
                    </div>
                  </span>
                </div>
              </div>
            </div>
            <div
              v-if="item.actions"
              class="bg-neutrals-100 dark:bg-secondary-950 px-6 py-4 text-right border-t border-neutrals-200 dark:border-secondary-800"
            >
              <button
                class="text-primary-700 hover:text-primary-900 dark:text-primary-300 dark:hover:text-primary-100 font-semibold transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg px-4 py-2"
                @click="handleAction(item.actions.primary)"
                :aria-label="`تنفيذ ${item.actions.primary}`"
              >
                {{ item.actions.primary }}
              </button>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>

    <!-- Right Content: Character -->
    <div
      class="w-full lg:w-1/3 flex items-center justify-center relative"
      role="complementary"
      aria-label="شخصية تفاعلية"
    >
      <div
        class="relative transition-transform duration-500 transform hover:scale-105 focus-within:scale-105 outline-none"
        :class="{ 'bounce-animation': isAnimating }"
        @mouseenter="startAnimation"
        @focusin="startAnimation"
        @click="toggleSpeechBubble"
        tabindex="0"
        role="button"
        aria-label="تفاعل مع الشخصية"
      >
        <!-- Speech Bubble -->
        <div
          v-if="showSpeechBubble"
          class="absolute -top-16 -right-4 z-10 bg-primary-600 dark:bg-primary-800 text-neutrals-white p-4 rounded-xl shadow-lg max-w-sm transition-opacity duration-300"
          :class="{ 'pop-in': showSpeechBubble }"
          role="dialog"
          aria-live="polite"
        >
          <div class="text-right font-semibold text-sm">
            {{ speechBubbleText }}
          </div>
          <div
            class="absolute bottom-0 right-10 transform translate-y-1/2 rotate-45 w-4 h-4 bg-primary-600 dark:bg-primary-800"
          ></div>
        </div>

        <!-- Character Circle -->
        <div
          class="relative p-1.5 rounded-full bg-gradient-to-r from-success-400 via-warning-400 to-error-400"
        >
          <div
            class="bg-gradient-to-br from-success-200 to-warning-200 dark:from-success-900 dark:to-warning-900 p-10 rounded-full shadow-2xl relative overflow-hidden"
          >
            <div
              class="absolute inset-0 bg-neutrals-white dark:bg-neutrals-950 opacity-30 rounded-full shine-effect"
            ></div>
            <img
              :src="images.HomeAbout"
              alt="شخصية تعليمية"
              class="w-40 h-40 object-cover rounded-full border-4 border-neutrals-white dark:border-neutrals-950 shadow-inner"
              loading="lazy"
              @error="handleImageError"
            />
          </div>
        </div>

        <!-- Floating Badges -->
        <div
          class="absolute -top-8 -left-8 bg-error-600 dark:bg-error-500 text-neutrals-white rounded-full px-4 py-1.5 text-xs font-bold shadow-md scale-animation"
          aria-hidden="true"
        >
          جديد!
        </div>
        <div
          class="absolute -bottom-6 -right-6 bg-success-600 dark:bg-success-500 text-neutrals-white rounded-full px-4 py-1.5 text-xs font-bold shadow-md delayed-scale-animation"
          aria-hidden="true"
        >
          حصري
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import useImages from '@/helpers/images.helper'

const images = useImages()
const characterImage = ref('/api/placeholder/400/400')
const showSpeechBubble = ref(false)
const isAnimating = ref(false)

// Dynamic speech bubble text
const speechBubbleOptions = ['تبغى أقولك ليش نتفوق؟', 'جاهز تكتشف مميزاتنا؟', 'خلينا نوصلك للتميز!']
const speechBubbleText = computed(() => {
  return speechBubbleOptions[Math.floor(Math.random() * speechBubbleOptions.length)]
})

// Enhanced items with progress indicators
const items = [
  {
    title: 'أسئلة متنوعة واختبارات محاكية لزيادة تحضيرك!',
    description: 'استمتع بمجموعة واسعة من أسئلة الكمي واللفظي مع شروحات تفصيلية لكل إجابة.',
    iconClass: 'pi pi-check-circle',
    bgColor: 'bg-error-600 dark:bg-error-500',
    stats: [
      { icon: 'pi pi-file', value: '+500 سؤال', progress: 85 },
      { icon: 'pi pi-users', value: '+10,000 طالب', progress: 90 },
    ],
    actions: {
      primary: 'استعرض الأسئلة',
    },
  },
  {
    title: 'خطة مذاكرة مخصصة تناسب مستواك!',
    description: 'احصل على خطة دراسية مصممة خصيصًا لتحقيق تقدم يومي وأهدافك.',
    iconClass: 'pi pi-calendar',
    bgColor: 'bg-primary-600 dark:bg-primary-500',
    stats: [
      { icon: 'pi pi-calendar', value: '60 يوم', progress: 75 },
      { icon: 'pi pi-chart-line', value: 'تقدم +40%', progress: 80 },
    ],
    actions: {
      primary: 'أنشئ خطتك',
    },
  },
  {
    title: 'مراجعة شاملة لكل نماذج الاختبار!',
    description: 'كل ما تحتاجه للمراجعة في مكان واحد مع تلخيصات دقيقة ومركزة.',
    iconClass: 'pi pi-rocket',
    bgColor: 'bg-warning-600 dark:bg-warning-500',
    stats: [
      { icon: 'pi pi-book', value: '12 مادة', progress: 95 },
      { icon: 'pi pi-star', value: 'تقييم 4.9/5', progress: 92 },
    ],
    actions: {
      primary: 'ابدأ المراجعة',
    },
  },
  {
    title: 'نماذج اختبارات متوقعة للتدريب!',
    description: 'تدرب على نماذج اختبارات مشابهة للاختبارات الرسمية ومحدثة باستمرار.',
    iconClass: 'pi pi-book',
    bgColor: 'bg-success-600 dark:bg-success-500',
    stats: [
      { icon: 'pi pi-copy', value: '30 نموذج', progress: 88 },
      { icon: 'pi pi-clock', value: 'محدثة دوريًا', progress: 90 },
    ],
    actions: {
      primary: 'جرب النماذج',
    },
  },
]

// Image handling
const tryLoadImage = async () => {
  try {
    if (images?.HomeAbout) {
      characterImage.value = images.HomeAbout
    }
  } catch (error) {
    console.error('Failed to load image, using placeholder:', error)
  }
}

const handleImageError = () => {
  characterImage.value = '/api/placeholder/400/400'
}

// Animation and interaction
const startAnimation = () => {
  if (!isAnimating.value) {
    isAnimating.value = true
    setTimeout(() => {
      isAnimating.value = false
    }, 1200)
  }
}

const toggleSpeechBubble = () => {
  showSpeechBubble.value = !showSpeechBubble.value
}

const handleAction = (action) => {
  console.log(`Action triggered: ${action}`)
}

onMounted(() => {
  tryLoadImage()
  setTimeout(() => {
    showSpeechBubble.value = true
  }, 1200)
})
</script>

<style scoped>
.rtl {
  direction: rtl;
  text-align: right;
  font-family: var(--font-family-sans);
}

/* Smooth list transitions */
.list-enter-active,
.list-leave-active {
  transition: all 0.6s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(40px);
}

/* Bounce animation for character */
.bounce-animation {
  animation: bounce 1.2s ease;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* Speech bubble pop-in effect */
.pop-in {
  animation: popIn 0.6s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards;
}

@keyframes popIn {
  0% {
    opacity: 0;
    transform: scale(0.4);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Badge animations */
.scale-animation {
  animation: scale 2.5s infinite alternate ease-in-out;
}

.delayed-scale-animation {
  animation: scale 2.5s infinite alternate ease-in-out;
  animation-delay: 1.2s;
}

@keyframes scale {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.15);
  }
}

/* Shine effect for character */
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
  .w-40 {
    width: 8rem;
    height: 8rem;
  }
  .p-10 {
    padding: 1.5rem;
  }
  .max-w-sm {
    max-width: 16rem;
  }
  .text-2xl {
    font-size: var(--font-size-xl);
    line-height: var(--line-height-xl);
  }
}
</style>
```
