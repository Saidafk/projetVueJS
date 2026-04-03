import { ref } from 'vue';

const notification = ref({
  show: false,
  message: '',
  type: 'success', // 'success', 'info', 'error', 'fav'
});

let timeout = null;

export const useNotification = () => {
  const showNotify = (message, type = 'success', duration = 3000) => {
    // Nettoyer le timeout précédent si une nouvelle notification arrive
    if (timeout) clearTimeout(timeout);

    notification.value = {
      show: true,
      message,
      type
    };

    timeout = setTimeout(() => {
      notification.value.show = false;
    }, duration);
  };

  const hideNotify = () => {
    notification.value.show = false;
    if (timeout) clearTimeout(timeout);
  };

  return {
    notification,
    showNotify,
    hideNotify
  };
};
