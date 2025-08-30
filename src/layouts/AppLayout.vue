<template>
  <div class="bg-gradient-to-b from-white/90 to-primary-50 backdrop-blur-2xl">
    <div v-if="user !== 'parent'" class="">
      <e-nav-bar />
      <RouterView />
      <e-footer />
    </div>
    <div v-else class="h-dvh">
      <ParentView />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ParentView from './ParentView.vue'
const user = ref(null)
if (window.$cookies.isKey('aplus-userType')) {
  user.value = window.$cookies.get('aplus-userType')
}
</script>
