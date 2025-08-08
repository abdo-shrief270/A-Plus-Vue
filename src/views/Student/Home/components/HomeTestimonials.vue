<template>
  <div class="py-16 px-4 container mx-auto" role="region" aria-label="آراء العملاء">
    <!-- Header -->
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold text-primary-800 dark:text-primary-200 tracking-tight mb-4">
        قصص نجاح طلابنا
      </h2>
      <p class="text-lg text-secondary-700 dark:text-secondary-300 max-w-2xl mx-auto">
        اكتشف كيف ساعدت منصتنا التعليمية طلابنا على تحقيق أهدافهم الأكاديمية!
      </p>
    </div>

    <!-- Testimonials Grid -->
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 rounded-3xl p-8 scrollbar-hide"
    >
      <div
        v-for="(testimonial, index) in testimonials"
        :key="testimonial.id"
        class="bg-neutrals-white dark:bg-secondary-900 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden cursor-pointer animate-fade-in"
        :style="{ animationDelay: `${index * 150}ms` }"
        role="article"
        :aria-labelledby="`testimonial-title-${index}`"
        @click="expandTestimonial(index)"
        @keydown.enter="expandTestimonial(index)"
        tabindex="0"
      >
        <div class="p-6 flex flex-col gap-4 rtl">
          <!-- Avatar and Rating -->
          <div class="flex items-center gap-4">
            <div
              class="relative p-1 rounded-full bg-gradient-to-r from-success-400 via-warning-400 to-primary-400"
            >
              <img
                :src="images.HomeAbout"
                :alt="`صورة ${testimonial.name}`"
                class="w-16 h-16 object-cover rounded-full border-2 border-neutrals-white dark:border-neutrals-950"
                loading="lazy"
                @error="handleImageError(index)"
              />
              <div
                class="absolute inset-0 bg-neutrals-white dark:bg-neutrals-950 opacity-20 rounded-full shine-effect"
              ></div>
            </div>
            <div>
              <h3
                :id="`testimonial-title-${index}`"
                class="text-xl font-semibold text-secondary-900 dark:text-neutrals-100"
              >
                {{ testimonial.name }}
              </h3>
              <p class="text-sm text-secondary-600 dark:text-secondary-400">
                {{ testimonial.role }}
              </p>
              <div class="flex gap-1 mt-1">
                <i
                  v-for="star in 5"
                  :key="star"
                  :class="[
                    'pi pi-star-fill',
                    star <= testimonial.rating
                      ? 'text-warning-500'
                      : 'text-secondary-300 dark:text-secondary-700',
                  ]"
                ></i>
              </div>
            </div>
          </div>
          <!-- Quote -->
          <p
            class="text-secondary-700 dark:text-secondary-300 line-clamp-3"
            :class="{ 'line-clamp-none': testimonial.expanded }"
          >
            {{ testimonial.quote }}
          </p>
          <!-- Stats -->
          <div v-if="testimonial.stats" class="flex flex-wrap gap-3 text-sm mt-3">
            <span
              v-for="(stat, statIndex) in testimonial.stats"
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
        <!-- Expanded Content -->
        <div
          v-if="testimonial.expanded"
          class="bg-neutrals-100 dark:bg-secondary-950 px-6 py-4 text-right border-t border-neutrals-200 dark:border-secondary-800"
        >
          <button
            class="text-primary-700 hover:text-primary-900 dark:text-primary-300 dark:hover:text-primary-100 font-semibold transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg px-4 py-2"
            @click.stop="readMore(testimonial)"
            :aria-label="`اقرأ المزيد عن تجربة ${testimonial.name}`"
          >
            اقرأ المزيد
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useImages from '@/helpers/images.helper'

const images = useImages()
// Color mappings for FakeImg.pl (hex without #)
const bgColors = [
  '4ecf6a', // --color-primary-400
  '27af88', // --color-success-600
  'f1b46a', // --color-warning-600
  'e25477', // --color-error-600
]
const textColor = 'ffffff' // --color-neutrals-white

const testimonials = ref([
  {
    id: 't1',
    name: 'سارة عبدالله',
    role: 'طالبة ثانوية',
    quote:
      'منصة مذهلة! ساعدتني على رفع درجتي في اختبار القدرات بنسبة 35% في شهرين فقط، بفضل الأسئلة المتنوعة والشروحات الواضحة.',
    avatar: `https://fakeimg.pl/100x100/${bgColors[0]}/${textColor}?text=سارة&font=noto`,
    rating: 5,
    stats: [
      { icon: 'pi pi-chart-line', value: 'تحسن 35%', progress: 85 },
      { icon: 'pi pi-clock', value: 'شهرين', progress: 90 },
    ],
    expanded: false,
  },
  {
    id: 't2',
    name: 'محمد خالد',
    role: 'طالب جامعي',
    quote:
      'النماذج المحاكية كانت مطابقة للاختبارات الرسمية، مما ساعدني على تحقيق درجة 94 في التحصيلي. منصة لا غنى عنها!',
    avatar: `https://fakeimg.pl/100x100/${bgColors[1]}/${textColor}?text=محمد&font=noto`,
    rating: 4,
    stats: [
      { icon: 'pi pi-trophy', value: 'درجة 94', progress: 92 },
      { icon: 'pi pi-book', value: '12 نموذج', progress: 88 },
    ],
    expanded: false,
  },
  {
    id: 't3',
    name: 'نورة أحمد',
    role: 'طالبة ثانوية',
    quote:
      'خطة المذاكرة المخصصة غيرت نهجي في التحضير. أصبحت أكثر ثقة بفضل التلخيصات المركزة والأسئلة المحدثة.',
    avatar: `https://fakeimg.pl/100x100/${bgColors[2]}/${textColor}?text=نورة&font=noto`,
    rating: 5,
    stats: [
      { icon: 'pi pi-star', value: 'تقييم 5/5', progress: 95 },
      { icon: 'pi pi-calendar', value: '50 يوم', progress: 90 },
    ],
    expanded: false,
  },
  {
    id: 't4',
    name: 'عبدالرحمن فهد',
    role: 'طالب ثانوية',
    quote:
      'التطبيق سهل الاستخدام ومصادر التعلم محدثة باستمرار. ساعدني على تنظيم وقتي وتحسين درجتي إلى 90 في القدرات.',
    avatar: `https://fakeimg.pl/100x100/${bgColors[3]}/${textColor}?text=عبدالرحمن&font=noto`,
    rating: 4,
    stats: [
      { icon: 'pi pi-check-circle', value: 'درجة 90', progress: 90 },
      { icon: 'pi pi-refresh', value: 'محدث', progress: 85 },
    ],
    expanded: false,
  },
])

// Interaction
const expandTestimonial = (index) => {
  testimonials.value[index].expanded = !testimonials.value[index].expanded
}

const readMore = (testimonial) => {
  console.log(`Read more about ${testimonial.name}'s experience`)
  // Add logic for modal or page navigation
}

const handleImageError = (index) => {
  testimonials.value[index].avatar = `https://fakeimg.pl/100x100/cccccc/ffffff?text=بديل&font=noto`
}
</script>

<style scoped>
.rtl {
  direction: rtl;
  text-align: right;
  font-family: var(--font-family-sans);
}

/* Fade-in animation for cards */
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

/* Shine effect for avatar */
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

/* Hover animation */
.transform:hover {
  animation: hoverBounce 0.3s ease;
}

@keyframes hoverBounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
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
  .w-16 {
    width: 3rem;
    height: 3rem;
  }
  .text-xl {
    font-size: var(--font-size-lg);
    line-height: var(--line-height-lg);
  }
}
</style>
