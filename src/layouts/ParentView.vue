<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useImages from '@/helpers/images.helper'
import { useAuthStore } from '@/stores/Auth/auth.store'

const authStore = useAuthStore()
const images = useImages()
const router = useRouter()
const route = useRoute()

const navItems = ref([
  {
    label: 'الصفحة الرئيسية',
    icon: 'pi pi-home',
    to: '/dashboard',
  },
  {
    label: 'كورسات',
    icon: 'pi pi-book',
    to: '/courses',
  },
  {
    label: 'إدارة الطلاب',
    icon: 'pi pi-users',
    to: '/students',
  },
  {
    label: 'شحن رصيد',
    icon: 'pi pi-credit-card',
    to: '/recharge',
  },
  {
    label: 'الإعدادات',
    icon: 'pi pi-cog',
    to: '/parent-settings',
  },
  {
    label: 'خروج',
    icon: 'pi pi-sign-out',
    action: () => {
      authStore.logout()
    },
  },
])
</script>

<template>
  <div class="flex">
    <!-- Sidebar -->
    <aside
      class="w-64 bg-teal-800 text-white flex flex-col justify-between py-6 min-h-dvh relative"
    >
      <div class="sticky top-10 w-full">
        <!-- Logo -->
        <div class="flex flex-col items-center space-y-4">
          <img :src="images.logo" class="w-12 h-12" alt="Logo" />
        </div>

        <!-- Navigation -->
        <nav class="mt-8 space-y-2 px-4 flex-1">
          <template v-for="(item, i) in navItems" :key="i">
            <button
              class="cursor-pointer"
              @click="item.action ? item.action() : router.push(item.to)"
              :class="[
                'w-full flex items-center gap-3 py-2 px-3 rounded-md text-white hover:bg-teal-700 transition',
                route.path === item.to ? 'bg-teal-700' : '',
              ]"
            >
              <i :class="item.icon" class="text-lg"></i>
              <span class="text-sm">{{ item.label }}</span>
            </button>
          </template>
        </nav>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-4">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
/* Optional: custom active style */
.bg-teal-700 {
  background-color: #0f766e !important;
}
</style>
