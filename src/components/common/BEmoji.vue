<template>
  <EmojiPicker
    :class="{
      error: message.length >= props.maxLength
    }"
    ref="emojiPicker"
    display-recent
    :pickerType="pickerType"
    placeholder="Type a message"
    class="w-full"
    :text="modelValue"
    :key="counter"
    @select="addEmoji"
    @update:text="onChangeText"
  />
</template>

<script setup>
import EmojiPicker from 'vue3-emoji-picker';
import { ref, watch } from 'vue';
const props = defineProps({
  pickerType: {
    type: String,
    default: 'textarea'
  },
  modelValue: {
    type: String,
    default: ''
  },
  maxLength: {
    type: Number,
    default: 916
  }
});

const counter = ref(0);

const emit = defineEmits(['update:modelValue']);
const message = ref(props.modelValue || '');

const addEmoji = (emoji) => {
  message.value += emoji.i; // `emoji.i` contains the emoji character
};

const onChangeText = (text) => {
  message.value = text;
  emit('update:modelValue', text);
};

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal !== message.value) {
      message.value = newVal;
      counter.value++;
    }
  },
  { immediate: true }
);
</script>

<style lang="scss">
.v3-input-emoji-picker .v3-input-picker-root .v3-emoji-picker-input,
.v3-input-emoji-picker .v3-input-picker-root .v3-emoji-picker-textarea {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid var(--color-secondary-300);
  outline: none;
  &:focus {
    border-color: var(--color-primary);
  }
}

.v3-input-emoji-picker {
  &.error .v3-emoji-picker-input,
  &.error .v3-emoji-picker-textarea {
    border-color: var(--color-error);
  }
}

.v3-input-emoji-picker .v3-input-picker-root .v3-emoji-picker-textarea {
  height: 200px;
}

.v3-input-picker-icon {
  background-color: var(--color-secondary-300) !important;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex !important;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
