<template>
  <div
    class="grid grid-cols-6 justify-between gap-4 grow bg-gradient-to-t from-white/90 to-primary-50 backdrop-blur-sm shadow-2xl overflow-hidden relative"
  >
    <img
      src="../assets/images/rrreflection.svg"
      class="absolute top-0 w-full opacity-5 z-[-1]"
      alt=""
    />

    <div class="col-span-6 lg:col-span-6">
      <router-view />
    </div>
  </div>
</template>

<script setup></script>
