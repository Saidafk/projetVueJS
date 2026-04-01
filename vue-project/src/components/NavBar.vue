<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <RouterLink to="/" class="brand-link">Mon App</RouterLink>
    </div>
    <div class="navbar-links">
      <RouterLink to="/" class="nav-link">Accueil</RouterLink>
      <RouterLink to="/test1" class="nav-link">Test 1</RouterLink>
      <RouterLink to="/test2" class="nav-link">Test 2</RouterLink>
      <RouterLink to="/test3" class="nav-link">Test 3</RouterLink>
      <RouterLink to="/test4" class="nav-link">Test 4</RouterLink>
      <RouterLink to="/about" class="nav-link">À propos</RouterLink>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: #333;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
}

.brand-link {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
  white-space: nowrap; /* Empêche le titre d'aller à la ligne */
}

.navbar-links {
  display: flex;
  gap: 1.5rem;
  flex-wrap: nowrap; /* Empêche les liens d'aller à la ligne */
}

.nav-link {
  color: #ccc;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s;
  white-space: nowrap;
}

.nav-link:hover {
  color: white;
}

.nav-link.router-link-active {
  color: #42b983;
  font-weight: bold;
}
</style>
