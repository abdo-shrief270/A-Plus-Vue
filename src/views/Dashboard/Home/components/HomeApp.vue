<template>
  <section
    class="relative bg-primary-500 text-neutrals-white py-12 px-4 lg:px-8 overflow-hidden animate-fade-in"
    role="region"
    aria-label="تنزيل التطبيق"
  >
    <!-- Background Accent -->
    <div
      class="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 opacity-20 z-0"
    ></div>

    <!-- Content Container -->
    <div
      class="container mx-auto flex flex-col lg:flex-row items-center justify-between relative z-10"
    >
      <!-- Phone Mockup -->
      <div
        class="w-full lg:w-1/2 flex justify-center mb-8 lg:mb-0 animate-fade-in"
        style="animation-delay: 200ms"
      >
        <div
          class="relative p-4 rounded-2xl bg-gradient-to-r from-success-400 to-primary-400 shadow-xl"
        >
          <div
            class="bg-neutrals-white dark:bg-secondary-900 p-2 rounded-xl overflow-hidden relative"
          >
            <div
              class="absolute inset-0 bg-neutrals-white dark:bg-neutrals-950 opacity-20 shine-effect"
            ></div>
            <img
              :src="images.homeHeroBg"
              alt="شاشة تطبيق تعليمي"
              class="w-64 h-auto object-contain shadow-md rounded-lg"
              loading="lazy"
              @error="handleImageError('phoneScreen')"
            />
          </div>
        </div>
      </div>

      <!-- Text and Download Options -->
      <div
        class="w-full lg:w-1/2 text-center lg:text-right animate-fade-in"
        style="animation-delay: 400ms"
      >
        <h2 class="text-3xl lg:text-4xl font-bold mb-4">حمل تطبيقنا الآن</h2>
        <p class="text-lg mb-6 max-w-md mx-auto lg:mx-0">
          استمتع بتجربة تعليمية متميزة! قم بتنزيل التطبيق للوصول إلى كل المزايا بسهولة.
        </p>
        <div class="flex flex-col lg:flex-row items-center gap-4">
          <a
            href="#"
            class="bg-neutrals-white text-primary-500 font-semibold py-2 px-4 rounded-lg hover:bg-neutrals-200 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="تنزيل من App Store"
            @click.prevent="downloadApp('App Store')"
          >
            <i class="pi pi-apple mr-2"></i> App Store
          </a>
          <a
            href="#"
            class="bg-neutrals-white text-primary-500 font-semibold py-2 px-4 rounded-lg hover:bg-neutrals-200 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="تنزيل من Google Play"
            @click.prevent="downloadApp('Google Play')"
          >
            <i class="pi pi-google mr-2"></i> Google Play
          </a>
          <div class="relative group">
            <img
              :src="images.homeHeroBg"
              alt="رمز QR لتنزيل التطبيق"
              class="w-16 h-16 object-contain cursor-pointer transition-transform duration-300 hover:scale-110 shadow-md rounded-lg"
              loading="lazy"
              @error="handleImageError('qrCode')"
              @click="showQrModal = true"
              aria-label="عرض رمز QR للتنزيل"
            />
            <div
              v-if="showQrModal"
              class="fixed inset-0 bg-primary opacity-90 bg-opacity-50 flex items-center justify-center z-50"
              @click.self="showQrModal = false"
            >
              <div
                class="bg-neutrals-white dark:bg-secondary-900 p-6 rounded-lg shadow-lg"
                @click.stop
              >
                <img
                  :src="images.homeHeroBg"
                  alt="رمز QR للتنزيل الكبير"
                  class="w-64 h-64 object-contain shadow-md rounded-lg"
                />
                <button
                  class="mt-4 text-primary-500 hover:text-primary-700 font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg px-4 py-2"
                  @click="showQrModal = false"
                  aria-label="إغلاق رمز QR"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import useImages from '@/helpers/images.helper'

const images = useImages()
// Fake images using FakeImg.pl
const phoneScreen = ref('https://fakeimg.pl/300x600/4ecf6a/ffffff?text=تطبيق&font=noto')
const qrCode = ref('https://fakeimg.pl/150x150/4ecf6a/ffffff?text=QR&font=noto')
const showQrModal = ref(false)

const handleImageError = (key) => {
  if (key === 'phoneScreen') {
    phoneScreen.value = 'https://fakeimg.pl/300x600/cccccc/ffffff?text=بديل&font=noto'
  } else if (key === 'qrCode') {
    qrCode.value = 'https://fakeimg.pl/150x150/cccccc/ffffff?text=بديل&font=noto'
  }
}

const downloadApp = (store) => {
  console.log(`Download from ${store} clicked`)
  // Add logic for app store navigation
}
</script>

<style scoped>
.rtl {
  direction: rtl;
  text-align: right;
  font-family: var(--font-family-sans);
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

/* Shine effect for phone */
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
@media (max-width: 1024px) {
  .text-3xl {
    font-size: var(--font-size-2xl);
    line-height: var(--line-height-2xl);
  }
  .text-lg {
    font-size: var(--font-size-base);
    line-height: var(--line-height-base);
  }
  .w-64 {
    width: 48px;
    height: 48px;
  }
}

@media (max-width: 768px) {
  .w-16 {
    width: 48px;
    height: 48px;
  }
}
</style>
