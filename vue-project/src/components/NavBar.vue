<script setup>
import { RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue'
import { getFavoris, getWatchlist } from '../services/storage'

const favCount = ref(0)
const watchCount = ref(0)

const updateFavCount = () => { favCount.value = getFavoris().length }
const updateWatchCount = () => { watchCount.value = getWatchlist().length }

onMounted(() => {
  updateFavCount()
  updateWatchCount()
  window.addEventListener('storage', () => { updateFavCount(); updateWatchCount(); })
  setInterval(() => { updateFavCount(); updateWatchCount(); }, 1000)
})
</script>

<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <RouterLink to="/" class="brand-link">CinéList</RouterLink>
    </div>
    <div class="navbar-links">
      <RouterLink to="/" class="nav-link">Accueil</RouterLink>
      <RouterLink to="/decouvrir" class="nav-link">Découvrir</RouterLink>
      <RouterLink to="/watchlist" class="nav-link">Watchlist <span v-if="watchCount > 0" class="badge">{{ watchCount }}</span></RouterLink>
      <RouterLink to="/favoris" class="nav-link">
        Favoris
        <span v-if="favCount > 0" class="badge">{{ favCount }}</span>
      </RouterLink>
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
  align-items: center;
}

.nav-link {
  color: #e5e5e5;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.3s, transform 0.2s;
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
}

.badge {
  background-color: #e50914;
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 14px;
  text-align: center;
}

.nav-link:hover {
  color: #ffffff;
  transform: translateY(-2px);
}

.nav-link.router-link-active {
  color: #e50914;
  border-bottom: 2px solid #e50914;
}

@media (max-width: 1000px) {
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
