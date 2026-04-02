<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <RouterLink to="/" class="brand-link">CinéList</RouterLink>
    </div>
    <div class="navbar-links">
      <RouterLink to="/" class="nav-link">Accueil</RouterLink>
      <RouterLink to="/decouvrir" class="nav-link">Découvrir</RouterLink>
      <RouterLink to="/watchlist" class="nav-link">Watchlist</RouterLink>
      <RouterLink to="/favoris" class="nav-link">Favoris</RouterLink>
      <RouterLink to="/critiques" class="nav-link">Critiques</RouterLink>
      <RouterLink to="/cinemas" class="nav-link">Cinémas</RouterLink>
      <RouterLink to="/about" class="nav-link">À propos</RouterLink>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: #1a1a1a;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 4px 6px rgba(0,0,0,0.3);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.brand-link {
  font-size: 1.8rem;
  font-weight: 800;
  color: #e50914;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.navbar-links {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: #e5e5e5;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.3s, transform 0.2s;
}

.nav-link:hover {
  color: #ffffff;
  transform: translateY(-2px);
}

.nav-link.router-link-active {
  color: #e50914;
  border-bottom: 2px solid #e50914;
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  .navbar-links {
    gap: 0.8rem;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
