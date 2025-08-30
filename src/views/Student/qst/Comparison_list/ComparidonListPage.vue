<template>
  <div class="container mx-auto py-8 px-4">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">بنك الأسئلة (مقارنة)</h2>
    <p class="text-gray-600 mb-6">
      تدل هذه العلامة على أن هذا السؤال جاء في امتحانات سابقة <i class="pi pi-bookmark"></i>
    </p>

    <div class="flex flex-wrap items-center justify-start gap-4 mb-8">
      <Button
        class="px-6 py-2 bg-primary-600 text-white rounded-lg shadow-md hover:bg-primary-700 transition-all"
        >كمّي</Button
      >
      <Button
        class="px-6 py-2 border border-primary-600 text-primary-600 bg-white hover:bg-primary-50 rounded-lg transition-all"
        >لفظي</Button
      >
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="(question, index) in questions"
        :key="index"
        class="bg-white p-6 rounded-lg shadow-md"
      >
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-800">{{ question.text }}</h3>
          <i class="pi pi-bookmark text-gray-400"></i>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-gray-200 p-3 rounded-md text-center">
            <p class="text-sm text-gray-600">القيمة الأولى</p>
            <p class="font-bold text-gray-800">{{ question.value1 }}</p>
          </div>
          <div class="bg-gray-200 p-3 rounded-md text-center">
            <p class="text-sm text-gray-600">القيمة الثانية</p>
            <p class="font-bold text-gray-800">{{ question.value2 }}</p>
          </div>
        </div>
        <router-link :to="`/question-detail/${index}`">
          <Button label="عرض السؤال" class="mt-4 w-full" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button'

const questions = [
  {
    text: 'إذا كان ما مع عبدالله 2500 هللة و8 ريالات. قارن بين:',
    value1: 'ما مع عبدالله',
    value2: '36 ريال',
  },
  {
    text: 'عمر أحمد 5 أمثال عمر يوسف وفارس 3 أمثال عمر أحمد قارن بين:',
    value1: 'عمر فارس',
    value2: 'عمر يوسف',
  },
  {
    text: 'مثلث قائم وتره (10) وأحد أضلاعه (8) قارن بين:',
    value1: 'مساحة المثلث',
    value2: '48',
  },
  {
    text: 'عمر أحمد 5 أمثال عمر يوسف وفارس 3 أمثال عمر أحمد قارن بين:',
    value1: 'عمر فارس',
    value2: 'عمر يوسف',
  },
  {
    text: 'إذا كان ما مع عبدالله 2500 هللة و8 ريالات. قارن بين:',
    value1: 'ما مع عبدالله',
    value2: '36 ريال',
  },
  {
    text: 'مثلث قائم وتره (10) وأحد أضلاعه (8) قارن بين:',
    value1: 'مساحة المثلث',
    value2: '48',
  },
]
</script>

<style scoped>
/* Add any component-specific styles here if needed */
</style>
