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
/* Reset et styles globaux */
body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', sans-serif;
  background-color: #121212; /* Fond très sombre */
  color: #ffffff; /* Texte blanc par défaut */
  -webkit-font-smoothing: antialiased;
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
