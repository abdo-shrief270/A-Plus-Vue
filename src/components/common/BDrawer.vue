<template>
  <div>
    <slot name="button" :toggleModal="toggleModal"></slot>

    <Drawer
      v-model:visible="visible"
      modal
      position="right"
      :pt="{
        header: {
          class: 'bg-neutral-200 !py-2 !px-4'
        },
        content: {
          class: '!py-2 !px-4'
        },
        footer: {
          class: '!py-2 !px-4'
        },
        root: {
          class: '!w-full !max-w-md'
        }
      }"
    >
      <template #header>
        <h3 class="text-lg font-bold">
          {{ $t(title) }}
        </h3>
      </template>

      <slot name="content" :toggleModal="toggleModal"></slot>

      <template #footer>
        <div class="flex items-center justify-end gap-2">
          <b-button
            label="global.actions.cancel"
            variant="outlined"
            @click="toggleModal"
          />
          <slot name="confirm" :toggleModal="toggleModal"></slot>
        </div>
      </template>
    </Drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  title: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue']);

const visible = ref(false);

const toggleModal = () => {
  visible.value = !visible.value;
  emit('update:modelValue', visible.value); // Emit the new value
};
</script>
