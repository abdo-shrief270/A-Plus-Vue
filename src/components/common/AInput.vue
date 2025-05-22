<template>
  <label class="block w-full">
    <div class="mb-2 font-medium flex items-center gap-2">
      <slot name="icon" />
      <p class="capitalize text-black text-sm">{{ $t(label) }}</p>
      <span v-if="required" class="text-red-500">*</span>
    </div>
    <InputText
      v-model="computedValue"
      class="w-full border border-secondary-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary rounded-lg placeholder:text-secondary-200 placeholder:text-sm"
      :type="type"
      :placeholder="$t(placeholder)"
      :invalid="error"
      @blur="emit('blur')"
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
  </label>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number, Object, null],
    required: true
  },
  type: {
    type: String,
    default: 'text'
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
    default: ''
  }
});

const computedValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const emit = defineEmits(['update:modelValue', 'blur']);
</script>

<style scoped></style>
