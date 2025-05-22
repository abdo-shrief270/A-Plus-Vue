import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ToastService from 'primevue/toastservice'
import i18n from './config/I18n'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import CustomPreset from './config/primevue-preset'
import 'vue-tel-input/vue-tel-input.css'
import VueTelInput from 'vue-tel-input'
import VueCookies from 'vue-cookies'
import ApiClient from '@/helpers/api.helper'

const app = createApp(App)

app.use(createPinia())
app.use(i18n)
app.use(router)
app.provide('$api', ApiClient)
app.use(PrimeVue, {
  theme: {
    preset: CustomPreset,
    options: {
      darkModeSelector: 'light',
    },
  },
})
app.use(ToastService)
app.use(VueTelInput)
app.use(VueCookies)

app.mount('#app')
