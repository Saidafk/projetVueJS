<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div class="app-container">
    <NavBar />
    <main class="app-content">
      <RouterView />
    </main>
  </div>
</template>

<style>
/* Style global pour s'assurer que le contenu prend toute la largeur */
#app {
  max-width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
}

.app-container {
  width: 100%;
  min-height: 100vh;
}

.app-content {
  padding: 2rem;
}
</style>
