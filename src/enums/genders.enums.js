import { ref } from 'vue'

export const optionsGender = ref(() => {
  return [
    { name: 'ذكر', value: 'male' },
    { name: 'أنثي', value: 'female' },
  ]
})
