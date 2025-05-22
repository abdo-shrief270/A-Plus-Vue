<template>
  <label class="block">
    <div class="mb-2 font-medium flex items-center gap-2">
      <component :is="PhoneIcon" />

      <p class="capitalize text-black text-sm">
        {{ $t(label) }}
      </p>
      <span v-if="required" class="text-red-500">*</span>
    </div>
    <vue-tel-input
      v-model="computedPhone"
      :autoFormat="false"
      defaultCountry="eg"
      mode="auto"
      :dropdownOptions="{
        showSearchBox: true,
        showFlags: true,
        showDialCodeInSelection: true,
        autocomplete: 'off'
      }"
      :inputOptions="{
        autocomplete: 'off',
        showDialCode: true,
        type: 'text',
        maxlength: 12,
        placeholder: $t(placeholder)
      }"
      :validCharactersOnly="true"
      :class="{
        'error-tel': error || !phoneIsValid?.valid
      }"
      @update:modelValue="(val) => emit('update:modelValue', val.trim())"
      @country-changed="selectCountry"
      @validate="(val) => isValid(val)"
      @blur="emit('blur')"
    ></vue-tel-input>
    <Message
      v-if="error || !phoneIsValid?.valid"
      icon="pi pi-exclamation-circle"
      severity="error"
      variant="simple"
      class="w-full block mt-2"
    >
      <template v-if="!phoneIsValid?.valid">
        {{ $t('errors.invalid_phone') }}
      </template>
      <template v-else-if="error">
        {{ $t(errorMessage) }}
      </template>
    </Message>
  </label>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import PhoneIcon from '../icons/phoneIcon.vue';

const props = defineProps({
  modelValue: {
    type: [String, null],
    required: true
  },
  error: {
    type: Boolean,
    default: false
  },
  errorMessage: {
    type: String,
    default: 'This input has error'
  },
  required: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: 'Phone Number'
  },
  placeholder: {
    type: String,
    default: 'Enter your phone number'
  }
});
const emit = defineEmits(['update:modelValue', 'country', 'blur']);

// Replace phone ref with computed
const computedPhone = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value?.trim())
});

const phoneIsValid = ref(null);

const selectCountry = ({ dialCode }) => {
  emit('country', `${dialCode}`);
};

const isValid = (val) => {
  phoneIsValid.value = {
    ...val,
    valid: val.valid !== undefined ? val.valid : true
  };
};

// Add watch for validation when modelValue changes
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      isValid({ valid: true }); // Reset validation when value changes
    }
  }
);
</script>

<style lang="scss">
.vue-tel-input {
  border-radius: 8px;
  gap: 12px;
  border: none;

  &.error-tel {
    .vti__input.vti__phone {
      border-color: var(--p-message-error-color);
    }
  }
}

.vue-tel-input:focus-within {
  box-shadow: none;
  border-color: var(--p-primary-color);
}

.vti__input.vti__phone {
  padding: 8px;
  border-radius: 8px;
  border: 1px solid var(--color-secondary-300);
  opacity: 1;
  &:placeholder {
    font-size: var(--font-size-sm);
    color: var(--color-neutrals-300);
  }
}

.vti__dropdown {
  border: 1px solid var(--color-neutrals-200);
  border-radius: 8px;
  background-color: var(--color-secondary-100);
}

.vti__selection .vti__flag {
  // border-radius: 50%;
  display: block;
}

.vti__search_box_container {
  position: sticky;
  top: 0;
  background-color: #fff;
}

.vti__input.vti__search_box {
  width: calc(100% - 16px);
  margin: 8px;
  border-radius: 8px;
}
</style>
