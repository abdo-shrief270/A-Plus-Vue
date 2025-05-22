<template>
  <div class="min-w-xs">
    <div v-if="label" class="mb-2 font-medium flex items-center gap-2">
      <p class="capitalize text-black text-sm">{{ $t(label) }}</p>
      <span v-if="required" class="text-red-500">*</span>
    </div>
    <VueDatePicker
      v-model="date"
      :range="range"
      :placeholder="$t('contacts.filters.date')"
      iconDisplay="button"
      dateFormat="yyyy-mm-dd"
      :multi-calendars="range"
      :enable-time-picker="false"
      :format="format"
      :min-date="minDate"
      :required="required"
      :disabled="disabled"
      :ui="{
        input: `${error ? 'p-invalid' : ''} ${disabled ? 'cursor-not-allowed' : ''} date-picker-wrapper`,
      }"
      @update:modelValue="updateDate"
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
import { useDateFormate } from '@/composables/useFormatDate'
import { ref, onMounted, watch } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  range: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: 'global.inputs.date',
  },
  minDate: {
    type: String,
    default: '',
  },
  error: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: 'This input has an error',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const date = ref()

// For demo purposes assign range from the current date
onMounted(() => {
  date.value = props.modelValue || null
  if (props.range) {
    date.value = null
  }
})

const updateDate = () => {
  if (props.range && date.value) {
    date.value = [useDateFormate(date.value[0]), useDateFormate(date.value[1])]
  } else {
    date.value = useDateFormate(date.value)
  }

  emit('update:modelValue', date.value)
}

// Format function for display
const format = (date) => {
  if (Array.isArray(date)) {
    return date
      .map((d) => d.toISOString().split('T')[0]) // Format each date in range
      .join(' - ')
  }
  return date.toISOString().split('T')[0] // Format single date
}

watch(
  () => props.modelValue,
  () => {
    date.value = props.modelValue
  },
)
</script>
<style lang="scss" scoped>
.dp__theme_light {
  --dp-primary-color: var(--color-primary);
  --dp-action-buttons-padding: 16px;
  --dp-border-color-hover: var(--color-primary);
  --dp-border-color-focus: var(--color-primary);
}

:deep(.dp__action_buttons .dp__action_select) {
  font-size: var(--font-size-sm);
}

:deep(.p-invalid) {
  --dp-border-color: #db2955;
  --dp-border-color-hover: #db2955;
  --dp-border-color-focus: #db2955;
}
</style>
