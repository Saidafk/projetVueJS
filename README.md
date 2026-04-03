# 🎬 CinéList: Votre Portail de Films & Séries Personnalisé

CinéList est une application web moderne développée avec **Vue.js 3** et **PrimeVue**, conçue pour vous aider à découvrir, organiser et noter vos films et séries préférés. Explorez un vaste catalogue, gérez votre watchlist, sauvegardez vos favoris, rédigez des critiques détaillées et découvrez les cinémas à proximité.

---

## ✨ Fonctionnalités Clés

*   **Découverte Étendue :** Parcourez un catalogue riche de milliers de titres récupérés via l'API TVMaze, avec une pagination fluide.
*   **Gestion Personnelle :**
    *   **Watchlist :** Ajoutez des titres à votre liste de visionnage, sauvegardée localement.
    *   **Favoris :** Marquez vos coups de cœur pour un accès rapide.
    *   **Critiques Détaillées :** Rédigez des avis complets grâce à un formulaire interactif en plusieurs étapes, avec la possibilité de revenir en arrière.
    *   **Galerie d'Avis :** Consultez un espace dédié à toutes vos critiques rédigées, enrichi d'images et de notes.
*   **Géolocalisation :** Trouvez les cinémas près de chez vous en utilisant votre position GPS et l'API Open Data du Ministère de la Culture (CNC).
*   **Notifications :** Recevez des confirmations visuelles via un système de "toasts" intégré.
*   **Expérience PWA :** Profitez d'une application installable, de badges interactifs et d'un mode sombre personnalisable pour une expérience utilisateur immersive.
*   **Partage Facilité :** Partagez des titres ou des informations via l'API Web Share (`navigator.share`) ou le presse-papiers.

---

## 🛠️ Technologies Utilisées

*   **Frontend :** Vue.js 3, Vue Router, PrimeVue (pour les composants UI et l'accessibilité)
*   **APIs :** TVMaze (catalogue films/séries), API Open Data CNC (cinémas)
*   **Stockage :** `localStorage` (pour la persistance des données utilisateur : watchlist, favoris, critiques)
*   **Tests :** Vitest (tests unitaires)
*   **CI/CD :** GitHub Actions
*   **Déploiement :** Docker, Docker Compose, Nginx, VPS (avec configuration SSH sécurisée)

---

## 🚀 Installation & Lancement

### Prérequis
- Node.js (version compatible avec le projet)
- npm ou yarn

### Étapes
1.  **Cloner le dépôt :**
    ```bash
    git clone <URL_DE_VOTRE_DEPOT>
    cd <NOM_DU_PROJET>
    ```
2.  **Installer les dépendances :**
    ```bash
    npm install
    # ou
    # yarn install
    ```
3.  **Lancer le serveur de développement :**
    ```bash
    npm run dev
    # ou
    # yarn dev
    ```
    L'application sera accessible à `http://localhost:5173` (ou le port configuré par Vite).

---

## 🐳 Déploiement

Le projet inclut des configurations pour le déploiement via Docker et sur un VPS.

- Pour le déploiement local avec Docker, consultez `docs/DOCKER_DEPLOY.md`.
- Pour le déploiement sur un VPS, référez-vous à `docs/DEPLOY.md` et `docs/CICD_DEBUG.md` pour la configuration CI/CD avec GitHub Actions et SSH.

---

## 📄 Documentation Détaillée

Pour une compréhension approfondie de l'architecture, du code et des fonctionnalités, veuillez consulter le répertoire `docs/`. Vous y trouverez des informations sur :

*   [Objectifs du Projet](./docs/OBJECTIF.md)
*   [Architecture & Services](./docs/DOC.md)
*   [Procédure de Déploiement VPS](./docs/DEPLOY.md)
*   [Configuration Docker Locale](./docs/DOCKER_DEPLOY.md)
*   [Débogage CI/CD & SSH](./docs/CICD_DEBUG.md)
*   [Comparatif Bibliothèques UI](./docs/COMPARATIF.md)

---

## 📝 Licence

Ce projet est développé dans le cadre d'un apprentissage et peut être utilisé à des fins éducatives.

```