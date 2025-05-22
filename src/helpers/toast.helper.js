// toast.helper.js
import ToastEventBus from 'primevue/toasteventbus'

export const useToastService = () => {
  const showToast = (title, message, severity = 'info') => {
    if (title.length && message?.length) {
      ToastEventBus.emit('add', {
        severity,
        summary: title, // Use `t` from the component
        detail: message || '',
        life: 5000,
      })
    }
  }

  return { showToast }
}
