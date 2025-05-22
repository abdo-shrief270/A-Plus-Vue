import { ref } from 'vue';

export function useDateFilter() {
  const filters = ref({});

  const formatDate = (
    date,
    startKey = 'filter[start_date]',
    endKey = 'filter[end_date]'
  ) => {
    if (date && date.length === 2) {
      filters.value[startKey] = new Date(date[0]).toISOString().split('T')[0];
      filters.value[endKey] = new Date(date[1]).toISOString().split('T')[0];
    } else {
      filters.value[startKey] = null;
      filters.value[endKey] = null;
    }

    return filters.value;
  };

  return {
    formatDate
  };
}
