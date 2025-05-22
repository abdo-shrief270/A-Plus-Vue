import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

export const educationQualifications = ref(() => {
  const { t } = useI18n();
  return [
    { name: t('enums.educationQualifications.bachelor'), value: 'bachelor' },
    { name: t('enums.educationQualifications.master'), value: 'master' },
    { name: t('enums.educationQualifications.phd'), value: 'Ph.D' },
  ];
});
