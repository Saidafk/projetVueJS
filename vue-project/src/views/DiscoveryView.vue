<script setup>
import { ref, onMounted, computed } from 'vue';
import { getAllMovies } from '../services/api';

const allMovies = ref([]);
const loading = ref(true);

// Pagination
const currentPage = ref(1);
const itemsPerPage = 10;

onMounted(async () => {
  allMovies.value = await getAllMovies();
  loading.value = false;
});

// Calcul des films à afficher pour la page actuelle
const paginatedMovies = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return allMovies.value.slice(start, end);
});

// Calcul du nombre total de pages
const totalPages = computed(() => {
  return Math.ceil(allMovies.value.length / itemsPerPage);
});

// Fonctions de navigation
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const goToPage = (page) => {
  currentPage.value = page;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<template>
  <div class="discovery-page">
    <div class="container">
      <header class="page-header">
        <h1>Découvrir des films</h1>
        <p v-if="!loading">
          Affichage de {{ (currentPage - 1) * itemsPerPage + 1 }} à 
          {{ Math.min(currentPage * itemsPerPage, allMovies.length) }} sur 
          {{ allMovies.length }} titres.
        </p>
      </header>
      
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Récupération des films...</p>
      </div>
      
      <div v-else>
        <div class="movie-grid">
          <div v-for="movie in paginatedMovies" :key="movie.id" class="movie-card">
            <div class="movie-poster">
              <img :src="movie.image" :alt="movie.title" />
              <div class="movie-overlay">
                <span class="rating">⭐ {{ movie.rating }}</span>
                <span class="year">{{ movie.year }}</span>
              </div>
            </div>
            <div class="movie-details">
              <h3>{{ movie.title }}</h3>
              <div class="genres">
                <span v-for="genre in movie.genres.slice(0, 2)" :key="genre" class="genre-tag">
                  {{ genre }}
                </span>
              </div>
              <p class="summary">{{ movie.summary.slice(0, 100) }}...</p>
              <button class="add-btn">+ Watchlist</button>
            </div>
          </div>
        </div>

        <!-- Contrôles de pagination -->
        <div class="pagination">
          <button 
            @click="prevPage" 
            :disabled="currentPage === 1"
            class="page-btn"
          >
            Précédent
          </button>
          
          <div class="page-numbers">
            <button 
              v-for="page in totalPages" 
              :key="page"
              @click="goToPage(page)"
              :class="['page-number', { active: currentPage === page }]"
              v-show="page === 1 || page === totalPages || (page >= currentPage - 2 && page <= currentPage + 2)"
            >
              {{ page }}
            </button>
          </div>

          <button 
            @click="nextPage" 
            :disabled="currentPage === totalPages"
            class="page-btn"
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.discovery-page {
  padding: 3rem 2rem;
  background-color: #121212;
  color: #fff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 3rem;
  text-align: center;
}

.page-header h1 {
  font-size: 3rem;
  color: #e50914;
  margin-bottom: 1rem;
}

.page-header p {
  color: #aaa;
  font-size: 1.1rem;
}

/* Grille et Cartes */
.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.movie-card {
  background: #1f1f1f;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s;
}

.movie-card:hover {
  transform: translateY(-8px);
}

.movie-poster {
  position: relative;
  height: 320px;
}

.movie-poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.movie-overlay {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0,0,0,0.7);
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.85rem;
  display: flex;
  gap: 8px;
}

.rating { color: #f1c40f; }

.movie-details {
  padding: 1.2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.movie-details h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}

.genres {
  display: flex;
  gap: 5px;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.genre-tag {
  background: #333;
  color: #ccc;
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 4px;
}

.summary {
  font-size: 0.85rem;
  color: #bbb;
  margin-bottom: 1.5rem;
  flex: 1;
}

.add-btn {
  background-color: transparent;
  color: #e50914;
  border: 1px solid #e50914;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.add-btn:hover {
  background-color: #e50914;
  color: white;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-top: 4rem;
  padding: 2rem 0;
}

.page-btn {
  background: #e50914;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.page-btn:disabled {
  background: #333;
  color: #666;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 0.5rem;
}

.page-number {
  background: #1f1f1f;
  color: white;
  border: 1px solid #333;
  width: 40px;
  height: 40px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.page-number.active {
  background: #e50914;
  border-color: #e50914;
}

.loading-state {
  text-align: center;
  margin-top: 5rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #333;
  border-top: 4px solid #e50914;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
