<template>
  <nav
    class="bg-gradient-to-r from-primary-50 to-secondary-100 dark:from-primary-950 dark:to-secondary-900 border-b border-primary-200 dark:border-primary-800 sticky top-0 w-full z-30 shadow-lg transition-all duration-300 animate-fade-in"
    role="navigation"
    aria-label="القائمة الرئيسية"
  >
    <div class="container mx-auto flex items-center justify-between px-4 py-4">
      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-2" aria-label="الصفحة الرئيسية">
        <div class="relative p-1 rounded-full bg-gradient-to-r from-success-400 to-primary-400">
          <img
            :src="images.logo"
            alt="شعار المنصة"
            class="h-10 w-10 object-contain"
            loading="lazy"
            @error="handleImageError"
          />
          <div
            class="absolute inset-0 bg-neutrals-white dark:bg-neutrals-950 opacity-20 rounded-full shine-effect"
          ></div>
        </div>
        <span class="text-2xl font-bold text-primary-800 dark:text-primary-100">
          {{ appName || 'ESY' }}
        </span>
      </router-link>

      <!-- Mobile Menu Toggle -->
      <button
        @click="toggleMenu"
        class="md:hidden text-secondary-700 dark:text-secondary-200 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg p-2"
        aria-label="تبديل القائمة"
        :aria-expanded="isMenuOpen"
      >
        <i
          :class="[
            'pi',
            isMenuOpen ? 'pi-times' : 'pi-bars',
            'text-2xl transition-transform duration-300',
          ]"
        ></i>
      </button>

      <!-- Menu Items -->
      <div
        :class="[
          'md:flex md:flex-row md:items-center md:gap-6',
          isMenuOpen
            ? 'flex flex-col absolute top-full left-0 w-full bg-neutrals-white dark:bg-secondary-900 shadow-lg md:shadow-none md:static md:bg-transparent md:dark:bg-transparent p-4 md:p-0'
            : 'hidden',
          'transition-all duration-300',
        ]"
      >
        <router-link
          v-for="(item, index) in Object.values(menuItemsObj)"
          :key="item.id"
          :to="item.route"
          class="flex items-center gap-2 text-secondary-700 dark:text-secondary-200 hover:text-primary-300 dark:hover:text-primary-300 font-semibold p-2 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500"
          :class="[
            $route.path === item.route
              ? 'bg-primary-500 text-white dark:bg-primary-400 dark:text-neutrals-100'
              : '',
            isMenuOpen ? 'animate-slide-in' : '',
          ]"
          :style="{ animationDelay: `${index * 100}ms` }"
          :aria-current="$route.path === item.route ? 'page' : null"
        >
          <img
            :src="item.icon"
            :alt="`${item.label} أيقونة`"
            class="w-6 h-6 object-contain rounded-full shadow-sm transition-transform duration-300 hover:scale-110"
            loading="lazy"
            @error="handleIconError(item.id)"
          />
          <span>{{ item.label }}</span>
        </router-link>
      </div>

      <!-- Sign In Button -->
      <div v-if="!isLogin">
        <Button
          label="الدخول"
          class="bg-gradient-to-r from-primary-500 to-success-500 hover:from-primary-600 hover:to-success-600 dark:from-primary-400 dark:to-success-400 dark:hover:from-primary-500 dark:hover:to-success-500 text-neutrals-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500"
          @click="$router.push('/sign-in')"
          aria-label="تسجيل الدخول"
        />
      </div>

      <div v-else>
        <Button
          type="button"
          @click="toggle"
          rounded
          aria-haspopup="true"
          aria-controls="overlay_menu"
          class="flex items-center gap-2 text-secondary-700 dark:text-secondary-200 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-full p-2"
        >
          <span class="hidden md:inline-block">{{ userInitials }}</span>
        </Button>
        <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
      </div>
    </div>
  </nav>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import useImages from '@/helpers/images.helper'
import { useAuthStore } from '@/stores/Auth/auth.store'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()
const authStore = computed(() => useAuthStore())
const isLogin = computed(() => authStore.value?.isLogin)
const images = useImages()
const logo = ref('https://fakeimg.pl/100x100/4ecf6a/ffffff?text=شعار&font=noto')
const isMenuOpen = ref(false)
const appName = ref('ESY')

const userInitials = computed(() => {
  if (isLogin.value) {
    return authStore.value?.record?.user_name.slice(0, 2).toUpperCase()
  }
  return 'US' // Fallback initials
})
// Router links as object with colorful FakeImg.pl icons
const menuItemsObj = ref({
  plan: {
    id: 'm1',
    route: '/plan',
    label: 'خطتي',
    icon: 'https://fakeimg.pl/50x50/ff6b6b/ffffff?text=خطة&font=noto', // Red for planning
  },
  questions: {
    id: 'm2',
    route: '/questions',
    label: 'بنك الأسئلة',
    icon: 'https://fakeimg.pl/50x50/4b89ff/ffffff?text=أسئلة&font=noto', // Blue for questions
  },
  models: {
    id: 'm3',
    route: '/models',
    label: 'نماذج',
    icon: 'https://fakeimg.pl/50x50/2ecc71/ffffff?text=نماذج&font=noto', // Green for models
  },
})

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const handleImageError = () => {
  logo.value = 'https://fakeimg.pl/100x100/cccccc/ffffff?text=بديل&font=noto'
}

const handleIconError = (id) => {
  menuItemsObj.value[id].icon = 'https://fakeimg.pl/50x50/cccccc/ffffff?text=بديل&font=noto'
}

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
    label: 'تسجيل الخروج',
    icon: 'pi pi-sign-out',
    command: () => {
      authStore.value.logout()
    },
  },
])

const toggle = (event) => {
  menu.value.toggle(event)
}

onMounted(() => {
  if (authStore.value?.isLogin) {
    authStore.value?.getProfile()
  }
})
</script>

<style scoped>
.rtl {
  direction: rtl;
  text-align: right;
  font-family: var(--font-family-sans);
}

/* Fade-in animation for navbar */
.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
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

/* Shine effect for logo */
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
@media (max-width: 768px) {
  .text-2xl {
    font-size: var(--font-size-xl);
    line-height: var(--line-height-xl);
  }
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
