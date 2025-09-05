<template>
  <div class="py-16 px-4 container mx-auto" role="region" aria-label="آراء الطلاب والتقييمات">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      <!-- Right Section: Student Reviews -->
      <div class="order-2 lg:order-1">
        <div class="text-right mb-8">
          <h2 class="text-3xl lg:text-4xl font-bold text-primary-800 dark:text-primary-200 mb-4">
            بعض آراء الطلاب
          </h2>
          <p
            class="text-base lg:text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed"
          >
            طلابنا يحكموا عن تجربة تطبيق تقويم بكل وضوح، مش هنقول أكتر من كده الاستماع لهم المحتوى
            اللي فيه أفضل بكتير راحة
          </p>
        </div>

        <!-- Reviews Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <!-- Review 1: فوزة عبدالله -->
          <div
            class="bg-neutrals-white dark:bg-secondary-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in"
            style="animation-delay: 100ms"
          >
            <div class="flex items-center gap-3 mb-4">
              <div
                class="w-12 h-12 bg-gradient-to-br from-success-400 to-success-600 rounded-full flex items-center justify-center"
              >
                <i class="pi pi-user text-white text-lg"></i>
              </div>
              <div>
                <h4 class="text-lg font-bold text-secondary-900 dark:text-neutrals-100">
                  فوزة عبدالله
                </h4>
                <div class="flex gap-1">
                  <span class="text-2xl font-bold text-warning-500">4.1</span>
                  <div class="flex">
                    <i class="pi pi-star-fill text-warning-500 text-sm"></i>
                    <i class="pi pi-star-fill text-warning-500 text-sm"></i>
                    <i class="pi pi-star-fill text-warning-500 text-sm"></i>
                    <i class="pi pi-star-fill text-warning-500 text-sm"></i>
                    <i class="pi pi-star text-secondary-300 text-sm"></i>
                  </div>
                </div>
              </div>
            </div>
            <p class="text-secondary-700 dark:text-secondary-300 text-sm leading-relaxed">
              كنت دايماً أقول مش قويل الاختبارات، بس مع الحاجة ومنصة الأسئلة محتسب طابق إجابات خطوة
              بخطوة
            </p>
          </div>

          <!-- Review 2: سعود عبدالعزيز -->
          <div
            class="bg-neutrals-white dark:bg-secondary-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in"
            style="animation-delay: 200ms"
          >
            <div class="flex items-center gap-3 mb-4">
              <div
                class="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center"
              >
                <i class="pi pi-user text-white text-lg"></i>
              </div>
              <div>
                <h4 class="text-lg font-bold text-secondary-900 dark:text-neutrals-100">
                  سعود عبدالعزيز
                </h4>
                <div class="flex gap-1">
                  <span class="text-2xl font-bold text-warning-500">4.4</span>
                  <div class="flex">
                    <i class="pi pi-star-fill text-warning-500 text-sm"></i>
                    <i class="pi pi-star-fill text-warning-500 text-sm"></i>
                    <i class="pi pi-star-fill text-warning-500 text-sm"></i>
                    <i class="pi pi-star-fill text-warning-500 text-sm"></i>
                    <i class="pi pi-star-fill text-warning-500 text-sm"></i>
                  </div>
                </div>
              </div>
            </div>
            <p class="text-secondary-700 dark:text-secondary-300 text-sm leading-relaxed">
              أكتر حاجة عجبني في المنصة هو توفير تهتم، بحطم إختيار تحضر شامل وطريق تطفيع متغيرف
            </p>
          </div>

          <!-- Review 3: فهد سليمان -->
          <div
            class="bg-neutrals-white dark:bg-secondary-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in"
            style="animation-delay: 300ms"
          >
            <div class="flex items-center gap-3 mb-4">
              <div
                class="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center"
              >
                <i class="pi pi-user text-white text-lg"></i>
              </div>
              <div>
                <h4 class="text-lg font-bold text-secondary-900 dark:text-neutrals-100">
                  فهد سليمان
                </h4>
                <div class="flex gap-1">
                  <span class="text-2xl font-bold text-warning-500">4.2</span>
                  <div class="flex">
                    <i class="pi pi-star-fill text-warning-500 text-sm"></i>
                    <i class="pi pi-star-fill text-warning-500 text-sm"></i>
                    <i class="pi pi-star-fill text-warning-500 text-sm"></i>
                    <i class="pi pi-star-fill text-warning-500 text-sm"></i>
                    <i class="pi pi-star text-secondary-300 text-sm"></i>
                  </div>
                </div>
              </div>
            </div>
            <p class="text-secondary-700 dark:text-secondary-300 text-sm leading-relaxed">
              الكورسات المنوعة ومنهولة الوصول لها خلتني أتعلم أشياء جديدة وعلاستي ومشار مرة مناسب
            </p>
          </div>

          <!-- Review 4: يمني عبدالله -->
          <div
            class="bg-neutrals-white dark:bg-secondary-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in"
            style="animation-delay: 400ms"
          >
            <div class="flex items-center gap-3 mb-4">
              <div
                class="w-12 h-12 bg-gradient-to-br from-error-400 to-error-600 rounded-full flex items-center justify-center"
              >
                <i class="pi pi-user text-white text-lg"></i>
              </div>
              <div>
                <h4 class="text-lg font-bold text-secondary-900 dark:text-neutrals-100">
                  يمني عبدالله
                </h4>
                <div class="flex gap-1">
                  <span class="text-2xl font-bold text-warning-500">4.7</span>
                  <div class="flex">
                    <i class="pi pi-star-fill text-warning-500 text-sm"></i>
                    <i class="pi pi-star-fill text-warning-500 text-sm"></i>
                    <i class="pi pi-star-fill text-warning-500 text-sm"></i>
                    <i class="pi pi-star-fill text-warning-500 text-sm"></i>
                    <i class="pi pi-star-fill text-warning-500 text-sm"></i>
                  </div>
                </div>
              </div>
            </div>
            <p class="text-secondary-700 dark:text-secondary-300 text-sm leading-relaxed">
              الخطة التعليمية ساعدتني أذاكر بنظام قويل مرة، ووفك الأساليب خلاص إطول الامتحان وآنا
              واثق
            </p>
          </div>
        </div>
      </div>

      <!-- Left Section: Ratings Overview -->
      <div class="order-1 lg:order-2">
        <div class="bg-neutrals-white dark:bg-secondary-900 rounded-3xl p-8 shadow-lg">
          <!-- Header -->
          <div class="text-center mb-8">
            <h3
              class="text-2xl lg:text-3xl font-bold text-secondary-900 dark:text-neutrals-100 mb-2"
            >
              متوسط التقييمات
            </h3>
            <div class="flex items-center justify-center gap-2">
              <span class="text-4xl lg:text-5xl font-bold text-warning-500">4.6</span>
              <div class="flex">
                <i class="pi pi-star-fill text-warning-500 text-xl"></i>
                <i class="pi pi-star-fill text-warning-500 text-xl"></i>
                <i class="pi pi-star-fill text-warning-500 text-xl"></i>
                <i class="pi pi-star-fill text-warning-500 text-xl"></i>
                <i class="pi pi-star text-warning-300 text-xl"></i>
              </div>
            </div>
            <p class="text-sm text-secondary-600 dark:text-secondary-400 mt-2">
              (1215 من تقييمات الطلاب)
            </p>
          </div>

          <!-- Rating Bars -->
          <div class="space-y-3">
            <!-- 5 Stars -->
            <div class="flex items-center gap-3">
              <span class="text-sm font-medium text-secondary-700 dark:text-secondary-300 w-4"
                >5</span
              >
              <i class="pi pi-star-fill text-warning-500 text-sm"></i>
              <div
                class="flex-1 bg-secondary-50 dark:bg-secondary-700 rounded-full h-2 overflow-hidden"
              >
                <div
                  class="h-full bg-success-500 rounded-full transition-all duration-1000"
                  style="width: 65%"
                ></div>
              </div>
            </div>

            <!-- 4 Stars -->
            <div class="flex items-center gap-3">
              <span class="text-sm font-medium text-secondary-700 dark:text-secondary-300 w-4"
                >4</span
              >
              <i class="pi pi-star-fill text-warning-500 text-sm"></i>
              <div
                class="flex-1 bg-secondary-50 dark:bg-secondary-700 rounded-full h-2 overflow-hidden"
              >
                <div
                  class="h-full bg-warning-500 rounded-full transition-all duration-1000"
                  style="width: 45%"
                ></div>
              </div>
            </div>

            <!-- 3 Stars -->
            <div class="flex items-center gap-3">
              <span class="text-sm font-medium text-secondary-700 dark:text-secondary-300 w-4"
                >3</span
              >
              <i class="pi pi-star-fill text-warning-500 text-sm"></i>
              <div
                class="flex-1 bg-secondary-50 dark:bg-secondary-700 rounded-full h-2 overflow-hidden"
              >
                <div
                  class="h-full bg-warning-400 rounded-full transition-all duration-1000"
                  style="width: 25%"
                ></div>
              </div>
            </div>

            <!-- 2 Stars -->
            <div class="flex items-center gap-3">
              <span class="text-sm font-medium text-secondary-700 dark:text-secondary-300 w-4"
                >2</span
              >
              <i class="pi pi-star-fill text-warning-500 text-sm"></i>
              <div
                class="flex-1 bg-secondary-50 dark:bg-secondary-700 rounded-full h-2 overflow-hidden"
              >
                <div
                  class="h-full bg-error-400 rounded-full transition-all duration-1000"
                  style="width: 10%"
                ></div>
              </div>
            </div>

            <!-- 1 Star -->
            <div class="flex items-center gap-3">
              <span class="text-sm font-medium text-secondary-700 dark:text-secondary-300 w-4"
                >1</span
              >
              <i class="pi pi-star-fill text-warning-500 text-sm"></i>
              <div
                class="flex-1 bg-secondary-50 dark:bg-secondary-700 rounded-full h-2 overflow-hidden"
              >
                <div
                  class="h-full bg-error-500 rounded-full transition-all duration-1000"
                  style="width: 5%"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No additional script needed for this static component
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
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Hover effects */
.hover\:shadow-xl:hover {
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .text-3xl {
    font-size: var(--font-size-2xl);
    line-height: var(--line-height-2xl);
  }

  .text-4xl {
    font-size: var(--font-size-3xl);
    line-height: var(--line-height-3xl);
  }

  .w-12 {
    width: 2.5rem;
    height: 2.5rem;
  }

  .p-8 {
    padding: 1.5rem;
  }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .animate-fade-in {
    animation: none;
    opacity: 1;
    transform: none;
  }

  .transition-all {
    transition: none;
  }
}
</style>
