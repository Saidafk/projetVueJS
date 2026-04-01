<template>
  <div class="watchlist-page">
    <div class="container">
      <h1>Ma Watchlist</h1>
      
      <div class="add-movie-box">
        <p class="placeholder-text">
          Bientôt ici : Formulaire multi-étapes pour ajouter un film !
        </p>
      </div>

      <div class="movie-list">
        <p class="empty-message">Aucun film dans votre watchlist pour le moment.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.watchlist-page {
  padding: 3rem 2rem;
  min-height: calc(100vh - 70px);
}

.container {
  max-width: 1000px;
  margin: 0 auto;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #ffffff;
  border-bottom: 2px solid #e50914;
  display: inline-block;
  padding-bottom: 0.5rem;
}

.add-movie-box {
  background-color: #1f1f1f;
  border: 1px dashed #e50914;
  border-radius: 12px;
  padding: 3rem;
  text-align: center;
  margin-bottom: 3rem;
  transition: transform 0.3s;
}

.add-movie-box:hover {
  transform: translateY(-5px);
}

.placeholder-text {
  color: #aaaaaa;
  font-size: 1.2rem;
  font-style: italic;
}

.empty-message {
  color: #888888;
  font-size: 1.1rem;
  text-align: center;
  margin-top: 4rem;
}
</style>
