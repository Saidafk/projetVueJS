<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="home">
    <div class="hero">
      <h1>CinéList</h1>
      <p>Votre collection personnelle de films à voir et à ne pas oublier.</p>
      <RouterLink to="/watchlist" class="cta-button">Commencer</RouterLink>
    </div>
    
    <div class="features">
      <div class="feature-card">
        <h3>Organisez</h3>
        <p>Gardez une trace de tous les films que vous souhaitez regarder.</p>
      </div>
      <div class="feature-card">
        <h3>Favoris</h3>
        <p>Marquez vos coups de cœur pour les retrouver facilement.</p>
      </div>
      <div class="feature-card">
        <h3>Simple</h3>
        <p>Une interface épurée pensée pour les amoureux du septième art.</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
  padding: 4rem 2rem;
  text-align: center;
}

.hero h1 {
  font-size: 4rem;
  font-weight: 900;
  color: #e50914;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.5rem;
  color: #666;
  max-width: 600px;
  margin-bottom: 2rem;
}

.cta-button {
  background-color: #e50914;
  color: white;
  padding: 1rem 2.5rem;
  border-radius: 4px;
  font-size: 1.2rem;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.3s, transform 0.2s;
}

.cta-button:hover {
  background-color: #f40612;
  transform: scale(1.05);
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1000px;
}

.feature-card {
  padding: 2rem;
  background: #1f1f1f;
  border-radius: 8px;
  color: white;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.feature-card h3 {
  color: #e50914;
  margin-bottom: 1rem;
}
</style>
