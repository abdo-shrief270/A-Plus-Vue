<template>
  <div class="w-full">
    <div class="mb-2 font-medium flex items-center gap-2">
      <slot name="icon" />
      <p class="capitalize text-black text-sm">{{ $t(label) }}</p>
      <span v-if="required" class="text-red-500">*</span>
    </div>
    <Select
      v-model="selected"
      :options="options"
      :placeholder="$t(placeholder)"
      :loading="loading"
      :invalid="error"
      :showClear="showClear"
      optionLabel="name"
      class="min-w-xs w-[inherit]"
      @update:modelValue="updateValue"
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
import { onMounted, ref, watch } from 'vue'
const emit = defineEmits(['update:modelValue'])

const selected = ref(null)

const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  returnObject: {
    type: Boolean,
    default: false,
  },
  value: {
    type: String,
    default: 'value',
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  showClear: {
    type: Boolean,
    default: true,
  },
  label: {
    type: String,
    default: '',
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
    default: 'This input has an error',
  },
})

const updateValue = (value) => {
  if (props.returnObject) {
    emit('update:modelValue', value)
  } else {
    emit('update:modelValue', value[props.value])
  }
}

onMounted(() => {
  selected.value = props.modelValue
  if (props.returnObject) {
    selected.value = props.options.find((option) => option.value === props.modelValue)
  }
  if (props.modelValue) {
    selected.value = props.options.find((option) => option.value === props.modelValue)
  }
})

watch(
  () => props.modelValue,
  (newValue) => {
    //  find tags and set them
    selected.value = props.options.find((option) => option.value === newValue)
  },
)
</script>
