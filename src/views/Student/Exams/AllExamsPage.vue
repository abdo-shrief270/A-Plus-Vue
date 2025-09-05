<template>
  <div>
    <!-- start hero -->
    <div
      class="bg-gradient-to-br from-primary-50 to-primary-50 dark:from-gray-900 dark:to-gray-800 py-12 flex items-center"
    >
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Right side - Content -->
          <div class="order-2 lg:order-1 text-right">
            <h1
              class="text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-6 leading-tight"
            >
              بنك الأسئلة
            </h1>

            <div class="mb-8">
              <p class="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-2">
                تبي تختبر عقلك بالأرقام ولا بالكلام،
              </p>
              <p class="text-lg lg:text-xl text-primary-500 dark:text-primary-400 font-medium">
                أرنا قوتك وابدأ الأن
              </p>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 mb-12">
              <Button label="كمي" />
              <Button label="لفظي" outlined />
            </div>

            <!-- Discovery Section -->
            <div class="mb-8">
              <h2 class="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white mb-6">
                اكتشف الأسئلة الجديدة وحلها
              </h2>

              <Button label="اكتشف الآن" />
            </div>
          </div>

          <!-- Left side - Image -->
          <div class="order-1 lg:order-2 flex justify-center lg:justify-end">
            <img
              :src="images.examsHero"
              alt="quiz logo"
              class="float-animation max-w-[400px] lg:max-w-[500px]"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- start exams -->
    <div class="py-16 bg-gray-50 dark:bg-gray-900">
      <div class="">
        <div class="text-center mb-12">
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            ابدأ اختبارك الآن
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300">اختر نوع الاختبار المناسب لك</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto">
          <!-- Exam Cards -->
          <div
            v-for="exam in examTypes"
            :key="exam.id"
            class="exam-card bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl p-6 text-white shadow-lg cursor-pointer"
            @click="startExam(exam.type)"
          >
            <!-- Icon -->

            <!-- Title -->
            <h3 class="text-xl font-bold mb-3 text-right">{{ exam.title }}</h3>

            <!-- Description -->
            <p class="text-sm opacity-90 mb-6 text-right leading-relaxed">
              {{ exam.description }}
            </p>

            <!-- Progress Bar -->
            <div class="mb-4">
              <div class="bg-white bg-opacity-20 rounded-full h-2">
                <div
                  class="bg-primary-400 rounded-full h-2 transition-all duration-300"
                  :style="`width: ${exam.progress}%`"
                ></div>
              </div>
            </div>

            <!-- Bottom Info -->
            <div class="flex justify-between items-center text-sm">
              <span class="opacity-80">{{ exam.status }}</span>
              <span class="font-medium">{{ exam.time }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import useImages from '@/helpers/images.helper'

const images = useImages()
const isVisible = ref(false)

const examTypes = ref([
  {
    id: 1,
    type: 'algebra',
    title: 'الجبر',
    description:
      'يتناول موضوعات مختلفة في الجبر مثل المعادلات، المتباينات، والمتسلسلات، مع تدريبات تطبيقية لفهم القوانين والخصائص.',
    icon: 'fas fa-calculator',
    progress: 75,
    time: 'بدأ من 7:25',
    status: 'آخر درس مكتمل',
  },
  {
    id: 2,
    type: 'geometry',
    title: 'الهندسة',
    description:
      'يتناول الأشكال الهندسية مثل الزوايا، المثلثات، المربعات، المستطيلات والدوائر، مع أمثلة عملية لتوضيح القوانين والخصائص.',
    icon: 'fas fa-drafting-compass',
    progress: 20,
    time: 'بدأ من 7:30',
    status: 'آخر درس تم استكماله',
  },
  {
    id: 3,
    type: 'comparison',
    title: 'المقارنات',
    description:
      'يتناول موضوعات في الرياضيات مثل النسب، الإحصاء، وحل المشكلات باستخدام المقارنات وتحليل البيانات.',
    icon: 'fas fa-balance-scale',
    progress: 40,
    time: 'بدأ من 7:40',
    status: 'قيد التقدم',
  },
  {
    id: 4,
    type: 'calculation',
    title: 'الحساب',
    description:
      'يتناول العمليات الحسابية الأساسية مثل الجمع، الطرح، الضرب، القسمة، الكسور، والنسب المئوية، مع تطبيقات عملية من الحياة اليومية.',
    icon: 'fas fa-square-root-alt',
    progress: 70,
    time: 'بدأ من 7:50',
    status: 'جارٍ الدراسة',
  },
  {
    id: 5,
    type: 'analysis',
    title: 'التحليل والإحصاء',
    description:
      'يتناول التحليل الإحصائي مثل الوسط الحسابي، الوسيط، المنوال، وتمثيل البيانات في جداول ورسوم بيانية مع تفسير النتائج.',
    icon: 'fas fa-chart-bar',
    progress: 60,
    time: 'بدأ من 8:00',
    status: 'في منتصف الدورة',
  },
])

onMounted(() => {
  isVisible.value = true
})

const startExam = (examType) => {
  console.log(`Starting ${examType} exam`)
  // Add navigation logic here
}
</script>

<style scoped>
/* Float animation for hero image */
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

/* Exam card hover effects */
.exam-card {
  position: relative;
  overflow: hidden;
}

.exam-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.exam-card:hover::before {
  opacity: 1;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .exam-card {
    transform: none;
  }

  .exam-card:hover {
    transform: translateY(-4px);
  }
}
</style>
