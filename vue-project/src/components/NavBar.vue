<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <span class="brand-icon">🎬</span>
      <span class="brand-name">CinéList</span>
    </div>
    <ul class="navbar-links">
      <li>
        <RouterLink to="/">Accueil</RouterLink>
      </li>
      <li>
        <RouterLink to="/watchlist">Watchlist</RouterLink>
      </li>
      <li>
        <RouterLink to="/favoris">Favoris</RouterLink>
      </li>
      <li>
        <RouterLink to="/about">À propos</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  height: 64px;
  background-color: #1a1a2e;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
}

.brand-icon {
  font-size: 1.6rem;
}

.brand-name {
  font-size: 1.4rem;
  font-weight: 700;
  color: #e94560;
  letter-spacing: 1px;
}

.navbar-links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 0.5rem;
}

.navbar-links a {
  display: block;
  padding: 0.4rem 1rem;
  color: #c8c8d4;
  text-decoration: none;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 500;
  transition: background-color 0.2s, color 0.2s;
}

.navbar-links a:hover {
  background-color: #16213e;
  color: #ffffff;
}

.navbar-links a.router-link-exact-active {
  background-color: #e94560;
  color: #ffffff;
}
</style>
