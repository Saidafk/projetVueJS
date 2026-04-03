# 🎬 CinéList — Votre compagnon cinéma intelligent

CinéList est une application web moderne (PWA) construite avec **Vue.js 3** et **PrimeVue**. Elle permet d'explorer un catalogue massif de films, de gérer ses listes personnelles, de rédiger des critiques détaillées et même de trouver les cinémas les plus proches de chez soi.

---

## ✨ Points Forts du Projet

*   **⚡ Performance & Fluidité :** Propulsé par Vite, avec des transitions de pages soignées et un design "Dark Mode" immersif.
*   **📚 Catalogue Étendu :** Plus de 1000 titres récupérés dynamiquement via l'API **TVMaze**.
*   **📍 Géolocalisation Intelligente :** Recherche de cinémas à proximité via l'API officielle du **CNC** (Ministère de la Culture).
*   **📝 Critiques Multi-étapes :** Un formulaire intelligent (Stepper) pour noter et commenter vos films favoris.
*   **💾 Persistance Totale :** Vos listes (Watchlist, Favoris, Critiques) sont sauvegardées localement via `localStorage`.
*   **📱 Expérience PWA :** Installable sur mobile avec gestion des badges dynamiques et partage natif.
*   **🐳 Prêt pour la Prod :** Configuration Docker multi-stage et workflow CI/CD GitHub Actions opérationnel.

---

## 🛠️ Stack Technique

*   **Frontend :** [Vue.js 3](https://vuejs.org/) (Composition API), [PrimeVue 4](https://primevue.org/) (Thème Aura)
*   **Build Tool :** [Vite](https://vitejs.dev/)
*   **Routing :** Vue Router
*   **Tests :** [Vitest](https://vitest.dev/)
*   **APIs Externes :** TVMaze API, API Open Data Gouv (CNC)
*   **DevOps :** Docker, Docker Compose, Nginx, GitHub Actions

---

## 🚀 Démarrage Rapide

### Installation Locale

1. **Cloner le projet**
   ```bash
   git clone <url-du-depot>
   cd projetVueJS
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer en mode développement**
   ```bash
   npm run dev
   ```
   L'application sera disponible sur `http://localhost:5173`.

---

## 🐳 Déploiement Docker

Pour lancer l'application dans un conteneur avec Nginx :
```bash
docker compose -f deploy/docker-compose.yml up --build -d
```

---

## 📚 Documentation Complète

Le projet dispose d'une documentation détaillée située dans le dossier `/docs` :

*   [📖 Résumé des Pages](./docs/PAGES_SUMMARY.md) : Détails sur le rôle et la construction de chaque vue.
*   [🎯 Objectifs & Roadmap](./docs/OBJECTIF.md) : Suivi des fonctionnalités et critères techniques.
*   [🚀 Guide de Déploiement VPS](./docs/DEPLOY.md) : Procédure pour le déploiement sur serveur Debian/Ubuntu.
*   [🔐 Liaison Domaine & SSL](./docs/DOMAIN_HTTPS_SETUP.md) : Configurer DuckDNS et le HTTPS (Certbot).
*   [🛠️ Debug CI/CD & SSH](./docs/CICD_DEBUG.md) : Résolution des problèmes de workflow GitHub Actions.
*   [📊 Comparatif UI](./docs/COMPARATIF.md) : Pourquoi avoir choisi PrimeVue ?

---

## ⚠️ Note Importante (HTTPS)
La fonctionnalité de **Géolocalisation des Cinémas** nécessite impérativement une connexion **HTTPS** pour fonctionner correctement. En HTTP simple, les navigateurs bloquent l'accès à la position GPS de l'utilisateur.

---

## 📄 Licence
Projet réalisé dans un but pédagogique. Utilisation libre pour l'apprentissage.

## Amélioration 

Passer de nginx à caddy pour avoir un certificat automatique 
