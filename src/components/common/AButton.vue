<template>
  <Button
    :size="size"
    :severity="severity"
    :variant="variant"
    :disabled="disabled || loading"
    :loading="loading"
    :type="type"
    :label="$t(label)"
    class="w-full font-bold rounded-lg text-sm relative"
    :icon="icon"
    @click="($event) => emit('click', $event)"
  >
  </Button>
</template>

<script setup>
const emit = defineEmits(['click']);

defineProps({
  label: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'primary'
  },
  severity: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'small'
  }
});
</script>
