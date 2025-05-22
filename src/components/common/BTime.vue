<template>
  <div>
    <div class="mb-2 font-medium flex items-center gap-2">
      <p v-if="label" class="capitalize text-black text-sm">{{ $t(label) }}</p>
      <span v-if="required" class="text-red-500">*</span>
    </div>
    <VueDatePicker
      v-model="time"
      :is-24="false"
      time-picker
      placeholder="Select Time"
      iconDisplay="button"
      dateFormat="hh:mm"
      :min-time="minTime"
      :required="required"
      :ui="{
        input: `${error ? 'p-invalid' : ''} ${disabled ? 'cursor-not-allowed' : ''}`
      }"
      :disabled="disabled"
      @update:modelValue="updateDate"
    >
      <template #input-icon>
        <i class="pi pi-clock mx-4"></i>
      </template>
    </VueDatePicker>
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
import { ref, onMounted, watch } from 'vue';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  required: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: 'global.inputs.time'
  },
  minTime: {
    type: String,
    default: ''
  },
  error: {
    type: Boolean,
    default: false
  },
  errorMessage: {
    type: String,
    default: 'This input has an error'
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const time = ref(null);

// For demo purposes assign range from the current date
onMounted(() => {
  if (props.modelValue) {
    time.value = props.modelValue || null;
  }
});

const updateDate = (time) => {
  if (
    time &&
    typeof time === 'object' &&
    'hours' in time &&
    'minutes' in time
  ) {
    const hours = time.hours.toString().padStart(2, '0'); // Ensure two digits
    const minutes = time.minutes.toString().padStart(2, '0'); // Ensure two digits
    const formattedTime = `${hours}:${minutes}`; // Format to hh:mm

    emit('update:modelValue', formattedTime);
  }
};

watch(
  () => props.modelValue,
  () => {
    time.value = props.modelValue;
  }
);
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
