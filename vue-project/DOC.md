# 📄 Documentation Technique - CinéList

Ce document explique l'organisation du projet, le rôle de chaque fichier et comment l'application gère les données (API + LocalStorage).

---

## 🏗️ Structure du Projet

### 📂 /src/services
C'est ici que sont regroupés les services qui gèrent les données.
- **`api.js`** : Gère les appels HTTP à TVMaze. Désormais capable de boucler sur plusieurs pages pour charger plus de 1000 films.
- **`storage.js`** : **(Nouveau)** Gère la persistance des données. Utilise le `localStorage` du navigateur pour sauvegarder la Watchlist et les Favoris. Les données sont stockées sous format JSON.

### 📂 /src/views
- **`HomeView.vue`** : Présentation du projet CinéList.
- **`DiscoveryView.vue`** : Logiciel central d'affichage. Gère la pagination de 10 en 10, le chargement des données API et le système de notifications (Toasts).
- **`WatchlistView.vue`** : Affiche les films récupérés depuis le `localStorage`. Permet la suppression unitaire.
- **`FavorisView.vue`** : Affiche les films marqués d'une étoile (favoris). Permet de retirer un titre des favoris.

### 📂 /src/components
- **`NavBar.vue`** : Barre de navigation adaptative avec indicateurs visuels de la page active.

---

## 🌐 Gestion des Données

### API Externe (TVMaze)
- **Point d'accès :** `https://api.tvmaze.com/shows?page=[index]`
- **Méthode :** `GET`
- **Capacité de chargement :** Environ 250 titres par page. Le projet est configuré pour charger les 4 premières pages (soit ~1000 titres).

### Persistance (LocalStorage)
Toutes les actions utilisateur sont mémorisées localement :
- **Clé `cinelist_watchlist`** : Tableau d'objets films ajoutés par l'utilisateur.
- **Clé `cinelist_favoris`** : Tableau d'objets films marqués en favoris.

---

## 🛠️ Concepts Mis en Place

1.  **Boucles Asynchrones :** Utilisation de `async/await` dans une boucle `for` pour récupérer plusieurs pages de l'API.
2.  **Computed Properties (Vue) :** Utilisation de `computed` pour filtrer et découper dynamiquement la liste des films (Pagination).
3.  **Transitions Vue :** Animation des toasts de notification lors des ajouts pour une meilleure expérience utilisateur.
4.  **Helper Storage :** Centralisation des accès au `localStorage` pour éviter les erreurs de parsing JSON.

---

## 🔄 Gestion des Branches (Git)

- **`main`** : Version stable de production.
- **`dev`** : Branche principale pour l'intégration des nouvelles fonctionnalités.
- **`api`** : Branche dédiée à la récupération massive des données et services de stockage.
