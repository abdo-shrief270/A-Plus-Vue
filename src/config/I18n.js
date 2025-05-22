import { createI18n } from 'vue-i18n'

// Translations
import ar from '@/locales/ar'
import en from '@/locales/en'

const messages = {
  ar,
  en,
}

// Install I18n
const i18n = createI18n({
  legacy: false,
  locale: 'ar',
  fallbackLocale: 'ar',
  globalInjection: true,
  messages,
})

export default i18n
