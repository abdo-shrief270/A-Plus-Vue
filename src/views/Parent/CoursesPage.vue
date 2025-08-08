<template>
  <div dir="rtl" class="min-h-screen bg-gray-50 p-6 font-[Tajawal]">
    <!-- Header Section -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-3xl font-bold text-gray-800 mb-2">الكورسات المتاحة</h1>
          <p class="text-gray-600">اكتشف مجموعة واسعة من الكورسات التعليمية</p>
        </div>
      </div>

      <!-- Search Bar -->
      <div class="flex items-center gap-4 mb-6">
        <div class="relative flex-1 max-w-md">
          <InputText
            v-model="searchQuery"
            placeholder="بحث"
            class="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-all duration-300"
          />
          <i
            class="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          ></i>
        </div>
        <Button
          icon="pi pi-filter"
          label="تصفية"
          class="p-button-outlined p-button-secondary"
          @click="showFilters = !showFilters"
        />
        <Dropdown
          v-model="selectedCategory"
          :options="categories"
          optionLabel="label"
          placeholder="جميع الفئات"
          class="w-48"
        />
      </div>
    </div>

    <!-- Filters Panel -->
    <div v-if="showFilters" class="mb-6 p-4 bg-white rounded-xl shadow-sm border">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">المستوى</label>
          <Dropdown
            v-model="selectedLevel"
            :options="levels"
            optionLabel="label"
            placeholder="جميع المستويات"
            class="w-full"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">السعر</label>
          <Dropdown
            v-model="selectedPriceRange"
            :options="priceRanges"
            optionLabel="label"
            placeholder="جميع الأسعار"
            class="w-full"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">التقييم</label>
          <Dropdown
            v-model="selectedRating"
            :options="ratings"
            optionLabel="label"
            placeholder="جميع التقييمات"
            class="w-full"
          />
        </div>
        <div class="flex items-end">
          <Button label="إعادة تعيين" class="p-button-outlined w-full" @click="resetFilters" />
        </div>
      </div>
    </div>

    <!-- Course Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <Card
        v-for="course in filteredCourses"
        :key="course.id"
        class="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border-0 rounded-2xl overflow-hidden"
        @click="viewCourse(course)"
      >
        <template #header>
          <div class="relative">
            <img :src="course.image" :alt="course.title" class="w-full h-48 object-cover" />
            <div class="absolute top-3 right-3">
              <Tag
                :value="course.category"
                :severity="getCategorySeverity(course.category)"
                class="px-3 py-1 text-xs font-semibold"
              />
            </div>
            <div class="absolute top-3 left-3 shadow-lg rounded-full">
              <Button
                icon="pi pi-heart"
                class="p-button-rounded p-button-text p-button-sm bg-white bg-opacity-80 text-gray-600 hover:text-red-500"
                @click.stop="toggleFavorite(course)"
              />
            </div>
          </div>
        </template>
        <template #content>
          <div class="p-4">
            <h3 class="text-lg font-bold text-gray-800 mb-2 line-clamp-1">
              {{ course.title }}
            </h3>
            <p class="text-sm text-gray-600 mb-3 line-clamp-1">
              {{ course.description }}
            </p>

            <!-- Rating -->
            <div class="flex items-center gap-2 mb-3">
              <Rating v-model="course.rating" :readonly="true" :stars="5" class="text-sm" />
              <span class="text-sm text-gray-500">({{ course.reviewCount }})</span>
            </div>

            <!-- Price and Students -->
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-lg font-bold text-blue-600">{{ course.price }} ريال</span>
                <span v-if="course.originalPrice" class="text-sm text-gray-400 line-through">
                  {{ course.originalPrice }} ريال
                </span>
              </div>
              <div class="flex items-center gap-1 text-sm text-gray-500">
                <i class="pi pi-users text-xs"></i>
                <span>{{ course.studentsCount }}</span>
              </div>
            </div>

            <!-- Instructor -->
            <div class="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
              <Avatar :image="course.instructor.avatar" class="w-6 h-6" shape="circle" />
              <span class="text-sm text-gray-600">{{ course.instructor.name }}</span>
            </div>
          </div>
        </template>
        <template #footer>
          <div class="p-4 pt-0">
            <Button
              label="عرض التفاصيل"
              class="w-full p-button-outlined"
              @click.stop="viewCourse(course)"
            />
          </div>
        </template>
      </Card>
    </div>

    <!-- Load More Button -->
    <div class="flex justify-center mt-8" v-if="hasMoreCourses">
      <Button
        label="تحميل المزيد"
        icon="pi pi-refresh"
        class="p-button-outlined p-button-lg"
        @click="loadMoreCourses"
        :loading="loadingMore"
      />
    </div>

    <!-- Course Details Dialog -->
    <Dialog
      v-model:visible="showCourseDetails"
      modal
      :header="selectedCourse?.title"
      :style="{ width: '800px' }"
      dir="rtl"
    >
      <div v-if="selectedCourse" class="space-y-4">
        <img
          :src="selectedCourse.image"
          :alt="selectedCourse.title"
          class="w-full h-64 object-cover rounded-lg"
        />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 class="font-bold text-lg mb-2">تفاصيل الكورس</h4>
            <p class="text-gray-600 mb-4">{{ selectedCourse.fullDescription }}</p>

            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <i class="pi pi-clock text-blue-600"></i>
                <span class="text-sm">المدة: {{ selectedCourse.duration }}</span>
              </div>
              <div class="flex items-center gap-2">
                <i class="pi pi-users text-green-600"></i>
                <span class="text-sm">عدد الطلاب: {{ selectedCourse.studentsCount }}</span>
              </div>
              <div class="flex items-center gap-2">
                <i class="pi pi-star text-yellow-500"></i>
                <span class="text-sm">التقييم: {{ selectedCourse.rating }}/5</span>
              </div>
            </div>
          </div>
          <div>
            <h4 class="font-bold text-lg mb-2">المدرب</h4>
            <div class="flex items-center gap-3 mb-4">
              <Avatar :image="selectedCourse.instructor.avatar" class="w-12 h-12" shape="circle" />
              <div>
                <p class="font-semibold">{{ selectedCourse.instructor.name }}</p>
                <p class="text-sm text-gray-600">{{ selectedCourse.instructor.title }}</p>
              </div>
            </div>

            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="flex items-center justify-between mb-2">
                <span class="text-2xl font-bold text-blue-600"
                  >{{ selectedCourse.price }} ريال</span
                >
                <span
                  v-if="selectedCourse.originalPrice"
                  class="text-lg text-gray-400 line-through"
                >
                  {{ selectedCourse.originalPrice }} ريال
                </span>
              </div>
              <Button
                label="التسجيل في الكورس"
                class="w-full p-button-success p-button-lg"
                @click="enrollCourse(selectedCourse)"
              />
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Reactive data
const searchQuery = ref('')
const showFilters = ref(false)
const selectedCategory = ref(null)
const selectedLevel = ref(null)
const selectedPriceRange = ref(null)
const selectedRating = ref(null)
const showCourseDetails = ref(false)
const selectedCourse = ref(null)
const loadingMore = ref(false)
const hasMoreCourses = ref(true)

// Filter options
const categories = ref([
  { label: 'جميع الفئات', value: null },
  { label: 'أساسيات الفيزياء', value: 'physics' },
  { label: 'أساسيات الجبر', value: 'algebra' },
  { label: 'أساسيات الكيمياء', value: 'chemistry' },
  { label: 'تجربة المستخدم', value: 'ux' },
  { label: 'اللغة الإنجليزية', value: 'english' },
])

const levels = ref([
  { label: 'جميع المستويات', value: null },
  { label: 'مبتدئ', value: 'beginner' },
  { label: 'متوسط', value: 'intermediate' },
  { label: 'متقدم', value: 'advanced' },
])

const priceRanges = ref([
  { label: 'جميع الأسعار', value: null },
  { label: 'مجاني', value: 'free' },
  { label: '1-100 ريال', value: '1-100' },
  { label: '101-250 ريال', value: '101-250' },
  { label: '251-500 ريال', value: '251-500' },
])

const ratings = ref([
  { label: 'جميع التقييمات', value: null },
  { label: '4 نجوم فأكثر', value: '4+' },
  { label: '3 نجوم فأكثر', value: '3+' },
  { label: '2 نجوم فأكثر', value: '2+' },
])

// Sample courses data
const courses = ref([
  {
    id: 1,
    title: 'أساسيات الفيزياء',
    description: 'تعلم المبادئ الأساسية للفيزياء والقوانين الطبيعية',
    fullDescription:
      'كورس شامل يغطي جميع أساسيات الفيزياء من الميكانيكا إلى الكهرباء والمغناطيسية. مناسب للمبتدئين والطلاب الذين يريدون تقوية أساسياتهم في الفيزياء.',
    image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&h=300&fit=crop',
    category: 'physics',
    level: 'beginner',
    price: 250,
    originalPrice: 300,
    rating: 4.5,
    reviewCount: 128,
    studentsCount: 250,
    duration: '8 أسابيع',
    instructor: {
      name: 'د. أحمد محمد',
      title: 'أستاذ الفيزياء',
      avatar: 'https://via.placeholder.com/40',
    },
  },
  {
    id: 2,
    title: 'أساسيات الجبر',
    description: 'تعلم الرياضيات والمعادلات الجبرية من الأساسيات',
    fullDescription:
      'كورس متكامل في الجبر يبدأ من الأساسيات وصولاً إلى المعادلات المعقدة. يشمل تطبيقات عملية وحلول للمسائل.',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=300&fit=crop',
    category: 'algebra',
    level: 'intermediate',
    price: 150,
    originalPrice: 200,
    rating: 4.2,
    reviewCount: 95,
    studentsCount: 150,
    duration: '6 أسابيع',
    instructor: {
      name: 'أ. سارة أحمد',
      title: 'مدرسة الرياضيات',
      avatar: 'https://via.placeholder.com/40',
    },
  },
  {
    id: 3,
    title: 'أساسيات الكيمياء',
    description: 'اكتشف عالم الكيمياء والتفاعلات الكيميائية',
    fullDescription:
      'رحلة شيقة في عالم الكيمياء تشمل التفاعلات الكيميائية، الجدول الدوري، والتجارب العملية.',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=300&fit=crop',
    category: 'chemistry',
    level: 'beginner',
    price: 250,
    originalPrice: 300,
    rating: 4.7,
    reviewCount: 156,
    studentsCount: 200,
    duration: '10 أسابيع',
    instructor: {
      name: 'د. محمد علي',
      title: 'أستاذ الكيمياء',
      avatar: 'https://via.placeholder.com/40',
    },
  },
  {
    id: 4,
    title: 'تجربة المستخدم واجهة المستخدم',
    description: 'تعلم تصميم واجهات المستخدم وتحسين تجربة المستخدم',
    fullDescription:
      'كورس شامل في UX/UI Design يغطي أساسيات التصميم، أدوات التصميم، وكيفية إنشاء تجارب مستخدم مميزة.',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=300&fit=crop',
    category: 'ux',
    level: 'intermediate',
    price: 200,
    originalPrice: 250,
    rating: 4.6,
    reviewCount: 89,
    studentsCount: 180,
    duration: '12 أسبوع',
    instructor: {
      name: 'م. فاطمة حسن',
      title: 'مصممة UX/UI',
      avatar: 'https://via.placeholder.com/40',
    },
  },
  {
    id: 5,
    title: 'أساسيات اللغة الإنجليزية',
    description: 'تعلم اللغة الإنجليزية من الصفر حتى الاحتراف',
    fullDescription:
      'برنامج متكامل لتعلم اللغة الإنجليزية يشمل القواعد، المحادثة، والكتابة مع تطبيقات عملية.',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
    category: 'english',
    level: 'beginner',
    price: 180,
    originalPrice: 220,
    rating: 4.4,
    reviewCount: 203,
    studentsCount: 320,
    duration: '16 أسبوع',
    instructor: {
      name: 'أ. نورا سالم',
      title: 'مدرسة اللغة الإنجليزية',
      avatar: 'https://via.placeholder.com/40',
    },
  },
  {
    id: 6,
    title: 'البرمجة الأساسية',
    description: 'تعلم أساسيات البرمجة وحل المشاكل',
    fullDescription:
      'مقدمة شاملة في عالم البرمجة تشمل المفاهيم الأساسية، الخوارزميات، وحل المشاكل البرمجية.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
    category: 'programming',
    level: 'beginner',
    price: 300,
    originalPrice: 350,
    rating: 4.8,
    reviewCount: 167,
    studentsCount: 280,
    duration: '14 أسبوع',
    instructor: {
      name: 'م. خالد أحمد',
      title: 'مطور برمجيات',
      avatar: 'https://via.placeholder.com/40',
    },
  },
  {
    id: 7,
    title: 'التسويق الرقمي',
    description: 'تعلم استراتيجيات التسويق الرقمي الحديثة',
    fullDescription:
      'كورس متقدم في التسويق الرقمي يغطي وسائل التواصل الاجتماعي، الإعلانات المدفوعة، وتحليل البيانات.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    category: 'marketing',
    level: 'advanced',
    price: 400,
    originalPrice: 500,
    rating: 4.3,
    reviewCount: 92,
    studentsCount: 150,
    duration: '10 أسابيع',
    instructor: {
      name: 'أ. ليلى محمد',
      title: 'خبيرة التسويق الرقمي',
      avatar: 'https://via.placeholder.com/40',
    },
  },
  {
    id: 8,
    title: 'التصوير الفوتوغرافي',
    description: 'تعلم فن التصوير الفوتوغرافي الاحترافي',
    fullDescription:
      'رحلة إبداعية في عالم التصوير تشمل التقنيات الأساسية، التركيب، والإضاءة مع تطبيقات عملية.',
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
    category: 'photography',
    level: 'intermediate',
    price: 220,
    originalPrice: 280,
    rating: 4.5,
    reviewCount: 134,
    studentsCount: 190,
    duration: '8 أسابيع',
    instructor: {
      name: 'أ. عمر حسن',
      title: 'مصور محترف',
      avatar: 'https://via.placeholder.com/40',
    },
  },
])

// Computed properties
const filteredCourses = computed(() => {
  let filtered = courses.value

  // Search filter
  if (searchQuery.value) {
    filtered = filtered.filter(
      (course) =>
        course.title.includes(searchQuery.value) || course.description.includes(searchQuery.value),
    )
  }

  // Category filter
  if (selectedCategory.value?.value) {
    filtered = filtered.filter((course) => course.category === selectedCategory.value.value)
  }

  // Level filter
  if (selectedLevel.value?.value) {
    filtered = filtered.filter((course) => course.level === selectedLevel.value.value)
  }

  // Price filter
  if (selectedPriceRange.value?.value) {
    const range = selectedPriceRange.value.value
    if (range === 'free') {
      filtered = filtered.filter((course) => course.price === 0)
    } else if (range.includes('-')) {
      const [min, max] = range.split('-').map(Number)
      filtered = filtered.filter((course) => course.price >= min && course.price <= max)
    }
  }

  // Rating filter
  if (selectedRating.value?.value) {
    const minRating = parseInt(selectedRating.value.value)
    filtered = filtered.filter((course) => course.rating >= minRating)
  }

  return filtered
})

// Methods
const getCategorySeverity = (category) => {
  const severityMap = {
    physics: 'info',
    algebra: 'warning',
    chemistry: 'success',
    ux: 'secondary',
    english: 'danger',
    programming: 'info',
    marketing: 'warning',
    photography: 'success',
  }
  return severityMap[category] || 'info'
}

const toggleFavorite = (course) => {
  course.isFavorite = !course.isFavorite
  console.log('تم تغيير حالة المفضلة للكورس:', course.title)
}

const viewCourse = (course) => {
  selectedCourse.value = course
  showCourseDetails.value = true
}

const enrollCourse = (course) => {
  console.log('التسجيل في الكورس:', course.title)
  showCourseDetails.value = false
  // Here you would typically handle the enrollment process
}

const loadMoreCourses = () => {
  loadingMore.value = true
  // Simulate loading more courses
  setTimeout(() => {
    loadingMore.value = false
    hasMoreCourses.value = false // For demo purposes
  }, 1500)
}

const resetFilters = () => {
  selectedCategory.value = null
  selectedLevel.value = null
  selectedPriceRange.value = null
  selectedRating.value = null
  searchQuery.value = ''
}

onMounted(() => {
  console.log('صفحة الكورسات محملة بنجاح')
})
</script>

<style scoped>
/* Custom styles */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom card hover effects */
.p-card:hover {
  transform: translateY(-4px);
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Custom rating styles */
.p-rating .p-rating-icon {
  color: #fbbf24;
}

/* RTL specific styles */
[dir='rtl'] .p-datatable .p-datatable-thead > tr > th {
  text-align: right;
}

[dir='rtl'] .p-datatable .p-datatable-tbody > tr > td {
  text-align: right;
}

/* Custom button styles */
.p-button {
  font-family: 'Tajawal', sans-serif;
}

/* Enhanced card styles */
.p-card {
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid #e5e7eb;
}

.p-card .p-card-header {
  padding: 0;
}

.p-card .p-card-content {
  padding: 0;
}

.p-card .p-card-footer {
  padding: 0;
}

/* Custom tag styles */
.p-tag {
  border-radius: 0.5rem;
}

/* Custom dialog styles */
.p-dialog .p-dialog-header {
  font-family: 'Tajawal', sans-serif;
}

.p-dialog .p-dialog-content {
  font-family: 'Tajawal', sans-serif;
}
</style>
