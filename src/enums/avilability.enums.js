import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

export const availabilityTimes = ref(() => {
  const { t } = useI18n();
  return [
    { name: t('enums.days.sunday'), key: 'sunday' },
    { name: t('enums.days.monday'), key: 'monday' },
    { name: t('enums.days.tuesday'), key: 'tuesday' },
    { name: t('enums.days.wednesday'), key: 'wednesday' },
    { name: t('enums.days.thursday'), key: 'thursday' },
    { name: t('enums.days.friday'), key: 'friday' },
    { name: t('enums.days.saturday'), key: 'saturday' },
  ];
});
