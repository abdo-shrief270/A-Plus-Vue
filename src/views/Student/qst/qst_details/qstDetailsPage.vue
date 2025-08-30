<template>
  <div class="container mx-auto py-8 px-4">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">
      السؤال {{ $route.params.id }} من 2186 (مقارنة)
    </h2>
    <p class="text-gray-600 mb-6">
      تدل هذه العلامة على أن هذا السؤال جاء في امتحانات سابقة <i class="pi pi-bookmark"></i>
    </p>

    <div class="bg-white p-6 rounded-lg shadow-md mb-8">
      <h3 class="text-xl font-bold text-gray-800 text-center mb-6">
        مثلث قائم وتره (10) وأحد أضلاعه (8) قارن بين:
      </h3>
      <div class="flex justify-center gap-4 mb-6">
        <Button
          class="px-6 py-3 bg-primary-600 text-white rounded-lg shadow-md hover:bg-primary-700 transition-all"
          >القيمة الثانية<br />48</Button
        >
        <Button
          class="px-6 py-3 bg-primary-600 text-white rounded-lg shadow-md hover:bg-primary-700 transition-all"
          >القيمة الأولى<br />مساحة المثلث</Button
        >
      </div>
      <div class="flex justify-between items-center mt-4">
        <router-link to="/report-problem">
          <Button
            class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all"
            >إبلاغ <i class="pi pi-question-circle"></i
          ></Button>
        </router-link>
        <Button
          class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all"
          >حفظ <i class="pi pi-bookmark"></i
        ></Button>
        <router-link :to="`/explanation/${$route.params.id}`">
          <Button
            class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all"
            >عرض الشرح <i class="pi pi-chevron-down"></i
          ></Button>
        </router-link>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <Button
        class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all"
        >القيمة الأولى أكبر</Button
      >
      <Button
        class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all"
        >القيمة الثانية أكبر</Button
      >
      <Button
        class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all"
        >القيمتان متساويتان</Button
      >
      <Button
        class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all"
        >المعطيات غير كافية</Button
      >
    </div>

    <div class="text-center mt-8">
      <Button class="text-primary-600 hover:underline">تخطي</Button>
      <router-link to="/comparison-list">
        <Button class="text-gray-500 hover:underline ml-4">رجوع</Button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button'
</script>

<style scoped>
/* Add any component-specific styles here if needed */
</style>
