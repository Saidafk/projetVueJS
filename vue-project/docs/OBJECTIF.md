# 🎯 Objectifs du Projet - CinéList

Voici l'état d'avancement des critères requis pour le projet.

## 🏗️ Architecture & Core
- [x] **Composant NavBar .vue personnalisé** ✅ (Présent dans `src/components/NavBar.vue`)
- [x] **Utilisation d'API avec appels REST** ✅ (TVMaze pour les films, Gouv.fr pour les cinémas)
- [x] **Utilisation d'un environnement de test** ✅ (Vitest configuré avec tests unitaires)
- [x] **Mise en production avec CI/CD sur VPS** ✅ (Workflow GitHub Actions opérationnel)
- [ ] **Utilisation d'une bibliothèque de composants** ❌ (Actuellement en CSS pur. *Action : Installer PrimeVue ou Vuetify*)

## 🎨 Expérience Utilisateur (UX/UI)
- [x] **Formulaire sur plusieurs étapes** ✅ (Critiques dans `FavorisView.vue` avec bouton précédent)
- [ ] **Transitions entre les pages** ❌ (Pas encore d'animation dans `App.vue`)
- [ ] **Nombre d'alerte (Badge)** ❌ (Afficher le nombre de favoris sur l'icône du menu)

## 📱 Ressources Internes & Web APIs
- [x] **Stockage interne** ✅ (Gestion via `localStorage` dans `storage.js`)
- [x] **GéoLocalisation** ✅ (Recherche des cinémas via l'API du Ministère de la Culture)
- [⚠️] **Notifications** ⚠️ (Toasts CSS présents, mais l'API `Notification` native reste à intégrer)
- [ ] **Partage** ❌ (Utilisation de `navigator.share`)
- [ ] **Contact Picker** ❌ (Utilisation de `navigator.contacts`)
- [ ] **Touch events** ❌ (Gestion du swipe ou du long-press sur mobile)

---

## 💡 Notes pour la suite
Pour valider les points manquants rapidement, je te conseille de :
1. **Bibliothèque :** Installer `PrimeVue` pour tes boutons et modales.
2. **Transition :** Envelopper ton `<RouterView>` dans une balise `<Transition>` dans `App.vue`.
3. **Badge :** Ajouter un petit rond rouge sur le lien "Favoris" qui affiche `favoris.length`.
