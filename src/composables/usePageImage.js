import { onMounted, onUnmounted } from 'vue'
import { useLayoutStore } from '../stores/layout'

export function usePageImage(imageUrl) {
  const layout = useLayoutStore()

  onMounted(() => {
    layout.image = imageUrl
  })

  onUnmounted(() => {
    layout.image = null
  })
}
