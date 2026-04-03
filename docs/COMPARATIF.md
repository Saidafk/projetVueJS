# 📊 Comparatif des Bibliothèques de Composants Vue 3

Pour ce projet, nous avons analysé trois solutions majeures avant de faire notre choix.

| Critère | **Vuetify** | **PrimeVue** (Choisi) | **Tailwind UI / Headless UI** |
| :--- | :--- | :--- | :--- |
| **Poids** | Lourd (Framework complet) | Modulaire et léger | Très léger |
| **Design** | Material Design strict | Moderne, Thème "Aura" élégant | Sur mesure (CSS à écrire) |
| **Composants** | Très complet | Riche (80+ composants) | Limité (Nécessite bcp de dev) |
| **Facilité** | Configuration complexe | Installation en 1 min | Longue (Tout faire à la main) |
| **Dark Mode** | Natif | Natif et très personnalisable | Manuel |

## 🏆 Pourquoi PrimeVue ?

Nous avons choisi **PrimeVue** pour les raisons suivantes :
1. **Flexibilité du Design :** Contrairement à Vuetify qui impose le look "Google" (Material), PrimeVue propose des thèmes (Aura, Lara) qui s'intègrent mieux dans une application type "Streaming" (Netflix, Canal+).
2. **Accessibilité :** PrimeVue est reconnu pour son excellent support de l'accessibilité (WCAG 2.1).
3. **Productivité :** Des composants comme le `Rating` ou le `Dialog` (Modale) sont déjà prêts à l'emploi et très performants.
4. **Performance :** La version 4 de PrimeVue est optimisée pour le "Tree Shaking", ce qui ne ralentit pas le chargement de l'application.
