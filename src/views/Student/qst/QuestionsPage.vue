<template>
  <div class="container mx-auto py-8 px-4">
    <!-- Hero section -->
    <div class="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
      <!-- النصوص + الأزرار -->
      <div class="text-center md:text-right space-y-6">
        <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 leading-snug">بنك الأسئلة</h1>
        <p class="text-gray-600 text-lg md:text-xl leading-relaxed max-w-lg md:ml-auto">
          بيي تختبر عقلك بالأرقام ولا بالكلام، <br />
          أرنا قوتك،
          <span class="text-primary-600 font-semibold">وابدأ الآن</span>
        </p>
        <div class="flex flex-wrap items-center justify-center md:justify-start gap-4">
          <Button
            label="كمّي"
            icon="pi pi-calculator"
            iconPos="right"
            class="px-6 py-2 bg-primary-600 text-white rounded-lg shadow-md hover:bg-primary-700 transition-all"
          />
          <Button
            label="لفظي"
            icon="pi pi-book"
            iconPos="right"
            class="px-6 py-2 border border-primary-600 text-primary-600 bg-white hover:bg-primary-50 rounded-lg transition-all"
            outlined
          />
        </div>
      </div>

      <!-- الصورة -->
      <div class="relative flex justify-center md:justify-end">
        <img
          src="https://via.placeholder.com/400x400"
          alt="student"
          class="w-full max-w-[380px] md:max-w-[420px] object-cover relative z-10"
        />
      </div>
    </div>

    <!-- زر اكتشف -->
    <div class="mt-12 text-center md:text-right">
      <p class="text-lg md:text-xl font-semibold text-gray-800 mb-4">اكتشف الأسئلة الجديدة وحلها</p>
      <router-link to="/comparison-list">
        <Button
          label="اكتشف الآن"
          icon="pi pi-arrow-left"
          class="px-8 py-3 bg-primary-600 text-white text-lg rounded-lg shadow-md hover:bg-primary-700 transition-all"
        />
      </router-link>
    </div>

    <!-- start cards here -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
      <div
        v-for="(card, i) in cards"
        :key="i"
        class="p-6 rounded-xl shadow-md text-white"
        :class="card.color"
      >
        <div class="flex items-center gap-2 mb-4">
          <i :class="`pi ${card.icon} text-2xl`"></i>
          <h3 class="text-xl font-bold">{{ card.title }}</h3>
        </div>
        <p class="text-sm opacity-90 mb-4">{{ card.desc }}</p>
        <ProgressBar :value="card.progress" class="h-2 mb-2 rounded-full" />
        <p class="text-xs">{{ card.footer }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button'
import ProgressBar from 'primevue/progressbar'

// Dummy data for cards, replace with actual data from API or store
const cards = [
  {
    title: 'جبر',
    desc: 'تناول الأشكال الهندسية (المعادلات، المتطابقات...) مع تدريبات تطبيقية.',
    progress: 25,
    footer: 'يا سلام! 25 إنجاز من مسيطر كلها لاخيرا!',
    color: 'bg-gradient-to-r from-cyan-500 to-teal-500',
    icon: 'pi-calculator',
  },
  {
    title: 'هندسة',
    desc: 'التعامل مع الأشكال الهندسية المختلفة وحل التدريبات التطبيقية.',
    progress: 40,
    footer: 'شد حيلك! الإنجاز قريب منك!',
    color: 'bg-gradient-to-r from-green-400 to-emerald-500',
    icon: 'pi-compass',
  },
  {
    title: 'مقارنة',
    desc: 'تناول موضوعات متعددة في (الجبر والهندسة) مع مهارات حل المشكلات.',
    progress: 40,
    footer: 'شد حيلك! الإنجاز قريب منك!',
    color: 'bg-gradient-to-r from-sky-400 to-blue-500',
    icon: 'pi-chart-bar',
  },
  {
    title: 'تحليلي وإحصائي',
    desc: 'يشمل مفهوم البيان ودروس عن الإحصاءات مع تدريبات تطبيقية.',
    progress: 60,
    footer: 'ما شاء الله! الإنجاز يلمع!',
    color: 'bg-gradient-to-r from-teal-400 to-cyan-600',
    icon: 'pi-chart-pie',
  },
  {
    title: 'حسابي',
    desc: 'التعامل مع العمليات الحسابية (الكسور والضرب) مع تدريبات أعمق.',
    progress: 70,
    footer: 'أوشكت على النهاية، برافو!',
    color: 'bg-gradient-to-r from-yellow-400 to-amber-500',
    icon: 'pi-percentage',
  },
]
</script>

<style scoped>
/* Add any component-specific styles here if needed */
</style>
