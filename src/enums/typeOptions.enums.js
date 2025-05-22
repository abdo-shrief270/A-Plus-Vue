import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

export const typeOptions = ref(() => {
  const { t } = useI18n();
  return [
    { name: t('enums.typeOptions.urgent'), id: 'urgent' },
    { name: t('enums.typeOptions.schedule'), id: 'schedule' },
  ];
});
