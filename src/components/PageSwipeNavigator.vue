<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router';

// Ordre logique des pages
const pageOrder = [
  'home',        // Accueil
  'discovery',   // Découvrir
  'watchlist',   // Watchlist
  'favoris',     // Favoris
  'reviews',     // Critique
  'cinemas',     // Cinéma
  'about'        // À propos
];

const router = useRouter();
const route = useRoute();

const touchStartX = ref(0);
const touchStartY = ref(0);
let longPressTimeout = null;

function goToNextPage() {
  const currentIndex = pageOrder.indexOf(route.name);
  const nextIndex = (currentIndex + 1) % pageOrder.length;
  router.push({ name: pageOrder[nextIndex] });
}

function goToPrevPage() {
  const currentIndex = pageOrder.indexOf(route.name);
  const prevIndex = (currentIndex - 1 + pageOrder.length) % pageOrder.length;
  router.push({ name: pageOrder[prevIndex] });
}

function onTouchStart(e) {
  const t = e.touches[0];
  touchStartX.value = t.clientX;
  touchStartY.value = t.clientY;
  longPressTimeout = setTimeout(() => {}, 1000);
}

function onTouchEnd(e) {
  clearTimeout(longPressTimeout);
  const t = e.changedTouches[0];
  const dx = t.clientX - touchStartX.value;
  const dy = t.clientY - touchStartY.value;
  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
    if (dx > 0) goToPrevPage();
    else goToNextPage();
  }
}

function onTouchMove() {
  clearTimeout(longPressTimeout);
}

function onMouseDown(e) {
  touchStartX.value = e.clientX;
  touchStartY.value = e.clientY;
  longPressTimeout = setTimeout(() => {}, 1000);
}

function onMouseUp(e) {
  clearTimeout(longPressTimeout);
  const dx = e.clientX - touchStartX.value;
  const dy = e.clientY - touchStartY.value;
  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
    if (dx > 0) goToPrevPage();
    else goToNextPage();
  }
}

function onMouseLeave() {
  clearTimeout(longPressTimeout);
}
</script>

<template>
  <div
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
    @touchmove="onTouchMove"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    @mouseleave="onMouseLeave"
    style="user-select: none;"
  >
    <slot />
  </div>
</template>
