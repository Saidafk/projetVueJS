import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import App from './App.vue'
import router from './router'
import { refreshFavorisBadge, refreshWatchlistBadge } from './services/storage'

const app = createApp(App)

app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.my-app-dark',
        }
    }
})

app.mount('#app')

// Initialiser le badge PWA avec le nombre actuel de favoris (si pris en charge)
try {
    refreshFavorisBadge();
    refreshWatchlistBadge();
} catch (e) {
    // ignore
}
