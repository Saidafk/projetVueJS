<script setup>
import { ref, onMounted } from 'vue';
import { fetchNearbyCinemas, getUserLocation } from '../services/geo';

const location = ref(null);
const cinemas = ref([]);
const loading = ref(false);
const error = ref(null);

const searchCinemas = async () => {
  loading.value = true;
  error.value = null;

  try {
    // 1. Obtenir la position
    const coords = await getUserLocation();
    location.value = coords;

    // 2. Chercher les cinémas
    cinemas.value = await fetchNearbyCinemas(coords.lat, coords.lon);
  } catch (err) {
    if (err.code === 1) {
      error.value = "Veuillez autoriser l'accès à votre position pour voir les cinémas.";
    } else {
      error.value = "Une erreur est survenue lors de la recherche des cinémas.";
    }
    console.error("Erreur Géo:", err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  searchCinemas();
});
</script>

<template>
  <div class="cinemas-page">
    <div class="container">
      <h1>Cinémas à proximité 📍</h1>
      <p class="subtitle">Trouvez les salles obscures autour de vous grâce à votre position.</p>

      <div v-if="loading" class="loader-box">
        <div class="spinner"></div>
        <p>Recherche des cinémas en cours...</p>
      </div>

      <div v-else-if="error" class="error-box">
        <p>⚠️ {{ error }}</p>
        <button @click="searchCinemas" class="retry-btn">Réessayer</button>
      </div>

      <div v-else-if="cinemas.length === 0 && location" class="empty-box">
        <p>Aucun cinéma trouvé dans un rayon de 10km.</p>
      </div>

      <div v-else class="cinema-list">
        <div v-for="cinema in cinemas" :key="cinema.id" class="cinema-card">
          <div class="icon">🎬</div>
          <div class="info">
            <div class="header-cinema">
              <h3>{{ cinema.name }}</h3>
              <span v-if="cinema.screens" class="badge">{{ cinema.screens }} salles</span>
            </div>
            <p>{{ cinema.address }}</p>
            <p>{{ cinema.zip }} {{ cinema.city }}</p>
            <a :href="`https://www.google.com/maps/search/?api=1&query=${cinema.lat},${cinema.lon}`" 
               target="_blank" 
               class="map-link">
               S'y rendre →
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cinemas-page { padding: 3rem 2rem; background-color: #121212; color: #fff;}
.container { max-width: 800px; margin: 0 auto; }
h1 { font-size: 2.5rem; color: #42b983; margin-bottom: 0.5rem; text-align: center; }
.subtitle { text-align: center; color: #888; margin-bottom: 3rem; }

.loader-box, .error-box, .empty-box { text-align: center; padding: 3rem; background: #1f1f1f; border-radius: 12px; }

.spinner {
  width: 40px; height: 40px; border: 4px solid #333; border-top-color: #42b983;
  border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 1rem;
}
@keyframes spin { to { transform: rotate(360deg); } }

.retry-btn { margin-top: 1rem; padding: 0.8rem 1.5rem; background: #42b983; border: none; border-radius: 6px; color: #fff; font-weight: bold; cursor: pointer; }

.cinema-list { display: flex; flex-direction: column; gap: 1.5rem; }
.cinema-card { background: #1f1f1f; padding: 1.5rem; border-radius: 12px; display: flex; align-items: center; gap: 1.5rem; border: 1px solid #333; transition: 0.3s; }
.cinema-card:hover { border-color: #42b983; transform: translateY(-3px); }

.icon { font-size: 2.5rem; }
.info h3 { margin: 0 0 0.5rem 0; color: #fff; }
.info p { margin: 0; color: #aaa; font-size: 0.9rem; }

.map-link { display: inline-block; margin-top: 1rem; color: #42b983; text-decoration: none; font-weight: bold; font-size: 0.9rem; }
.map-link:hover { text-decoration: underline; }
</style>
