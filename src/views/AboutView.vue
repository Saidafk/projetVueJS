<template>
  <div class="about-page-container">
    <div class="about-content">
      <h1 class="about-title">À Propos de CinéList</h1>
      <p class="about-description">
        Bienvenue sur CinéList, votre collection personnelle de films à voir et à ne pas oublier.
        Cette application est conçue pour vous aider à suivre les films que vous souhaitez regarder,
        ceux que vous avez aimés, et ceux que vous découvrez.
      </p>
      <section class="about-section">
        <h2>Notre Mission</h2>
        <p>
          Notre objectif est de créer une plateforme simple et intuitive pour tous les cinéphiles.
          Nous croyons que le cinéma est une forme d'art puissante qui mérite d'être explorée et partagée.
          CinéList vous permet de centraliser vos découvertes, vos favoris et vos critiques.
        </p>
      </section>
      <section class="about-section">
        <h2>Développement</h2>
        <p>
          Cette application est développée avec Vue.js, une bibliothèque JavaScript progressive pour construire des interfaces utilisateur.
          Elle utilise des technologies modernes pour offrir une expérience fluide et réactive.
        </p>
      </section>
      <!-- Add more sections as needed, e.g., Contact, Team -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutView',
  // Add any component-specific logic here if needed
};
</script>

<style scoped>
.about-page-container {
  max-width: 900px;
  margin: 40px auto;
  padding: 30px;
  background-color: #1a1a1a; /* Dark background */
  color: #e0e0e0; /* Light text color */
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.about-content {
  text-align: center;
}

.about-title {
  font-size: 2.8em;
  color: #e50914; /* Reddish color, similar to movie themes */
  margin-bottom: 20px;
  font-weight: bold;
}

.about-description {
  font-size: 1.1em;
  line-height: 1.6;
  margin-bottom: 30px;
  color: #b0b0b0;
}

.about-section {
  margin-top: 40px;
  text-align: left;
  background-color: #2c2c2c;
  padding: 25px;
  border-radius: 6px;
}

.about-section h2 {
  color: #e50914;
  font-size: 1.8em;
  margin-bottom: 15px;
  border-bottom: 2px solid #e50914;
  padding-bottom: 5px;
}

.about-section p {
  font-size: 1em;
  line-height: 1.7;
  color: #d0d0d0;
}
</style>
