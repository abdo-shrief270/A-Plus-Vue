<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
    <div class="text-center max-w-lg">
      <!-- 404 Number -->
      <h1 class="text-9xl font-bold text-[#017DC0]">404</h1>

      <!-- Error Message -->
      <h2 class="text-3xl font-semibold mt-4 text-gray-800">Page Not Found</h2>
      <p class="text-gray-600 mt-4 text-lg">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>

      <!-- Illustration -->
      <div class="my-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 200"
          class="w-full max-w-md mx-auto"
        >
          <path
            fill="#017DC0"
            opacity="0.2"
            d="M90,150 C30,180 30,110 90,140 L410,140 C470,110 470,180 410,150 L90,150 Z"
          />
          <circle cx="250" cy="110" r="30" fill="#017DC0" opacity="0.6" />
          <path fill="#017DC0" d="M250,80 L240,60 L260,60 Z" />
          <path
            fill="none"
            stroke="#017DC0"
            stroke-width="4"
            stroke-linecap="round"
            stroke-dasharray="5,10"
            d="M250,30 C270,40 290,20 310,30"
          />
          <path
            fill="none"
            stroke="#017DC0"
            stroke-width="4"
            stroke-linecap="round"
            stroke-dasharray="5,10"
            d="M250,30 C230,40 210,20 190,30"
          />
        </svg>
      </div>

      <!-- Home Button -->
      <router-link to="/">
        <Button
          label="Back to Home"
          class="bg-[#017DC0] border-[#017DC0] hover:bg-[#0169a3] focus:shadow-[#017DC0]/50"
          icon="pi pi-home"
        />
      </router-link>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
/* Any additional component-specific styles */
</style>
