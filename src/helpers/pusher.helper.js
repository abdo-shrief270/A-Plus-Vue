// src/composables/usePusher.js
import { inject } from 'vue';

export function usePusher() {
  const pusher = inject('pusher');
  if (!pusher) {
    throw new Error(
      'Pusher is not provided. Make sure to register the Pusher plugin.'
    );
  }
  return pusher;
}
