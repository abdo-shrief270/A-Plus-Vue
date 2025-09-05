<template>
  <nav
    class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 w-full z-30 shadow-md"
    role="navigation"
    aria-label="القائمة الرئيسية"
  >
    <div class="container mx-auto flex items-center justify-between px-6 py-3">
      <!-- User Menu / Sign In -->
      <div class="flex items-center">
        <div v-if="!isLogin">
          <Button
            label="تسجيل الدخول"
            icon="pi pi-user"
            class="bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 font-medium py-2 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            @click="$router.push('/sign-in')"
            aria-label="تسجيل الدخول"
          />
        </div>

        <div v-else class="relative">
          <Button
            type="button"
            @click="toggle"
            class="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 font-medium py-2 px-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-haspopup="true"
            aria-controls="overlay_menu"
          >
            <i class="pi pi-user text-sm"></i>
            <span class="text-sm">حساب</span>
            <i class="pi pi-chevron-down text-xs"></i>
          </Button>
          <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
        </div>
      </div>

      <!-- Mobile Menu Toggle -->
      <button
        @click="toggleMenu"
        class="md:hidden text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg p-2"
        aria-label="تبديل القائمة"
        :aria-expanded="isMenuOpen"
      >
        <i
          :class="[
            'pi',
            isMenuOpen ? 'pi-times' : 'pi-bars',
            'text-xl transition-transform duration-300',
          ]"
        ></i>
      </button>

      <!-- Menu Items -->
      <div
        :class="[
          'md:flex md:flex-row md:items-center md:gap-8',
          isMenuOpen
            ? 'flex flex-col absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-lg md:shadow-none md:static md:bg-transparent md:dark:bg-transparent p-4 md:p-0'
            : 'hidden',
          'transition-all duration-300',
        ]"
      >
        <router-link
          v-for="(item, index) in validMenuItems"
          :key="item.id"
          :to="item.route"
          class="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 font-medium p-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          :class="[
            $route.path === item.route ? 'text-primary-500 dark:text-primary-400' : '',
            isMenuOpen ? 'animate-slide-in' : '',
          ]"
          :style="{ animationDelay: `${index * 100}ms` }"
          :aria-current="$route.path === item.route ? 'page' : null"
        >
          <i :class="item.icon" class="text-lg"></i>
          <span>{{ item.label }}</span>
        </router-link>
      </div>

      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-2" aria-label="الصفحة الرئيسية">
        <img :src="images.logo" alt="" class="h-12 w-12" />
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useAuthStore } from '@/stores/Auth/auth.store'
import { useRouter } from 'vue-router'
import useImages from '@/helpers/images.helper'

const images = useImages()
const router = useRouter()
const authStore = computed(() => useAuthStore())
const isLogin = computed(() => authStore.value?.isLogin)

const isMenuOpen = ref(false)

// Updated menu items with icons similar to the image
const menuItemsObj = ref({
  plan: {
    id: 'plan',
    route: '/plan',
    label: 'خطتي',
    icon: 'pi pi-calendar', // Calendar icon for planning
  },
  questions: {
    id: 'exams',
    route: '/exams',
    label: 'بنك الأسئلة',
    icon: 'pi pi-question-circle', // Question icon for question bank
  },
  courses: {
    id: 'courses',
    route: '/courses',
    label: 'الدورات',
    icon: 'pi pi-book', // Book icon for courses
  },
  contestants: {
    id: 'contestants',
    route: '/contestants',
    label: 'المتصدرين',
    icon: 'pi pi-trophy', // Trophy icon for top performers
  },
})

// Computed property to ensure menu items are always valid
const validMenuItems = computed(() => {
  return Object.values(menuItemsObj.value).filter(
    (item) => item && typeof item === 'object' && item.id && item.route && item.label,
  )
})

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

// Menu items for user dropdown
const menu = ref()
const items = ref([
  {
    label: 'الملف الشخصي',
    icon: 'pi pi-user',
    command: () => {
      router.push('/profile')
    },
  },
  {
    separator: true,
  },
  {
    label: 'تسجيل الخروج',
    icon: 'pi pi-sign-out',
    command: () => {
      authStore.value.logout()
    },
  },
])

const toggle = (event) => {
  try {
    if (menu.value && typeof menu.value.toggle === 'function') {
      menu.value.toggle(event)
    }
  } catch (error) {
    console.error('Error toggling menu:', error)
  }
}

onMounted(() => {
  try {
    if (authStore.value?.isLogin) {
      authStore.value?.getProfile()
    }
  } catch (error) {
    console.error('Error in onMounted:', error)
  }
})
</script>

<style scoped>
.rtl {
  direction: rtl;
  text-align: right;
  font-family: var(--font-family-sans);
}

/* Slide-in animation for mobile menu items */
.animate-slide-in {
  animation: slideIn 0.3s ease-out forwards;
}

@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateX(20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

/* Custom button styling to match the design */
.p-button {
  border-radius: 0.5rem;
  font-weight: 500;
}

/* Menu item hover effects */
a:hover i {
  transform: scale(1.1);
  transition: transform 0.2s ease;
}
</style>
