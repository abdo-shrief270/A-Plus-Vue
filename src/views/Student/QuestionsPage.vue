<template>
  <div
    class="min-h-screen bg-gradient-to-br from-primary-50 via-indigo-50 to-primary-50 p-4 lg:p-8"
    dir="rtl"
  >
    <!-- Hero Section -->
    <div class="text-center mb-12">
      <div class="inline-flex items-center gap-3 mb-6"></div>
      <p class="text-gray-600 text-lg lg:text-xl mx-auto font-medium leading-relaxed">
        اكتشف مجموعة واسعة من الأسئلة المصممة خصيصاً لتحسين مستواك الأكاديمي وتحضيرك للامتحانات
      </p>
    </div>

    <!-- Loading State -->
    <div
      v-if="loading || !dataItems || dataItems.length === 0"
      class="flex flex-col items-center justify-center py-24"
      role="status"
      :aria-label="loading ? 'جاري التحميل' : 'لا توجد بيانات'"
    >
      <div class="relative">
        <ProgressSpinner
          v-if="loading"
          class="mb-6"
          strokeWidth="3"
          style="width: 60px; height: 60px"
          aria-label="مؤشر التحميل"
        />
        <div
          v-else
          class="w-20 h-20 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full flex items-center justify-center mb-6"
        >
          <i class="pi pi-inbox text-white text-2xl" aria-hidden="true"></i>
        </div>
      </div>
      <h2 class="text-2xl font-bold text-gray-700 mb-2">
        {{
          loading
            ? 'جاري التحميل...'
            : `لا توجد ${dataType === 'subjects' ? 'مواد' : 'أقسام'} متاحة`
        }}
      </h2>
      <p class="text-gray-500 text-lg">
        {{
          loading
            ? 'نقوم بتحضير المحتوى لك'
            : `سيتم إضافة ${dataType === 'subjects' ? 'مواد' : 'أقسام'} جديدة قريباً`
        }}
      </p>
    </div>

    <!-- Main Content -->
    <div v-else-if="dataItems && dataItems.length > 0" class="container mx-auto">
      <!-- Progress Indicator -->
      <div class="flex justify-center mb-8" v-if="dataItems.length > 1">
        <div
          class="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-lg border border-gray-200"
        >
          <i class="pi pi-chart-line text-primary-600" aria-hidden="true"></i>
          <span class="font-semibold text-gray-700">
            {{ currentProgress }} من {{ dataItems.length }}
            {{ dataType === 'subjects' ? 'مادة' : 'قسم' }}
          </span>
          <div class="w-20 h-2 bg-gray-200 rounded-full ml-2">
            <div
              class="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-500"
              :style="`width: ${progressPercentage}%`"
            ></div>
          </div>
        </div>
      </div>

      <!-- Enhanced Tabs with Keyboard Navigation -->
      <div v-if="dataItems.length > 1" class="mb-12">
        <div class="flex justify-center">
          <div class="bg-white p-2 rounded-2xl shadow-xl border border-gray-200 inline-block">
            <div
              class="flex gap-2 overflow-x-auto scrollbar-hide w-max"
              role="tablist"
              :aria-label="`قائمة ${dataType === 'subjects' ? 'المواد' : 'الأقسام'}`"
            >
              <button
                v-for="(item, index) in dataItems"
                :key="`tab-${item.id}`"
                :class="[
                  'flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer border-0 outline-none',
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                    : 'bg-transparent text-gray-600 hover:bg-gray-50 hover:text-primary-600',
                ]"
                :aria-selected="activeTab === item.id"
                :aria-controls="`panel-${item.id}`"
                :id="`tab-${item.id}`"
                role="tab"
                @click="setActiveTab(item.id)"
                @keydown.enter.space.prevent="setActiveTab(item.id)"
                @keydown.arrow-right.prevent="focusNextTab(index)"
                @keydown.arrow-left.prevent="focusPrevTab(index)"
              >
                <span class="text-2xl" aria-hidden="true">{{ getSectionIcon(item.name) }}</span>
                <span>{{ item.name }}</span>
                <Badge
                  v-if="item.categories && item.categories.length > 0"
                  :value="item.categories.length"
                  :class="activeTab === item.id ? 'bg-white/20' : 'bg-primary-100 text-primary-600'"
                  class="text-xs"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Stats with Animation -->
      <div v-if="activeItem" class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <!-- Active Item Categories -->
        <div
          class="group relative overflow-hidden bg-white rounded-3xl p-8 shadow-xl transition-all duration-500 transform"
        >
          <div
            class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-400/20 to-primary-600/20 rounded-full -translate-y-16 translate-x-16"
          ></div>
          <div class="relative">
            <div class="flex items-center justify-between mb-4">
              <div
                class="p-4 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl shadow-lg"
              >
                <i class="pi pi-list text-white text-2xl" aria-hidden="true"></i>
              </div>
              <div class="text-right">
                <div
                  class="text-4xl font-bold text-gray-800 mb-1 counter"
                  :data-target="activeItem.categories?.length || 0"
                >
                  {{ animatedCurrentCategories }}
                </div>
                <div class="text-primary-600 font-semibold text-lg">الفئات المتاحة</div>
              </div>
            </div>
            <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                class="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full transition-all duration-1000"
                :style="`width: ${Math.min(100, (activeItem.categories?.length || 0) * 20)}%`"
              ></div>
            </div>
          </div>
        </div>

        <!-- Total Categories with Pulse Effect -->
        <div class="group relative overflow-hidden bg-white rounded-3xl p-8 shadow-xl">
          <div
            class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-full -translate-y-16 translate-x-16"
          ></div>
          <div class="relative">
            <div class="flex items-center justify-between mb-4">
              <div class="p-4 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-lg">
                <i class="pi pi-th-large text-white text-2xl" aria-hidden="true"></i>
              </div>
              <div class="text-right">
                <div class="text-4xl font-bold text-gray-800 mb-1">
                  {{ animatedTotalCategories }}
                </div>
                <div class="text-green-600 font-semibold text-lg">إجمالي الفئات</div>
              </div>
            </div>
            <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                class="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-1000"
                :style="`width: ${Math.min(100, (totalCategories / 10) * 100)}%`"
              ></div>
            </div>
          </div>
        </div>

        <!-- Active Items -->
        <div
          class="group relative overflow-hidden bg-white rounded-3xl p-8 shadow-xl transition-all duration-500 transform"
        >
          <div
            class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-purple-600/20 rounded-full -translate-y-16 translate-x-16"
          ></div>
          <div class="relative">
            <div class="flex items-center justify-between mb-4">
              <div
                class="p-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl shadow-lg transition-transform duration-300"
              >
                <i class="pi pi-check-circle text-white text-2xl" aria-hidden="true"></i>
              </div>
              <div class="text-right">
                <div class="text-4xl font-bold text-gray-800 mb-1">{{ animatedActiveItems }}</div>
                <div class="text-purple-600 font-semibold text-lg">
                  {{ dataType === 'subjects' ? 'المواد' : 'الأقسام' }} النشطة
                </div>
              </div>
            </div>
            <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                class="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full transition-all duration-1000"
                :style="`width: ${dataItems.length > 0 ? (activeItems / dataItems.length) * 100 : 0}%`"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Active Section Content -->
      <div
        v-if="activeItem"
        class="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 mb-12"
        :id="`panel-${activeItem.id}`"
        role="tabpanel"
        :aria-labelledby="`tab-${activeItem.id}`"
      >
        <!-- Header with Better Gradients -->
        <div
          class="relative p-12 text-center overflow-hidden"
          :class="
            activeItem.categories && activeItem.categories.length > 0
              ? 'bg-gradient-to-br from-primary-500 via-primary-500 to-pink-600'
              : 'bg-gradient-to-br from-gray-400 to-gray-500'
          "
        >
          <div class="absolute inset-0 bg-black/10"></div>
          <div
            class="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20 animate-float"
          ></div>
          <div
            class="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16 animate-float-reverse"
          ></div>

          <div class="relative z-10">
            <div class="text-8xl mb-6 transform hover:scale-110 transition-transform duration-500">
              {{ getSectionIcon(activeItem.name) }}
            </div>
            <h2 class="text-4xl font-black text-white mb-4">{{ activeItem.name }}</h2>
            <div
              class="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full"
            >
              <i class="pi pi-bookmark text-white/90" aria-hidden="true"></i>
              <span class="text-white font-semibold text-lg">
                {{ activeItem.categories?.length || 0 }} فئة متاحة
              </span>
            </div>
          </div>
        </div>

        <!-- Enhanced Categories Content -->
        <div class="p-8">
          <div v-if="activeItem.categories && activeItem.categories.length > 0">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-2xl font-bold text-gray-800">الفئات المتاحة</h3>
              <div class="flex items-center gap-2">
                <Button
                  icon="pi pi-th-large"
                  :class="
                    viewMode === 'grid' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600'
                  "
                  @click="viewMode = 'grid'"
                  size="small"
                  rounded
                  aria-label="عرض شبكي"
                />
                <Button
                  icon="pi pi-list"
                  :class="
                    viewMode === 'list' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600'
                  "
                  @click="viewMode = 'list'"
                  size="small"
                  rounded
                  aria-label="عرض قائمة"
                />
              </div>
            </div>

            <!-- Search and Filter -->
            <div class="mb-6">
              <div class="relative">
                <InputText
                  v-model="searchQuery"
                  placeholder="البحث في الفئات..."
                  class="w-full pr-10 py-3 rounded-xl border-gray-200 focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
            </div>

            <!-- Categories Grid/List -->
            <TransitionGroup
              :name="viewMode === 'grid' ? 'grid-items' : 'list-items'"
              tag="div"
              :class="viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' : 'space-y-4'"
            >
              <div
                v-for="category in filteredCategories"
                :key="category.id"
                :class="[
                  'group/item relative shadow-lg bg-white rounded-2xl p-6 cursor-pointer transition-all duration-300 border border-gray-200 ',
                  viewMode === 'list' ? 'flex items-center' : '',
                ]"
                @click="selectCategory(activeItem, category)"
                @keydown.enter.space.prevent="selectCategory(activeItem, category)"
                tabindex="0"
                role="button"
                :aria-label="`اختيار فئة ${category.name}`"
              >
                <div
                  :class="
                    viewMode === 'list'
                      ? 'flex-1 flex items-center gap-4'
                      : 'flex items-start justify-between'
                  "
                >
                  <div class="flex-1">
                    <div
                      :class="
                        viewMode === 'list'
                          ? 'flex items-center gap-3'
                          : 'flex items-center gap-3 mb-3'
                      "
                    >
                      <div
                        class="p-3 bg-gradient-to-r from-primary-400 to-indigo-500 rounded-xl shadow-sm group-hover/item:shadow-md transition-all duration-200"
                      >
                        <i class="pi pi-file-edit text-white text-lg" aria-hidden="true"></i>
                      </div>
                      <h4
                        class="text-xl font-bold text-gray-800 group-hover/item:text-primary-600 transition-colors duration-200"
                      >
                        {{ category.name }}
                      </h4>
                    </div>
                    <p
                      :class="[
                        'text-gray-600 leading-relaxed line-clamp-2',
                        viewMode === 'list' ? 'mb-2' : 'mb-4',
                      ]"
                    >
                      {{ category.description }}
                    </p>
                    <div class="flex items-center gap-4 text-sm text-gray-500">
                      <div class="flex items-center gap-1">
                        <i class="pi pi-calendar" aria-hidden="true"></i>
                        <span>{{ formatDate(category.created_at) }}</span>
                      </div>
                      <div class="flex items-center gap-1">
                        <i class="pi pi-tag" aria-hidden="true"></i>
                        <span>{{ activeItem.name }}</span>
                      </div>
                    </div>
                  </div>
                  <div
                    :class="[
                      'opacity-0 group-hover/item:opacity-100 transition-opacity duration-200',
                      viewMode === 'list' ? 'ml-4' : 'mr-4',
                    ]"
                  >
                    <div
                      class="p-3 bg-gradient-to-r from-primary-500 to-indigo-500 rounded-xl shadow-lg"
                    >
                      <i class="pi pi-arrow-left text-white text-lg" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </TransitionGroup>
          </div>

          <!-- Enhanced Empty State -->
          <div v-else class="text-center py-16">
            <div class="mb-6">
              <div
                class="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-soft"
              >
                <i class="pi pi-inbox text-gray-400 text-3xl" aria-hidden="true"></i>
              </div>
            </div>
            <h3 class="text-2xl font-bold text-gray-600 mb-3">
              {{ dataType === 'subjects' ? 'المادة' : 'القسم' }} {{ activeItem.name }} فارغ
            </h3>
            <p class="text-gray-500 mb-8 max-w-md mx-auto">
              لم يتم إضافة أي فئات {{ dataType === 'subjects' ? 'لهذه المادة' : 'لهذا القسم' }} حتى
              الآن. ستكون متاحة قريباً!
            </p>
            <Button
              label="إشعارني عند الإضافة"
              icon="pi pi-bell"
              class="bg-gradient-to-r from-gray-400 to-gray-500 border-0 px-8 py-3 text-white font-semibold rounded-xl hover:from-gray-500 hover:to-gray-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              @click="notifyWhenAvailable(activeItem)"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Toast with better positioning -->

    <!-- Accessibility Skip Link -->
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:right-4 bg-primary-600 text-white px-4 py-2 rounded-lg"
    >
      تخطي إلى المحتوى الرئيسي
    </a>
  </div>
</template>

<script setup>
import { useCategoriesStore } from '@/stores/Categories/getCategories.store'
import { computed, ref, watch } from 'vue'
import { onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
// PrimeVue Components
import Button from 'primevue/button'
import Badge from 'primevue/badge'
import InputText from 'primevue/inputtext'
import ProgressSpinner from 'primevue/progressspinner'

const router = useRouter()
const categoriesStore = useCategoriesStore()
const toast = useToast()
const activeTab = ref(null)
const isComponentMounted = ref(false)
const toastKey = ref(0)
const viewMode = ref('grid') // 'grid' or 'list'
const searchQuery = ref('')

// Animation refs
const animatedCurrentCategories = ref(0)
const animatedTotalCategories = ref(0)
const animatedActiveItems = ref(0)

// Use store's loading state
const loading = computed(() => categoriesStore.uiFlags.isCreating)

const getCategories = async () => {
  if (!isComponentMounted.value || loading.value) return

  try {
    await categoriesStore.getCategories()
    console.log('Store data:', categoriesStore.getCategoriesData)
    console.log('Data items:', dataItems.value)
    console.log('Data type:', dataType.value)
  } catch (error) {
    console.error('Error loading categories:', error)
    toast.add({
      severity: 'error',
      summary: 'خطأ',
      detail: 'حدث خطأ في تحميل البيانات',
      life: 5000,
    })
  }
}

// Data processing
const dataItems = computed(() => {
  const data = categoriesStore.getCategoriesData

  if (data && data.data) {
    if (data.data.subjects && Array.isArray(data.data.subjects)) {
      return data.data.subjects
    } else if (data.data.sections && Array.isArray(data.data.sections)) {
      return data.data.sections
    }
  }

  if (data && data.subjects && Array.isArray(data.subjects)) {
    return data.subjects
  }
  if (data && data.sections && Array.isArray(data.sections)) {
    return data.sections
  }

  if (Array.isArray(data)) {
    return data
  }

  return []
})

const dataType = computed(() => {
  const data = categoriesStore.getCategoriesData

  if (data && data.data) {
    if (data.data.subjects && Array.isArray(data.data.subjects)) {
      return 'subjects'
    }
  }

  if (data && data.subjects && Array.isArray(data.subjects)) {
    return 'subjects'
  }

  return 'sections'
})

// Progress tracking
const currentProgress = computed(() => {
  if (!activeTab.value || !dataItems.value.length) return 1
  const index = dataItems.value.findIndex((item) => item.id === activeTab.value)
  return index + 1
})

const progressPercentage = computed(() => {
  return ((currentProgress.value - 1) / Math.max(1, dataItems.value.length - 1)) * 100
})

// Active item and calculations
const activeItem = computed(() => {
  if (!activeTab.value || !dataItems.value.length) return null
  return dataItems.value.find((item) => item.id === activeTab.value)
})

const totalCategories = computed(() => {
  if (!dataItems.value || !Array.isArray(dataItems.value)) {
    return 0
  }
  return dataItems.value.reduce((total, item) => {
    return total + (item?.categories?.length || 0)
  }, 0)
})

const activeItems = computed(() => {
  if (!dataItems.value || !Array.isArray(dataItems.value)) {
    return 0
  }
  return dataItems.value.filter(
    (item) => item?.categories && Array.isArray(item.categories) && item.categories.length > 0,
  ).length
})

// Filtered categories for search
const filteredCategories = computed(() => {
  if (!activeItem.value?.categories) return []

  if (!searchQuery.value.trim()) {
    return activeItem.value.categories
  }

  return activeItem.value.categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

// Tab navigation functions
const setActiveTab = (id) => {
  console.log('Setting active tab to:', id)
  activeTab.value = id
  toastKey.value++
  searchQuery.value = '' // Reset search when changing tabs
}

const focusNextTab = (currentIndex) => {
  const nextIndex = (currentIndex + 1) % dataItems.value.length
  const nextTab = document.getElementById(`tab-${dataItems.value[nextIndex].id}`)
  nextTab?.focus()
}

const focusPrevTab = (currentIndex) => {
  const prevIndex = (currentIndex - 1 + dataItems.value.length) % dataItems.value.length
  const prevTab = document.getElementById(`tab-${dataItems.value[prevIndex].id}`)
  prevTab?.focus()
}

// Animation functions
const animateCounter = (ref, target, duration = 1000) => {
  const start = ref.value
  const increment = (target - start) / (duration / 16)

  const animate = () => {
    ref.value = Math.min(Math.ceil(ref.value + increment), target)
    if (ref.value < target) {
      requestAnimationFrame(animate)
    }
  }

  requestAnimationFrame(animate)
}

// Watch for changes to animate counters
watch(
  activeItem,
  (newItem) => {
    if (newItem) {
      animateCounter(animatedCurrentCategories, newItem.categories?.length || 0)
    }
  },
  { immediate: true },
)

watch(
  totalCategories,
  (newTotal) => {
    animateCounter(animatedTotalCategories, newTotal)
  },
  { immediate: true },
)

watch(
  activeItems,
  (newActive) => {
    animateCounter(animatedActiveItems, newActive)
  },
  { immediate: true },
)

// Watch for data changes to set initial active tab
watch(
  dataItems,
  (newItems) => {
    if (newItems.length > 0 && !activeTab.value) {
      activeTab.value = newItems[0].id
    }
  },
  { immediate: true },
)

// Icon mapping
const getSectionIcon = (itemName) => {
  const icons = {
    كمي: '🔢',
    لفظي: '📚',
    منطق: '🧠',
    علوم: '🔬',
    رياضيات: '📐',
    فيزياء: '⚛️',
    كيمياء: '🧪',
    أحياء: '🧬',
    التاريخ: '📜',
    الجغرافيا: '🌍',
    الإنجليزية: '🇺🇸',
    العربية: '📖',
  }
  return icons[itemName] || (dataType.value === 'subjects' ? '📚' : '📋')
}

// Date formatting
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const selectCategory = async (item, category) => {
  // Navigate to details page with all needed data
  await router.push({
    name: 'question-details',
    params: { id: category.id },
    query: {
      section: item.id,
      sectionName: item.name,
      categoryName: category.name,
      type: dataType.value,
    },
  })
}
const notifyWhenAvailable = (item) => {
  toast.add({
    severity: 'info',
    summary: 'تم التسجيل',
    detail: `ستتلقى إشعاراً عند إضافة فئات جديدة ${dataType.value === 'subjects' ? 'لمادة' : 'لقسم'} "${item.name}"`,
    life: 4000,
  })
}

onMounted(() => {
  isComponentMounted.value = true
  getCategories()
})
</script>

<style scoped>
/* Enhanced animations */
@keyframes pulse-soft {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-10px) rotate(5deg);
  }
}

@keyframes float-reverse {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(10px) rotate(-5deg);
  }
}

.animate-pulse-soft {
  animation: pulse-soft 3s ease-in-out infinite;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-reverse {
  animation: float-reverse 8s ease-in-out infinite;
}

/* Transition groups */
.grid-items-enter-active,
.list-items-enter-active {
  transition: all 0.5s ease;
}

.grid-items-enter-from,
.list-items-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.grid-items-leave-active,
.list-items-leave-active {
  transition: all 0.3s ease;
}

.grid-items-leave-to,
.list-items-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

/* Accessibility */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.focus\:not-sr-only:focus {
  position: static;
  width: auto;
  height: auto;
  padding: 0.5rem 1rem;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
}

/* Existing styles */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

button[class*='from-primary-500'] {
  background: linear-gradient(to right, var(--color-primary), var(--color-primary-700)) !important;
  color: white !important;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
  transform: scale(1.05) !important;
}

button[class*='bg-transparent'] {
  background: transparent !important;
  color: rgb(75 85 99) !important;
}

button[class*='bg-transparent']:hover {
  background: rgb(249 250 251) !important;
  color: rgb(59 130 246) !important;
}

.transition-all {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}

/* RTL adjustments */
[dir='rtl'] .mr-4 {
  margin-right: 1rem;
  margin-left: unset;
}

[dir='rtl'] .ml-2 {
  margin-left: unset;
  margin-right: 0.5rem;
}

[dir='rtl'] .ml-4 {
  margin-left: unset;
  margin-right: 1rem;
}

/* Responsive */
@media (max-width: 768px) {
  .text-4xl {
    font-size: 2.25rem;
  }
  .text-6xl {
    font-size: 2.5rem;
  }
  .text-8xl {
    font-size: 4rem;
  }
}
</style>
