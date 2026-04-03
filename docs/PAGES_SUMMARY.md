# 📖 Résumé des Pages et Construction Technique

Ce document détaille le rôle de chaque page de l'application CinéList et explique les choix techniques et les outils utilisés pour leur construction.

---

## 🏗️ Architecture Globale

L'application est construite avec **Vue.js 3 (Composition API)**. La structure repose sur :
*   **Composants :** Réutilisables et modulaires (`NavBar.vue`, `AppNotification.vue`).
*   **Vues :** Pages principales orchestrées par `Vue Router`.
*   **Services :** Logique métier isolée pour les APIs, le stockage local et les fonctionnalités natives du navigateur.
*   **UI Framework :** **PrimeVue** (thème Aura) pour les composants interactifs (boutons, notes, modales).

---

## 🏠 Accueil (`HomeView.vue`)
*   **Rôle :** Point d'entrée visuel présentant l'application.
*   **Construction :** Template HTML simple avec du CSS Scoped pour un design type "plateforme de streaming". Utilise `RouterLink` pour une navigation interne sans rechargement.

---

## 🔍 Découverte (`DiscoveryView.vue`)
*   **Rôle :** Exploration du catalogue de films.
*   **Construction :** 
    *   **API :** Appels asynchrones à l'API TVMaze via le service `api.js`.
    *   **Pagination :** Logique de calcul (`computed`) pour afficher 10 titres par page sur un catalogue de plus de 1000 films.
    *   **Actions :** Intégration des services `storage.js` (sauvegarde locale), `share.js` (Web Share API) et `notifications.js` (toasts de succès).

---

## ⭐ Mes Favoris (`FavorisView.vue`)
*   **Rôle :** Gestion des films préférés et rédaction de critiques.
*   **Construction :**
    *   **Système de Stepper :** Formulaire multi-étapes (Note -> Commentaire -> Récapitulatif) construit avec des états réactifs (`ref`).
    *   **Composants PrimeVue :** Utilisation de `<Rating />` pour une saisie intuitive des notes.
    *   **Transitions :** Enveloppé dans une balise `<Transition>` pour une apparition fluide de la modale de critique.

---

## 📍 Cinémas à proximité (`CinemasView.vue`)
*   **Rôle :** Localisation des salles de cinéma autour de l'utilisateur.
*   **Construction :**
    *   **Géolocalisation :** Utilisation de l'API native `navigator.geolocation`.
    *   **Open Data :** Interrogation de l'API du Ministère de la Culture (CNC) pour récupérer les établissements cinématographiques.
    *   **⚠️ Point Critique :** Cette page nécessite impérativement un déploiement en **HTTPS**. L'API de géolocalisation et l'accès aux données du CNC sont bloqués par les navigateurs modernes si la connexion n'est pas sécurisée (SSL). En HTTP, la recherche ne fonctionnera pas.

---

## 📝 Mes Critiques (`ReviewsView.vue`)
*   **Rôle :** Historique personnel des avis rédigés.
*   **Construction :**
    *   **Tri Dynamique :** Les données sont récupérées du `localStorage` et triées par date via JavaScript pour afficher les critiques les plus récentes en premier.
    *   **Design :** Layout en liste optimisé pour la lecture, avec rappel visuel de l'affiche du film.

---

## 📺 Ma Watchlist (`WatchlistView.vue`)
*   **Rôle :** Liste des films à voir plus tard.
*   **Construction :** 
    *   **Persistance :** Lecture directe dans le `localStorage` via le service dédié.
    *   **Réactivité :** Mise à jour instantanée de l'affichage lors de la suppression d'un titre.

---

## 📱 Navigation & Global (`App.vue` & `main.js`)
*   **Layout :** `App.vue` définit le cadre global avec la `NavBar` et la zone de contenu animée par des transitions CSS (`page-fade`).
*   **PWA :** Gestion des badges sur l'icône de l'application via `navigator.setAppBadge` pour refléter le nombre de favoris/films en attente.
