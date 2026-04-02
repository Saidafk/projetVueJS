<script setup>
import { ref, onMounted } from 'vue';

const location = ref(null);
const cinemas = ref([]);
const loading = ref(false);
const error = ref(null);

const getCinemas = async (lat, lon) => {
  loading.value = true;
  error.value = null;
  
  // Rayon de recherche : 10km (0.1 degré environ)
  const radius = 0.1; 
  const query = `
    [out:json];
    node["amenity"="cinema"](
      ${lat - radius},${lon - radius},
      ${lat + radius},${lon + radius}
    );
    out body;
  `;

  try {
    const response = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`);
    const data = await response.json();
    cinemas.value = data.elements || [];
  } catch (err) {
    error.value = "Impossible de récupérer les cinémas à proximité.";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const locateUser = () => {
  if (!navigator.geolocation) {
    error.value = "La géolocalisation n'est pas supportée par votre navigateur.";
    return;
  }

  loading.value = true;
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      location.value = { lat: latitude, lon: longitude };
      getCinemas(latitude, longitude);
    },
    (err) => {
      loading.value = false;
      error.value = "Accès à la position refusé ou indisponible.";
      console.error(err);
    }
  );
};

onMounted(() => {
  locateUser();
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
        <button @click="locateUser" class="retry-btn">Réessayer</button>
      </div>

      <div v-else-if="cinemas.length === 0 && location" class="empty-box">
        <p>Aucun cinéma trouvé dans un rayon de 10km.</p>
      </div>

      <div v-else class="cinema-list">
        <div v-for="cinema in cinemas" :key="cinema.id" class="cinema-card">
          <div class="icon">🎬</div>
          <div class="info">
            <h3>{{ cinema.tags.name || 'Cinéma sans nom' }}</h3>
            <p v-if="cinema.tags['addr:street']">
              {{ cinema.tags['addr:housenumber'] }} {{ cinema.tags['addr:street'] }}
            </p>
            <p v-if="cinema.tags['addr:city']">{{ cinema.tags['addr:city'] }}</p>
            <a :href="`https://www.google.com/maps/search/?api=1&query=${cinema.lat},${cinema.lon}`" 
               target="_blank" 
               class="map-link">
               Voir sur la carte →
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cinemas-page { padding: 3rem 2rem; background-color: #121212; color: #fff; min-height: 100vh; }
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
