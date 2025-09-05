<template>
  <div class="min-h-screen bg-gray-50 p-6" dir="rtl">
    <!-- Header Section -->
    <div class="container mx-auto">
      <!-- Welcome Message -->
      <div class="text-right mb-8">
        <h1 class="text-2xl font-semibold text-gray-800 mb-4">مرحبا بعودتك ياعبد الرحمن</h1>

        <div class="mb-2">
          <h2 class="text-xl font-bold text-gray-900">اقتراحات التعلم القادمة</h2>
        </div>
        <p class="text-gray-600 text-sm">استنادا الى عمليات الذكي هنا</p>
      </div>

      <!-- Main Course Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-8">
        <div
          v-for="course in mainCourses"
          :key="course.id"
          class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
        >
          <div class="h-32 overflow-hidden">
            <img :src="course.image" :alt="course.imageAlt" class="w-full h-full object-cover" />
          </div>
          <div class="p-4">
            <h3 class="font-semibold text-gray-900 mb-2 text-sm">{{ course.title }}</h3>
            <p class="text-xs text-gray-600 mb-3 leading-relaxed">{{ course.description }}</p>
            <div class="flex items-center mb-3">
              <div class="flex">
                <i
                  v-for="star in 5"
                  :key="star"
                  :class="
                    star <= course.rating
                      ? 'pi pi-star-fill text-yellow-400'
                      : 'pi pi-star text-gray-300'
                  "
                  class="text-xs"
                ></i>
              </div>
              <span class="text-xs text-gray-500 mr-2">{{ course.rating }}.0</span>
            </div>
            <div class="flex items-center justify-between">
              <div class="text-left">
                <span class="text-sm font-bold text-gray-900">{{ course.price }}</span>
                <span class="text-xs text-gray-500 mr-1">ريال</span>
              </div>
              <span class="text-xs text-gray-500">شهريا</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Section -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-0 mb-12 bg-primary my-30">
        <div
          v-for="stat in statsData"
          :key="stat.id"
          class="text-white p-6 text-center flex flex-col items-center"
        >
          <div class="w-8 h-8 mb-3 bg-white rounded-full flex items-center justify-center">
            <i :class="stat.icon" class="text-2xl text-primary"></i>
          </div>
          <div class="text-sm font-medium mb-1">{{ stat.description }}</div>
          <div class="text-lg font-bold">{{ stat.value }}</div>
        </div>
      </div>

      <!-- Other Courses Section -->
      <div class="mb-8">
        <h2 class="text-xl font-bold text-gray-900 mb-2">اقتراحات لدورات أخرى</h2>
        <p class="text-gray-600 text-sm mb-6">
          اختر من بين هذه الدورات المقترحة لمواصلة بناء خبرتك وتطوير نفسك
        </p>
      </div>

      <!-- Additional Courses Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-12">
        <div
          v-for="course in additionalCourses"
          :key="course.id"
          class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
        >
          <div class="h-32 overflow-hidden">
            <img :src="course.image" :alt="course.imageAlt" class="w-full h-full object-cover" />
          </div>
          <div class="p-4">
            <h3 class="font-semibold text-gray-900 mb-2 text-sm">{{ course.title }}</h3>
            <p class="text-xs text-gray-600 mb-3 leading-relaxed">{{ course.description }}</p>
            <div class="flex items-center mb-3">
              <div class="flex">
                <i
                  v-for="star in 5"
                  :key="star"
                  :class="
                    star <= course.rating
                      ? 'pi pi-star-fill text-yellow-400'
                      : 'pi pi-star text-gray-300'
                  "
                  class="text-xs"
                ></i>
              </div>
              <span class="text-xs text-gray-500 mr-2">{{ course.rating }}.0</span>
            </div>
            <div class="flex items-center justify-between">
              <div class="text-left">
                <span class="text-sm font-bold text-gray-900">{{ course.price }}</span>
                <span class="text-xs text-gray-500 mr-1">ريال</span>
              </div>
              <span class="text-xs text-gray-500">شهريا</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Main courses data
const mainCourses = ref([
  {
    id: 1,
    title: 'مسارك العلمي في الكيمياء',
    description: 'تجربة دراسة منهجية للمبتدئ على العلم في دراسة الكيمياء',
    image:
      'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=200&fit=crop&crop=center',
    imageAlt: 'Chemistry laboratory with beakers and molecular structures',
    rating: 3,
    price: 250,
  },
  {
    id: 2,
    title: 'العناصر الحاسوبية الأساسية',
    description: 'فيما تشمل تعليم العناصر وبرنامج إدارتها بشكل على عمليات التحليل والتوصيل',
    image:
      'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=200&fit=crop&crop=center',
    imageAlt: 'Computer circuit board and electronic components',
    rating: 3,
    price: 250,
  },
  {
    id: 3,
    title: 'رحلتك في عالم الكيمياء',
    description: 'فيما يشمل مع إجراء واستكشاف العمليات الكيميائية في البيئة المحيطة',
    image:
      'https://images.unsplash.com/photo-1554475901-4538ddfbccc2?w=400&h=200&fit=crop&crop=center',
    imageAlt: 'Molecular structure and chemical bonds visualization',
    rating: 3,
    price: 250,
  },
  {
    id: 4,
    title: 'أساسيات الكيمياء',
    description: 'تتيح الوصول الوأدوات والمعلومات الكيميائية بشكل منطقي',
    image:
      'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400&h=200&fit=crop&crop=center',
    imageAlt: 'Laboratory equipment and scientific research',
    rating: 3,
    price: 250,
  },
  {
    id: 5,
    title: 'تجربة المستخدم وواجهة المستخدم',
    description: 'أساسيات تصميم تجربة وواجهة المستخدم من العلم على الواقعية',
    image:
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=200&fit=crop&crop=center',
    imageAlt: 'UX/UI design workspace with sketches and tools',
    rating: 4,
    price: 200,
  },
  {
    id: 6,
    title: 'واجهة المستخدم',
    description: 'أساسيات تصميم واجهة المستخدم من العلم على الواقعية',
    image:
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=200&fit=crop&crop=center',
    imageAlt: 'Social media and app interface icons',
    rating: 4,
    price: 250,
  },
  {
    id: 7,
    title: 'تجربة المستخدم وواجهة المستخدم',
    description: 'أساسيات تصميم تجربة وواجهة المستخدم من العلم على الواقعية',
    image:
      'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=400&h=200&fit=crop&crop=center',
    imageAlt: 'Designer working on laptop with UI mockups',
    rating: 4,
    price: 200,
  },
  {
    id: 8,
    title: 'تجربة المستخدم وواجهة المستخدم',
    description: 'أساسيات تصميم تجربة وواجهة المستخدم من العلم على الواقعية',
    image:
      'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=200&fit=crop&crop=center',
    imageAlt: 'UX design process with wireframes and prototypes',
    rating: 4,
    price: 200,
  },
])

// Additional courses data
const additionalCourses = ref([
  {
    id: 9,
    title: 'إتقان اللغة بطلاقة',
    description: 'تعريف اللغة الإنجليزية بطريقة تفاعلية ومتطابقة وحقيقة كاملة في الكتابة',
    image:
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=200&fit=crop&crop=center',
    imageAlt: 'English language learning with books and text',
    rating: 4,
    price: 270,
  },
  {
    id: 10,
    title: 'الطاقة والطاقة وانتاجها بطريقة عملية',
    description:
      'الذي يمكنك الطاقة والطاقة في البيانات الى تعلم نجمة محورية الإنتاج من اجتماعات للموضوع',
    image:
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=200&fit=crop&crop=center',
    imageAlt: 'Energy and data visualization with colorful waves',
    rating: 4,
    price: 250,
  },
  {
    id: 11,
    title: 'أساسيات الفيزياء',
    description: 'فيما يشمل التعرف على قوانين الطبيعة والفيزياء واتعمل النظريات الأساسية',
    image:
      'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&h=200&fit=crop&crop=center',
    imageAlt: "Newton's cradle physics demonstration pendulum",
    rating: 4,
    price: 250,
  },
  {
    id: 12,
    title: 'أساسيات اللغة الانجليزية',
    description: 'طور مهاراتك في اللغة إنجليزية للمبتدئين الى الأساسيات من اللغة الانجليزية',
    image:
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=200&fit=crop&crop=center',
    imageAlt: 'English alphabet ABC with books and blackboard',
    rating: 4,
    price: 220,
  },
])

// Stats data with PrimeVue icons
const statsData = ref([
  {
    id: 1,
    icon: 'pi pi-star',
    description: 'بلغ متوسط تقييمات الطلاب حول الدورات',
    value: '4.4 نجمة',
  },
  {
    id: 2,
    icon: 'pi pi-users',
    description: 'اكثر من 2300 طالب وطالبة درسين في هذه',
    value: 'الدورات التعليمية',
  },
  {
    id: 3,
    icon: 'pi pi-chart-bar',
    description: 'اكثر من 150 دورة تعليمية في مختلف',
    value: 'مختلفة',
  },
])
</script>

<style scoped>
/* Custom styles for RTL layout */
.grid {
  gap: 1.5rem;
}
</style>
