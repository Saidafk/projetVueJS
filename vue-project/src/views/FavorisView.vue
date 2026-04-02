<script setup>
import { ref, onMounted } from 'vue';
import { getFavoris, removeFromFavoris, saveReview, getReviewByMovie } from '../services/storage';
import Button from 'primevue/button';
import Rating from 'primevue/rating';

const favoris = ref([]);
const isModalOpen = ref(false);
const currentStep = ref(1);
const selectedMovie = ref(null);

// Données du formulaire
const reviewData = ref({
  rating: 5,
  comment: ''
});

const loadFavoris = () => {
  favoris.value = getFavoris().map(movie => ({
    ...movie,
    hasReview: !!getReviewByMovie(movie.id)
  }));
};

onMounted(() => {
  loadFavoris();
});

const handleRemove = (movieId) => {
  removeFromFavoris(movieId);
  loadFavoris();
};

// Gestion du formulaire
const openReviewModal = (movie) => {
  selectedMovie.value = movie;
  const existingReview = getReviewByMovie(movie.id);
  if (existingReview) {
    reviewData.value = { rating: existingReview.rating, comment: existingReview.comment };
  } else {
    reviewData.value = { rating: 5, comment: '' };
  }
  currentStep.value = 1;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedMovie.value = null;
};

const nextStep = () => {
  if (currentStep.value < 3) currentStep.value++;
};

const prevStep = () => {
  if (currentStep.value > 1) currentStep.value--;
};

const submitReview = () => {
  saveReview(selectedMovie.value.id, {
    title: selectedMovie.value.title,
    image: selectedMovie.value.image,
    rating: reviewData.value.rating,
    comment: reviewData.value.comment,
    date: new Date().toLocaleDateString()
  });
  loadFavoris();
  closeModal();
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
            
            <div class="actions">
              <button @click="openReviewModal(movie)" class="review-btn">
                {{ movie.hasReview ? 'Modifier ma critique' : 'Faire une critique' }}
              </button>
              <button @click="handleRemove(movie.id)" class="remove-btn">Retirer</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL FORMULAIRE MULTI-ÉTAPES -->
    <Transition name="fade">
      <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
          <header class="modal-header">
            <h2>Critique : {{ selectedMovie?.title }}</h2>
            <button class="close-x" @click="closeModal">×</button>
          </header>

          <div class="stepper">
            <div :class="['step-dot', { active: currentStep >= 1 }]">1</div>
            <div class="step-line"></div>
            <div :class="['step-dot', { active: currentStep >= 2 }]">2</div>
            <div class="step-line"></div>
            <div :class="['step-dot', { active: currentStep >= 3 }]">3</div>
          </div>

          <!-- ÉTAPE 1 : NOTE -->
          <div v-if="currentStep === 1" class="step-content">
            <h3>Étape 1 : Quelle note donneriez-vous ?</h3>
            <div class="rating-input">
              <Rating v-model="reviewData.rating" :stars="5" :cancel="false" />
            </div>
            <p class="rating-text">{{ reviewData.rating }} / 5</p>
          </div>

          <!-- ÉTAPE 2 : COMMENTAIRE -->
          <div v-if="currentStep === 2" class="step-content">
            <h3>Étape 2 : Votre avis détaillé</h3>
            <textarea 
              v-model="reviewData.comment" 
              placeholder="Qu'avez-vous pensé de ce film ?"
              rows="5"
            ></textarea>
          </div>

          <!-- ÉTAPE 3 : CONFIRMATION -->
          <div v-if="currentStep === 3" class="step-content">
            <h3>Étape 3 : Récapitulatif</h3>
            <div class="summary-box">
              <p><strong>Note :</strong> {{ reviewData.rating }} / 5</p>
              <p><strong>Commentaire :</strong></p>
              <p class="comment-preview">{{ reviewData.comment || 'Aucun commentaire.' }}</p>
            </div>
          </div>

          <footer class="modal-footer">
            <Button v-if="currentStep > 1" @click="prevStep" label="Précédent" severity="secondary" />
            <Button v-if="currentStep < 3" @click="nextStep" label="Suivant" :disabled="currentStep === 2 && !reviewData.comment" />
            <Button v-if="currentStep === 3" @click="submitReview" label="Publier ma critique" severity="success" />
          </footer>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.favoris-page { padding: 3rem 2rem; background-color: #121212; color: #fff; min-height: 100vh; }
.container { max-width: 1200px; margin: 0 auto; }
h1 { font-size: 2.5rem; margin-bottom: 2rem; color: #f1c40f; }

.movie-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 2rem; }
.movie-card { background: #1f1f1f; border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; border: 1px solid #333; }
.movie-poster { position: relative; height: 350px; }
.movie-poster img { width: 100%; height: 100%; object-fit: cover; }
.movie-overlay { position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.7); padding: 5px 10px; border-radius: 12px; }

.movie-details { padding: 1.5rem; flex: 1; display: flex; flex-direction: column; }
.movie-details h3 { margin-bottom: 0.5rem; }
.summary { font-size: 0.9rem; color: #bbb; margin-bottom: 1.5rem; flex: 1; }

.actions { display: flex; flex-direction: column; gap: 10px; }
.review-btn { background: #f1c40f; color: #333; border: none; padding: 0.7rem; border-radius: 6px; font-weight: bold; cursor: pointer; transition: 0.3s; }
.review-btn:hover { background: #d4ac0d; }
.remove-btn { background: transparent; color: #888; border: 1px solid #444; padding: 0.5rem; border-radius: 6px; cursor: pointer; transition: 0.3s; }
.remove-btn:hover { color: #e50914; border-color: #e50914; }

/* MODAL STYLES */
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); display: flex; justify-content: center; align-items: center; z-index: 3000; padding: 20px; }
.modal-content { background: #1f1f1f; width: 100%; max-width: 500px; border-radius: 16px; border: 1px solid #333; overflow: hidden; display: flex; flex-direction: column; }

.modal-header { padding: 1.5rem; border-bottom: 1px solid #333; display: flex; justify-content: space-between; align-items: center; }
.modal-header h2 { font-size: 1.2rem; color: #f1c40f; margin: 0; }
.close-x { background: none; border: none; color: #888; font-size: 2rem; cursor: pointer; line-height: 1; }

.stepper { display: flex; align-items: center; justify-content: center; padding: 1.5rem; background: #262626; }
.step-dot { width: 30px; height: 30px; border-radius: 50%; background: #444; display: flex; justify-content: center; align-items: center; font-weight: bold; color: #888; }
.step-dot.active { background: #f1c40f; color: #333; }
.step-line { flex: 1; height: 2px; background: #444; margin: 0 10px; max-width: 50px; }

.step-content { padding: 2rem; flex: 1; min-height: 250px; text-align: center; }
.step-content h3 { margin-bottom: 1.5rem; font-size: 1.1rem; color: #eee; }

.rating-input { font-size: 3rem; display: flex; justify-content: center; gap: 10px; margin-bottom: 1rem; }
.star { cursor: pointer; color: #444; transition: color 0.2s; }
.star.filled { color: #f1c40f; }

textarea { width: 100%; background: #2a2a2a; border: 1px solid #444; border-radius: 8px; color: white; padding: 1rem; font-family: inherit; resize: none; }
textarea:focus { border-color: #f1c40f; outline: none; }

.summary-box { background: #2a2a2a; padding: 1.5rem; border-radius: 8px; text-align: left; }
.comment-preview { color: #aaa; font-style: italic; margin-top: 0.5rem; word-break: break-word; }

.modal-footer { padding: 1.5rem; border-top: 1px solid #333; display: flex; justify-content: space-between; gap: 1rem; }
.btn-primary, .btn-secondary, .btn-success { flex: 1; padding: 0.8rem; border-radius: 6px; font-weight: bold; cursor: pointer; border: none; transition: 0.3s; }
.btn-primary { background: #f1c40f; color: #333; }
.btn-secondary { background: #444; color: white; }
.btn-success { background: #2ecc71; color: white; }
.btn-primary:disabled { background: #444; cursor: not-allowed; opacity: 0.5; }

/* ANIMATION */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
