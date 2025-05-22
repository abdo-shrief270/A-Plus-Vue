import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

export const useTimeOptions = () => {
  const { t } = useI18n();

  return computed(() => {
    return Array.from({ length: 6 }, (_, i) => {
      const num = i + 1;
      return {
        name: `${t(`enums.timeOption.${num}`)}`,
        id: `${num}`,
      };
    });
  });
};
