import './assets/main.css'
import 'primeicons/primeicons.css' // Import des icônes

import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.my-app-dark', // On forcera le mode sombre via cette classe
        }
    }
})

app.mount('#app')
