<template>
  <label class="block">
    <p class="my-4 capitalize font-bold text-gray-700">رقم الهاتف</p>
    <vue-tel-input
      v-model="phone"
      :autoFormat="false"
      :defaultCountry="defaultCountry"
      placeholder="ادخل رقم الهاتف (مثال: +966123456789)"
      mode="auto"
      :dropdownOptions="{
        showSearchBox: true,
        showFlags: true,
        showDialCodeInSelection: true,
        autocomplete: 'off',
      }"
      :inputOptions="{
        autocomplete: 'off',
        showDialCode: true,
        required: true,
        type: 'text',
        maxlength: 12,
      }"
      :validCharactersOnly="true"
      :class="{
        'error-tel': error && !phoneIsValid?.valid,
      }"
      @update:modelValue="(val) => emit('update:modelValue', val.trim())"
      @country-changed="selectCountry"
      @validate="isValid"
      @blur="emit('blur')"
    ></vue-tel-input>
    <Message
      icon="pi pi-exclamation-triangle"
      severity="error"
      class="w-full block mt-2"
      v-if="!phoneIsValid?.valid && error && errorMessage.length"
    >
      <template v-if="!phoneIsValid?.valid">
        {{ $t('errors.invalid_phone') }}
      </template>
      <template v-else>
        {{ errorMessage }}
      </template>
    </Message>
  </label>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  modelValue: {
    type: [String, null],
    required: true,
  },
  error: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: 'This input has error',
  },
  defaultCountry: {
    type: String,
    default: 'sa',
  },
})
const emit = defineEmits(['update:modelValue', 'country', 'blur'])
const phone = ref(props.modelValue)
const phoneIsValid = ref(null)

const selectCountry = ({ dialCode }) => {
  emit('country', `${dialCode}`)
}

const isValid = (val) => {
  phoneIsValid.value = val
}
</script>

<style lang="scss">
.vue-tel-input {
  border-radius: 8px;

  &.error-tel {
    border-color: red;
  }
}

.vue-tel-input:focus-within {
  box-shadow: none;
  border-color: var(--p-primary-color);
}

.vti__input.vti__phone {
  padding: 12px;
  border-radius: 8px;
}

.vti__dropdown {
  border-radius: 8px;
}

.vti__selection .vti__flag {
  border-radius: 10%;
  background-color: #fff5;
  display: block;
}

.vti__dropdown {
  border-radius: 8px;
  background-color: var(--color-primary-50) !important;
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

// handle direction of rtl
html[dir='rtl'] .vti__dropdown-list {
  right: 0;
  left: unset;
}
</style>
