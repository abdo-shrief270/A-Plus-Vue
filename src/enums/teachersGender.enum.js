import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

export const optionsGender = ref(() => {
  const { t } = useI18n();
  return [
    { name: t('enums.teachersGender.male'), value: 'male' },
    { name: t('enums.teachersGender.female'), value: 'female' },
  ];
});
