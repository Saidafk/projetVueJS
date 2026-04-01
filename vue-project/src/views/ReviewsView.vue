<script setup>
import { ref, onMounted } from 'vue';
import { getReviews } from '../services/storage';

const reviews = ref([]);

onMounted(() => {
  reviews.value = getReviews().sort((a, b) => {
    // Tri par date (plus récent en premier)
    const dateA = new Date(a.date.split('/').reverse().join('-'));
    const dateB = new Date(b.date.split('/').reverse().join('-'));
    return dateB - dateA;
  });
});

const getStarRating = (rating) => {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating);
};
</script>

<template>
  <div class="reviews-page">
    <div class="container">
      <h1>Toutes mes critiques 📝</h1>

      <div v-if="reviews.length === 0" class="empty-state">
        <p>Vous n'avez pas encore rédigé de critiques.</p>
        <RouterLink to="/favoris" class="link">Aller dans mes favoris</RouterLink>
      </div>

      <div v-else class="reviews-list">
        <div v-for="review in reviews" :key="review.movieId" class="review-card">
          <div class="movie-poster">
            <img :src="review.image || 'https://via.placeholder.com/210x295?text=Pas+d%27image'" :alt="review.title || 'Film'" />
          </div>
          <div class="review-content">
            <div class="review-header">
              <h3>{{ review.title || 'Titre inconnu' }}</h3>
              <span class="review-date">{{ review.date }}</span>
            </div>
            <div class="stars">{{ getStarRating(review.rating) }}</div>
            <p class="comment">"{{ review.comment }}"</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.reviews-page {
  padding: 3rem 2rem;
  background-color: #121212;
  color: #fff;
  min-height: 100vh;
}

.container {
  max-width: 900px;
  margin: 0 auto;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #42b983;
  text-align: center;
}

.empty-state {
  text-align: center;
  margin-top: 5rem;
  color: #aaa;
}

.link {
  color: #42b983;
  text-decoration: none;
  font-weight: bold;
}

.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.review-card {
  background: #1f1f1f;
  border-radius: 12px;
  display: flex;
  overflow: hidden;
  border: 1px solid #333;
  transition: transform 0.3s;
}

.review-card:hover {
  transform: translateX(10px);
  border-color: #42b983;
}

.movie-poster {
  width: 150px;
  height: 225px;
  flex-shrink: 0;
}

.movie-poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.review-content {
  padding: 1.5rem;
  flex: 1;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.review-header h3 {
  margin: 0;
  font-size: 1.4rem;
  color: #fff;
}

.review-date {
  font-size: 0.85rem;
  color: #666;
}

.stars {
  color: #f1c40f;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.comment {
  font-style: italic;
  line-height: 1.6;
  color: #bbb;
  font-size: 1.1rem;
}

@media (max-width: 600px) {
  .review-card {
    flex-direction: column;
  }
  .movie-poster {
    width: 100%;
    height: 300px;
  }
}
</style>
