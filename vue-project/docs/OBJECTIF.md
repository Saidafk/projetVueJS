# 🎯 Objectifs du Projet - CinéList

Voici l'état d'avancement des critères requis pour le projet.

## 🏗️ Architecture & Core
- [x] **Composant NavBar .vue personnalisé** ✅ (Présent dans `src/components/NavBar.vue`)
- [x] **Utilisation d'API avec appels REST** ✅ (TVMaze pour les films, Gouv.fr pour les cinémas)
- [x] **Utilisation d'un environnement de test** ✅ (Vitest configuré avec tests unitaires)
- [x] **Mise en production avec CI/CD sur VPS** ✅ (Workflow GitHub Actions opérationnel)
- [x] **Utilisation d'une bibliothèque de composants** ✅ (PrimeVue installé avec comparatif dans `docs/COMPARATIF.md`)

## 🎨 Expérience Utilisateur (UX/UI)
- [x] **Formulaire sur plusieurs étapes** ✅ (Critiques dans `FavorisView.vue` avec bouton précédent)
- [x] **Transitions entre les pages** ✅ (Ajoutées dans `App.vue` avec effet de fondu)
- [x] **Nombre d'alerte (Badge)** ✅ (Badge dynamique sur le lien "Favoris" dans la NavBar)

## 📱 Ressources Internes & Web APIs
- [x] **Stockage interne** ✅ (Gestion via `localStorage` dans `storage.js`)
- [x] **GéoLocalisation** ✅ (Recherche des cinémas via l'API du Ministère de la Culture)
- [x] **Notifications** ✅ (Toasts CSS + API `Notification` native intégrée)
- [ ] **Partage** ❌ (Utilisation de `navigator.share`)
- [ ] **Contact Picker** ❌ (Utilisation de `navigator.contacts`)
- [ ] **Touch events** ❌ (Gestion du swipe ou du long-press sur mobile)

---

## 💡 Notes pour la suite
Pour valider les points manquants rapidement, je te conseille de :
1. **Bibliothèque :** Installer `PrimeVue` pour tes boutons et modales.
2. **Transition :** Envelopper ton `<RouterView>` dans une balise `<Transition>` dans `App.vue`.
3. **Badge :** Ajouter un petit rond rouge sur le lien "Favoris" qui affiche `favoris.length`.
