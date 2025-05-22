<template>
  <div>
    <div class="mb-2 font-medium flex items-center gap-2">
      <slot name="icon" />
      <p class="capitalize text-black text-sm">{{ $t(label) }}</p>
      <span v-if="required" class="text-red-500">*</span>
    </div>
    <MultiSelect
      v-model="selected"
      :options="options"
      :placeholder="$t(placeholder)"
      :loading="loading"
      :invalid="error"
      showClear
      optionLabel="name"
      class="min-w-xs"
      @blur="emit('blur')"
      @update:modelValue="(val) => emit('update:modelValue', val)"
    />
    <Message
      v-if="error && errorMessage"
      icon="pi pi-exclamation-circle"
      severity="error"
      variant="simple"
      class="w-full block mt-2"
    >
      {{ $t(errorMessage) }}
    </Message>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number, Object, null],
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: { type: String, default: '' },
  required: {
    type: Boolean,
    default: false
  },
  error: {
    type: Boolean,
    default: false
  },
  errorMessage: {
    type: String,
    default: 'This input has an error'
  }
});

const selected = ref(props.modelValue);
const emit = defineEmits(['update:modelValue', 'blur']);
</script>
