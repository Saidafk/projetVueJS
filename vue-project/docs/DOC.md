# 📄 Documentation Technique - CinéList

Ce document explique l'organisation du projet, le rôle de chaque fichier et comment l'application gère les données (API + LocalStorage).

---

## 🏗️ Structure du Projet

### 📂 /src/services
C'est ici que sont regroupés les services qui gèrent les données.
- **`api.js`** : Gère les appels HTTP à TVMaze. Désormais capable de boucler sur plusieurs pages pour charger plus de 1000 films.
- **`storage.js`** : Gère la persistance de la Watchlist, des Favoris et des Critiques dans le `localStorage` sous format JSON.

### 📂 /src/views
- **`HomeView.vue`** : Présentation du projet CinéList.
- **`DiscoveryView.vue`** : Logiciel central d'affichage. Gère la pagination de 10 en 10 et les notifications.
- **`WatchlistView.vue`** : Affiche les films de la liste de visionnage.
- **`FavorisView.vue`** : Affiche les favoris et héberge le **formulaire multi-étapes** de critiques.
- **`ReviewsView.vue`** : **(Nouveau)** Galerie centralisée de toutes les critiques rédigées.

### 📂 /src/components
- **`NavBar.vue`** : Navigation dynamique avec barre de recherche (en cours) et liens actifs.

---

## 🌐 Gestion des Données

### API Externe (TVMaze)
- **URL de base :** `https://api.tvmaze.com/shows?page=[index]`
- **Pagination API :** Chargement de 4 pages (1000 titres).

### Persistance (LocalStorage)
- **`cinelist_watchlist`** : Liste de visionnage.
- **`cinelist_favoris`** : Films étoilés.
- **`cinelist_reviews`** : Critiques utilisateur (Notes de 1 à 5, dates et commentaires).

---

## 🛠️ Concepts Mis en Place

1.  **Formulaire Multi-étapes :** Système de "stepper" dans `FavorisView.vue` avec validation conditionnelle (le bouton "Suivant" se débloque au fur et à mesure).
2.  **Transitions Vue :** Animation des fenêtres modales et des toasts de notification.
3.  **Persistance d'Objets Complexes :** Sauvegarde des critiques incluant les métadonnées des films (Titre/Image) pour un affichage indépendant dans la galerie.

---

## 🔄 Gestion des Branches (Git)

- **`main`** : Version stable.
- **`dev`** : Branche d'intégration principale.
- **`feature/navbar`** : Création de la navigation et structure de base.
- **`feature/critique`** : Développement du formulaire multi-étapes et de la galerie de critiques.
- **`api`** : Travail sur la récupération de données massives.
