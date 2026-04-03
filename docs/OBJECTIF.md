# 🎯 Objectifs & Roadmap — CinéList

Ce document suit l'état d'avancement des fonctionnalités et des critères techniques du projet.

---

## 🏗️ Architecture & Core
- [x] **Composants Vue 3 personnalisés** : Utilisation du pattern `<script setup>`.
- [x] **Consommation d'APIs REST** : TVMaze (Films) & Gouv.fr (Cinémas).
- [x] **Tests unitaires** : Environnement configuré avec **Vitest**.
- [x] **Pipeline CI/CD** : Déploiement automatique via GitHub Actions sur VPS.
- [x] **Bibliothèque UI** : Intégration de **PrimeVue 4** pour les composants interactifs.

## 🎨 Expérience Utilisateur (UX/UI)
- [x] **Formulaire intelligent** : Stepper multi-étapes pour les critiques avec validation.
- [x] **Transitions fluides** : Animations entre les pages et modales (Vue Transitions).
- [x] **Indicateurs dynamiques** : Badges sur la NavBar (Favoris/Watchlist).
- [x] **Mode Sombre** : Design immersif type "streaming" (Dark Mode natif).

## 📱 Web APIs & Ressources Internes
- [x] **Persistance locale** : Gestion via `localStorage` (Watchlist, Favoris, Critiques).
- [x] **GéoLocalisation** : Recherche des cinémas via l'API du Ministère de la Culture.
- [x] **Notifications Toasts** : Système de feedback visuel interne.
- [x] **Progressive Web App (PWA)** : Application installable, Manifest & Service Worker.
- [x] **Badging API** : Mise à jour du badge de l'icône de l'application.
- [x] **Web Share API** : Partage natif ou fallback vers le presse-papiers.
- [ ] **Contact Picker** ❌ : Non implémenté (Usage de `navigator.contacts` limité par les navigateurs).
- [ ] **Touch Events** ❌ : Gestion du swipe ou long-press (En attente).

---

## 💡 Notes de développement
*   **PrimeVue** : Le thème **Aura** a été choisi pour son élégance et sa modularité.
*   **Sécurité HTTPS** : Obligatoire pour la GéoLocalisation et les APIs Open Data.
*   **Stockage** : Les données sont structurées en JSON dans le `localStorage` pour une lecture performante.

---

## 📅 Historique Récent
*   **Mars 2026** : Optimisation responsive du layout et de la pagination.
*   **Février 2026** : Mise en place du Docker multi-stage pour la production.
*   **Janvier 2026** : Finalisation du formulaire de critiques en 3 étapes.
