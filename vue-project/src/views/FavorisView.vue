<script setup>
import { ref, onMounted } from 'vue';
import { getFavoris, removeFromFavoris } from '../services/storage';

const favoris = ref([]);

const loadFavoris = () => {
  favoris.value = getFavoris();
};

onMounted(() => {
  loadFavoris();
});

const handleRemove = (movieId) => {
  removeFromFavoris(movieId);
  loadFavoris();
};
</script>

<template>
  <div class="favoris-page">
    <div class="container">
      <h1>Mes Favoris ★</h1>
      
      <div v-if="favoris.length === 0" class="empty-state">
        <p>Vous n'avez pas encore de favoris.</p>
        <RouterLink to="/decouvrir" class="discover-link">Explorer les films</RouterLink>
      </div>

      <div v-else class="movie-grid">
        <div v-for="movie in favoris" :key="movie.id" class="movie-card">
          <div class="movie-poster">
            <img :src="movie.image" :alt="movie.title" />
            <div class="movie-overlay">
              <span class="rating">⭐ {{ movie.rating }}</span>
            </div>
          </div>
          <div class="movie-details">
            <h3>{{ movie.title }}</h3>
            <p class="summary">{{ movie.summary.slice(0, 80) }}...</p>
            <button @click="handleRemove(movie.id)" class="remove-btn">Retirer des favoris</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.favoris-page {
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
  color: #f1c40f;
}

.empty-state {
  text-align: center;
  margin-top: 5rem;
  color: #aaa;
}

.discover-link {
  display: inline-block;
  margin-top: 1rem;
  color: #f1c40f;
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
  border: 1px solid #333;
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
  color: #f1c40f;
  border: 1px solid #f1c40f;
  padding: 0.4rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.3s;
}

.remove-btn:hover {
  background: #f1c40f;
  color: #333;
}
</style>
