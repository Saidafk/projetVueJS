<script setup>
import { RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue'
import { getFavoris, getWatchlist } from '../services/storage'

const favCount = ref(0)
const watchCount = ref(0)
const isOpen = ref(false)

const updateFavCount = () => { favCount.value = getFavoris().length }
const updateWatchCount = () => { watchCount.value = getWatchlist().length }

const toggleMenu = () => { isOpen.value = !isOpen.value }
const closeMenu = () => { isOpen.value = false }

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
    <button class="hamburger" @click="toggleMenu" aria-label="Menu" :aria-expanded="isOpen">
      <span class="hamburger-box">
        <span class="hamburger-inner" :class="{ open: isOpen }"></span>
      </span>
    </button>

    <div class="navbar-links" :class="{ open: isOpen }">
      <RouterLink to="/" class="nav-link" @click="closeMenu">Accueil</RouterLink>
      <RouterLink to="/decouvrir" class="nav-link" @click="closeMenu">Découvrir</RouterLink>
      <RouterLink to="/watchlist" class="nav-link" @click="closeMenu">Watchlist <span v-if="watchCount > 0" class="badge">{{ watchCount }}</span></RouterLink>
      <RouterLink to="/favoris" class="nav-link" @click="closeMenu">
        Favoris
        <span v-if="favCount > 0" class="badge">{{ favCount }}</span>
      </RouterLink>
      <RouterLink to="/critiques" class="nav-link" @click="closeMenu">Critiques</RouterLink>
      <RouterLink to="/cinemas" class="nav-link" @click="closeMenu">Cinémas</RouterLink>
      <RouterLink to="/about" class="nav-link" @click="closeMenu">À propos</RouterLink>
    </div>
  </nav>
</template>

<style scoped>
/* ─── Base (desktop) ─────────────────────────────────────── */
.navbar {
  background-color: #1a1a1a;
  color: white;
  padding: 0.9rem 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
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

/* Hamburger — caché sur desktop */
.hamburger {
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  flex-shrink: 0;
}
.hamburger-box {
  display: inline-block;
  width: 28px;
  height: 20px;
  position: relative;
}
.hamburger-inner,
.hamburger-inner::before,
.hamburger-inner::after {
  width: 28px;
  height: 3px;
  background-color: #e5e5e5;
  border-radius: 2px;
  position: absolute;
  left: 0;
  transition: transform 0.25s ease, top 0.25s ease, background-color 0.25s ease;
}
.hamburger-inner        { top: 50%; transform: translateY(-50%); }
.hamburger-inner::before { content: ''; top: -9px; }
.hamburger-inner::after  { content: ''; top: 9px; }
/* État ouvert → croix */
.hamburger-inner.open                { background-color: transparent; }
.hamburger-inner.open::before        { transform: translateY(9px) rotate(45deg); }
.hamburger-inner.open::after         { transform: translateY(-9px) rotate(-45deg); }

/* Nav links — desktop */
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
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}
.nav-link:hover             { color: #ffffff; transform: translateY(-2px); }
.nav-link.router-link-active { color: #e50914; border-bottom: 2px solid #e50914; }

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

/* ─── Tablet : compresse les gaps ───────────────────────── */
@media (max-width: 960px) {
  .navbar { padding: 0.9rem 1.2rem; }
  .navbar-links { gap: 0.8rem; }
  .nav-link { font-size: 0.9rem; }
}

/* ─── Mobile (≤ 640px) : hamburger + menu déroulant ─────── */
@media (max-width: 640px) {
  .hamburger { display: inline-block; }

  .navbar-links {
    display: none;
    width: 100%;
    flex-direction: column;
    gap: 0;
    background-color: #1a1a1a;
    border-top: 1px solid #333;
    padding: 0.5rem 0;
  }
  .navbar-links.open { display: flex; }

  .nav-link {
    width: 100%;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    border-bottom: 1px solid #2a2a2a;
    transform: none !important;
    justify-content: center;
  }
  .nav-link:last-child { border-bottom: none; }
  .nav-link.router-link-active {
    border-bottom: 1px solid #2a2a2a;
    background-color: rgba(229, 9, 20, 0.1);
    color: #e50914;
  }
}
</style>
