<script setup>
import { RouterView, useRouter, useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue'
import AppNotification from './components/AppNotification.vue'

const router = useRouter()
const route  = useRoute()

// Ordre des pages pour le swipe gauche/droite
const PAGE_ORDER = ['/', '/decouvrir', '/watchlist', '/favoris', '/critiques', '/cinemas', '/about']

// --- Swipe detection ---
let touchStartX = 0
let touchStartY = 0

const MIN_SWIPE_X   = 60   // distance horizontale minimale (px)
const MAX_SWIPE_Y   = 80   // tolérance verticale (px) — évite les conflits avec le scroll

function onTouchStart(e) {
  // Ignorer si l'élément touché est un input/select/textarea
  const tag = e.target.tagName.toUpperCase()
  if (['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON', 'A'].includes(tag)) return
  touchStartX = e.touches[0].clientX
  touchStartY = e.touches[0].clientY
}

function onTouchEnd(e) {
  if (touchStartX === 0) return
  const dx = e.changedTouches[0].clientX - touchStartX
  const dy = e.changedTouches[0].clientY - touchStartY

  touchStartX = 0

  // Geste trop vertical → scroll normal, on ignore
  if (Math.abs(dy) > MAX_SWIPE_Y) return
  if (Math.abs(dx) < MIN_SWIPE_X) return

  const currentPath = route.path
  const idx = PAGE_ORDER.indexOf(currentPath)
  if (idx === -1) return

  if (dx < 0 && idx < PAGE_ORDER.length - 1) {
    // Swipe gauche → page suivante
    router.push(PAGE_ORDER[idx + 1])
  } else if (dx > 0 && idx > 0) {
    // Swipe droite → page précédente
    router.push(PAGE_ORDER[idx - 1])
  }
}
</script>

<template>
  <div
    class="app-container"
    @touchstart.passive="onTouchStart"
    @touchend.passive="onTouchEnd"
  >
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
  transform: translateX(30px);
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
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
