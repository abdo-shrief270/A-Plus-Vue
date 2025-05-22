<template>
  <label class="block w-full">
    <div class="mb-2 font-medium flex items-center gap-2">
      <component :is="PasswordIcon" />

      <p class="capitalize text-black text-sm">{{ $t(label) }}</p>
      <span v-if="required" class="text-red-500">*</span>
    </div>

    <Password
      v-model="value"
      toggleMask
      :feedback="feedback"
      variant="filled"
      :placeholder="$t(placeholder)"
      promptLabel="Choose a password"
      weakLabel="Too simple"
      mediumLabel="Average complexity"
      strongLabel="Complex password"
      :invalid="error"
      @blur="$emit('blur')"
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
  </label>
</template>

<script setup>
import { ref, watch } from 'vue'
import Password from 'primevue/password'
import Message from 'primevue/message'

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: 'Password',
  },
  placeholder: {
    type: String,
    default: 'Enter your password',
  },
  required: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: 'This field is required',
  },
  feedback: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'blur'])
const value = ref(props.modelValue)

// Keep value reactive
watch(
  () => props.modelValue,
  (newValue) => {
    value.value = newValue
  },
)
</script>

<style lang="scss" scoped>
/* Ensuring deep styling for PrimeVue components */
::v-deep(.p-password) {
  width: 100%;
  display: block;
}
::v-deep(.p-password .p-inputtext) {
  width: 100%;
  display: block;
  background-color: var(--color-neutrals-white);

  &::placeholder {
    font-size: var(--font-size-sm);
  }
}
</style>
