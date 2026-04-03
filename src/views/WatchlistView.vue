<script setup>
import { ref, onMounted } from 'vue';
import { getWatchlist, removeFromWatchlist } from '../services/storage';
import { useNotification } from '../services/notifications';

const watchlist = ref([]);
const { showNotify } = useNotification();

const loadWatchlist = () => {
  watchlist.value = getWatchlist();
};

onMounted(() => {
  loadWatchlist();
});

const handleRemove = (movieId) => {
  const movie = watchlist.value.find(m => m.id === movieId);
  removeFromWatchlist(movieId);
  loadWatchlist(); // On rafraîchit la liste
  showNotify(`"${movie?.title || 'Film'}" retiré de la watchlist.`, 'info');
};
</script>

<template>
  <div class="watchlist-page">
    <div class="container">
      <h1>Ma Watchlist</h1>
      
      <div v-if="watchlist.length === 0" class="empty-state">
        <p>Votre watchlist est vide.</p>
        <RouterLink to="/decouvrir" class="discover-link">Découvrir des films</RouterLink>
      </div>

      <div v-else class="movie-grid">
        <div v-for="movie in watchlist" :key="movie.id" class="movie-card">
          <div class="movie-poster">
            <img :src="movie.image" :alt="movie.title" />
            <div class="movie-overlay">
              <span class="rating">⭐ {{ movie.rating }}</span>
            </div>
          </div>
          <div class="movie-details">
            <h3>{{ movie.title }}</h3>
            <p class="summary">{{ movie.summary.slice(0, 80) }}...</p>
            <button @click="handleRemove(movie.id)" class="remove-btn">Supprimer</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.watchlist-page {
  padding: 3rem 2rem;
  background-color: #121212;
  color: #fff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #e50914;
}

.empty-state {
  text-align: center;
  margin-top: 5rem;
  color: #aaa;
}

.discover-link {
  display: inline-block;
  margin-top: 1rem;
  color: #e50914;
  text-decoration: none;
  font-weight: bold;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
}

.movie-card {
  background: #1f1f1f;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.movie-poster {
  position: relative;
  height: 280px;
}

.movie-poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.movie-overlay {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0,0,0,0.7);
  padding: 4px 8px;
  border-radius: 10px;
}

.movie-details {
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.movie-details h3 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.summary {
  font-size: 0.8rem;
  color: #bbb;
  margin-bottom: 1rem;
  flex: 1;
}

.remove-btn {
  background: transparent;
  color: #888;
  border: 1px solid #444;
  padding: 0.4rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.3s;
}

.remove-btn:hover {
  background: #e50914;
  color: white;
  border-color: #e50914;
}
</style>
