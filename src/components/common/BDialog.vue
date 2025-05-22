<template>
  <div>
    <slot name="button" :toggleModal="toggleModal"></slot>
    <Dialog
      v-model:visible="visible"
      dismissableMask
      modal
      :draggable="false"
      append-to="body"
      :pt="{
        header: {
          class: 'bg-neutral-200 !py-2 !px-4'
        },
        content: {
          class: '!py-2 !px-4 !w-full'
        },
        footer: {
          class: '!py-2 !px-4'
        },
        root: {
          class: 'overflow-hidden min-w-xl max-w-2xl'
        }
      }"
    >
      <template #header>
        <h3 class="text-lg font-bold">
          {{ $t(title) }}
        </h3>
      </template>
      <template #default>
        <slot name="content" :toggleModal="toggleModal"></slot>
      </template>
      <template v-if="Object.keys($slots).includes('confirm')" #footer>
        <div class="flex items-center justify-end gap-2">
          <b-button
            label="global.actions.cancel"
            variant="outlined"
            @click="toggleModal"
            class=""
          />
          <slot name="confirm" :toggleModal="toggleModal"></slot>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  title: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['update:modelValue']);

const visible = ref(false);
const toggleModal = () => {
  visible.value = !visible.value;
  emit('update:modelValue', visible.value); // Emit the new value
  return visible.value;
};

defineExpose({ toggleModal });
</script>
