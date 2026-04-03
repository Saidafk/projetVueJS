<script setup>
import { useNotification } from '../services/notifications';

const { notification, hideNotify } = useNotification();
</script>

<template>
  <Transition name="toast">
    <div 
      v-if="notification.show" 
      :class="['notification-toast', notification.type]"
      @click="hideNotify"
      role="alert"
    >
      <div class="toast-content">
        <span class="toast-icon">
          <template v-if="notification.type === 'success'">✅</template>
          <template v-else-if="notification.type === 'fav'">⭐</template>
          <template v-else-if="notification.type === 'error'">❌</template>
          <template v-else>ℹ️</template>
        </span>
        <span class="toast-message">{{ notification.message }}</span>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.notification-toast {
  position: fixed;
  top: 90px;
  right: 20px;
  min-width: 250px;
  max-width: 350px;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  color: white;
  z-index: 9999;
  box-shadow: 0 10px 25px rgba(0,0,0,0.4);
  font-weight: 500;
  cursor: pointer;
  border: 1px solid rgba(255,255,255,0.1);
}

.toast-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.toast-icon {
  font-size: 1.2rem;
}

.toast-message {
  line-height: 1.4;
}

/* Couleurs par type */
.notification-toast.success { background-color: #2ecc71; border-color: #27ae60; }
.notification-toast.fav { background-color: #c0392b; border-color: #962d22; }
.notification-toast.info { background-color: #3498db; border-color: #2980b9; }
.notification-toast.error { background-color: #e74c3c; border-color: #c0392b; }

/* Animation */
.toast-enter-active, .toast-leave-active { 
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
}
.toast-enter-from { 
  opacity: 0; 
  transform: translateX(100px) scale(0.9); 
}
.toast-leave-to { 
  opacity: 0; 
  transform: translateX(50px) scale(0.9); 
}

@media (max-width: 600px) {
  .notification-toast {
    top: auto;
    bottom: 20px;
    right: 20px;
    left: 20px;
    min-width: auto;
  }
}
</style>
