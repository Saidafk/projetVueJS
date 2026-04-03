# 🧪 Documentation des Tests — CinéList

Ce document explique l'organisation des tests unitaires et d'intégration du projet CinéList, les technologies utilisées et comment interpréter les résultats.

---

## 🛠️ Outils de Test
*   **Vitest** : Le framework de test (le "moteur") qui exécute les scripts de test.
*   **Vue Test Utils** : La bibliothèque officielle pour monter les composants Vue et simuler les interactions (clics, saisie).
*   **JSDOM** : Un environnement qui simule un navigateur dans ton terminal.

---

## 📂 Organisation des Fichiers

### 1. Tests des Services (Logique métier) - `src/services/__tests__/`
*   **`api.spec.js`** : Vérifie que les données reçues de l'API externe (TVMaze) sont correctement nettoyées et transformées (ex: retrait des balises HTML des résumés).
*   **`storage.spec.js`** : Assure que la Watchlist et les Favoris sont bien enregistrés dans le `localStorage` et qu'on ne peut pas ajouter deux fois le même film.
*   **`share.spec.js`** : Teste le mécanisme de partage. Il vérifie que l'app utilise l'API native `navigator.share` sur mobile, et bascule sur le presse-papiers sur PC.
*   **`geo.spec.js`** : Vérifie que les coordonnées GPS et les données des cinémas (CNC) sont correctement traitées.

### 2. Tests des Vues (Pages) - `src/views/__tests__/`
*   **`DiscoveryView.spec.js`** : Teste le chargement des films, l'affichage du spinner de chargement et le fonctionnement de la pagination (10 par page).
*   **`FavorisView.spec.js`** : Vérifie le fonctionnement du **formulaire multi-étapes**. Il simule le passage de l'étape 1 (note) à l'étape 3 (récapitulatif).
*   **`CinemasView.spec.js`** : Teste la gestion des erreurs de géolocalisation (ex: si l'utilisateur refuse l'accès à sa position).
*   **`WatchlistView.spec.js`** & **`ReviewsView.spec.js`** : Vérifient que les listes de films et de critiques stockées s'affichent correctement.

### 3. Tests des Composants - `src/components/__tests__/`
*   **`NavBar.spec.js`** : Vérifie que tous les liens de navigation sont présents et que le badge rouge (nombre de favoris) apparaît bien.

---

## ⚠️ Comprendre les Cas d'Erreurs

Voici les erreurs courantes que tu peux rencontrer lors des tests et comment les résoudre :

### 1. "Cannot call trigger on an empty DOMWrapper"
*   **Cause** : Le test a essayé de cliquer sur un bouton avant qu'il ne soit affiché (souvent à cause d'un chargement asynchrone).
*   **Solution** : Ajouter `await wrapper.vm.$nextTick()` ou `await new Promise(resolve => setTimeout(resolve, 0))` pour laisser le temps au composant de se mettre à jour.

### 2. "[Vue Router warn]: No match found for location..."
*   **Cause** : Le composant contient des liens (`RouterLink`) vers des pages que le routeur de test ne connaît pas.
*   **Solution** : Déclarer les routes manquantes dans le `createRouter` à l'intérieur du fichier de test.

### 3. "AssertionError: expected undefined to deeply equal..."
*   **Cause** : Le format des données simulées (le "mock") ne correspond pas à ce que le code attend réellement.
*   **Solution** : Vérifier que les noms des propriétés (ex: `record.cp` vs `record.zip`) correspondent exactement à la logique du service.

### 4. "Not implemented: Window's scrollTo() method"
*   **Cause** : Le code appelle `window.scrollTo` pour remonter en haut de la page, mais JSDOM ne connaît pas cette fonction.
*   **Note** : C'est une erreur sans gravité qui n'empêche pas le succès des tests.

---

## 🚀 Lancer les Tests
Pour exécuter tous les tests dans ton terminal :
```bash
npm run test:unit
```
