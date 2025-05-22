import { ref } from 'vue';

export const filtersStatus = ref([
  { name: 'All', value: 'new' },
  { name: 'Pending', value: 'pending' },
  { name: 'current', value: 'current' },
  { name: 'Finished', value: 'finished' },
  { name: 'cancelled', value: 'cancelled' },
]);
