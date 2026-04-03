# 🏛️ Architecture & Structure du Projet — CinéList

Ce document détaille l'organisation technique de CinéList, le rôle des fichiers et la gestion des données (APIs + Stockage).

---

## 📂 Structure des Dossiers

### `src/services/` (Logique Métier)
C'est ici que sont regroupés les services qui gèrent les données.
*   **`api.js`** : Gère les appels HTTP à l'API **TVMaze**. Il charge jusqu'à 1000 films pour une base de données riche.
*   **`geo.js`** : Gère la GéoLocalisation native et l'interrogation de l'API **Open Data CNC** pour trouver les cinémas.
*   **`storage.js`** : Gère la persistance de la Watchlist, des Favoris et des Critiques dans le `localStorage` sous format JSON.
*   **`notifications.js`** : Service de notifications (Toasts) interne pour le feedback utilisateur.

### `src/views/` (Vues Principales)
*   **`HomeView.vue`** : Présentation du projet.
*   **`DiscoveryView.vue`** : Exploration des films avec pagination (10 par page).
*   **`WatchlistView.vue`** : Liste de visionnage personnelle.
*   **`FavorisView.vue`** : Favoris et **formulaire multi-étapes** de critiques.
*   **`ReviewsView.vue`** : Galerie centralisée de toutes les critiques utilisateur.
*   **`CinemasView.vue`** : Recherche des salles de cinémas à proximité (GPS).

### `src/components/` (Composants UI)
*   **`NavBar.vue`** : Navigation dynamique.
*   **`AppNotification.vue`** : Composant d'affichage des notifications.

---

## 🌐 Gestion des Données

### APIs Externes
*   **Films (TVMaze)** : `https://api.tvmaze.com/shows?page=[index]`
*   **Cinémas (CNC)** : Jeu de données `etablissements-cinematographiques`.
*   **⚠️ Important** : La GéoLocalisation et l'API CNC exigent impérativement une connexion **HTTPS**.

### Persistance (LocalStorage)
Toutes les données utilisateur sont sauvegardées sous les clés suivantes :
*   `cinelist_watchlist` : Liste de visionnage.
*   `cinelist_favoris` : Films étoilés.
*   `cinelist_reviews` : Critiques (Notes de 1 à 5, commentaires, dates).

---

## ⚙️ Choix Technologiques
*   **Vue 3 (Composition API)** : Pour une meilleure modularité du code.
*   **PrimeVue 4 (Thème Aura)** : Choisi pour sa flexibilité, son design moderne (Dark Mode) et son excellente accessibilité (WCAG).
*   **Vitest** : Pour les tests unitaires (que je n'ai pas mis en place pour le moment).
*   **Vite** : Pour un build ultra-rapide.

---

## 🔄 Gestion des Branches (Git)
*   `main` : Version stable.
*   `dev` : Branche d'intégration.
*   `feature/...` : Développement de fonctionnalités spécifiques.
