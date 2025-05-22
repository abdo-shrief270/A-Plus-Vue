import Aura from '@primevue/themes/aura'
import { definePreset } from '@primevue/themes'
import primary from './colors/primary' // import the primary color file
import 'primeicons/primeicons.css'

const CustomPreset = definePreset(Aura, {
  semantic: {
    primary: primary.light,
  },
})

export default CustomPreset
