<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import AppNotification from './components/AppNotification.vue'
</script>

<template>
  <div class="app-container">
    <AppNotification />
    <NavBar />
    <main class="app-content">
      <RouterView v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>
  </div>
</template>

<style>
/* Reset et styles globaux */
body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', sans-serif;
  background-color: #121212; 
  color: #ffffff;
  -webkit-font-smoothing: antialiased;
}

/* Animation de transition de page */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

#app {
  max-width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  width: 100%;
}

.app-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-content {
  flex: 1;
  width: 100%;
  box-sizing: border-box;
}

h1, h2, h3 {
  color: #ffffff;
}
</style>
