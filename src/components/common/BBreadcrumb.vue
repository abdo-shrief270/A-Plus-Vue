<template>
  <div class="w-full mb-4 border-b border-secondary-300">
    <Breadcrumb :model="items">
      <template #item="{ item, props }">
        <router-link
          v-if="item.to"
          v-slot="{ href, navigate }"
          :to="item.to"
          custom
        >
          <a :href="href" v-bind="props.action" @click="navigate">
            <span class="text-black font-semibold">{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else :href="item.url" :target="item.target" v-bind="props.action">
          <span class="text-surface-700 dark:text-surface-0">
            {{ item.label }}
          </span>
        </a>
      </template>
    </Breadcrumb>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => []
  }
});
</script>
