<template>
  <nav class="bg-white border-b border-gray-200 shadow-sm">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- قسم ملف المستخدم -->
        <div class="hidden md:block" v-if="authStore.isLogin">
          <div class="mr-4 flex items-center md:mr-6">
            <!-- قائمة المستخدم -->
            <div class="relative">
              <Button
                @click="toggle"
                class="flex items-center space-x-2 rtl:space-x-reverse text-sm rounded-full"
                text
              >
                <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <i class="pi pi-user text-gray-600"></i>
                </div>
                <span class="text-gray-700 font-medium">حسابي</span>
                <i class="pi pi-chevron-down text-gray-400 text-xs"></i>
              </Button>

              <Menu
                ref="menu"
                id="user_menu"
                :model="userMenuItems"
                :popup="true"
                class="mt-2 w-48"
              />
            </div>
          </div>
        </div>
        <div v-else class="flex items-center gap-4">
          <router-link
            to="/sign-in"
            class="text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg px-4 py-2 transition-colors duration-200 shadow-sm"
          >
            تسجيل الدخول
          </router-link>
          <router-link
            to="/sign-up"
            class="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors duration-200"
          >
            فتح حساب
          </router-link>
        </div>

        <!-- قائمة التنقل -->
        <div class="hidden md:block">
          <div class="mr-10 flex items-baseline gap-6 rtl:space-x-reverse">
            <!-- عناصر القائمة -->
            <router-link
              v-for="item in menuItems"
              :key="item.label"
              :to="item.to"
              class="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              :class="{
                'text-primary-600 bg-primary-50': $route.path === item.to,
                'text-gray-600 hover:text-primary-600': $route.path !== item.to,
              }"
            >
              {{ item.label }}
            </router-link>
          </div>
        </div>

        <!-- قسم الشعار -->
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="flex items-center space-x-2 rtl:space-x-reverse">
              <!-- أيقونة الشعار -->
              <router-link to="/" class="w-12 h-full flex items-center justify-center">
                <img :src="images.logo" alt="" />
              </router-link>
            </div>
          </div>
        </div>

        <!-- زر قائمة الجوال -->
        <div class="md:hidden">
          <Button
            @click="toggleMobileMenu"
            icon="pi pi-bars"
            text
            class="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          />
        </div>
      </div>
    </div>

    <!-- قائمة الجوال -->
    <div v-show="mobileMenuOpen" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 border-t border-gray-200">
        <router-link
          v-for="item in menuItems"
          :key="item.label"
          :to="item.to"
          class="block px-3 py-2 rounded-md text-base font-medium w-full text-right"
          :class="{
            'text-blue-600 bg-blue-50': $route.path === item.to,
            'text-gray-600 hover:text-blue-600': $route.path !== item.to,
          }"
        >
          {{ item.label }}
        </router-link>
      </div>

      <!-- قسم مستخدم الجوال -->
      <div class="pt-4 pb-3 border-t border-gray-200 bg-gray-50">
        <div class="flex items-center px-5">
          <div class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <i class="pi pi-user text-gray-600"></i>
          </div>
          <div class="mr-3 rtl:ml-3 rtl:mr-0">
            <div class="text-base font-medium text-gray-800">حسابي</div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import Button from 'primevue/button'
import Menu from 'primevue/menu'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/Auth/auth.store'
import useImages from '@/helpers/images.helper'

const images = useImages()
const authStore = useAuthStore()
const router = useRouter()
// البيانات التفاعلية
const mobileMenuOpen = ref(false)
const menu = ref()

// عناصر قائمة التنقل
const menuItems = ref([
  { label: 'خطتي', to: '/plan' },
  { label: 'بنك الأسئلة', to: '/questions' },
  { label: 'مراجعة', to: '/review' },
  { label: 'المتصدرين', to: '/leaderboard' },
])

// عناصر قائمة المستخدم
const userMenuItems = ref([
  {
    label: 'الملف الشخصي',
    icon: 'pi pi-user',
    command: () => {
      ProfilePage()
    },
  },
  {
    label: 'الإعدادات',
    icon: 'pi pi-cog',
    command: () => {
      // التعامل مع التنقل إلى الإعدادات
      console.log('الانتقال إلى الإعدادات')
    },
  },
  {
    separator: true,
  },
  {
    label: 'تسجيل الخروج',
    icon: 'pi pi-sign-out',
    command: () => {
      // التعامل مع تسجيل الخروج
      console.log('تسجيل الخروج')
    },
  },
])

const ProfilePage = () => {
  router.push('/profile')
}

// الدوال
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const toggle = (event) => {
  menu.value.toggle(event)
}
</script>
