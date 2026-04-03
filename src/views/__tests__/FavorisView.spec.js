import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import FavorisView from '../FavorisView.vue'
import PrimeVue from 'primevue/config'
import * as storage from '../../services/storage'

vi.mock('../../services/notifications', () => ({
  useNotification: () => ({ showNotify: vi.fn() })
}))

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/favoris', component: {} }, { path: '/decouvrir', component: {} }]
})

describe('FavorisView', () => {
  const mockFavs = [{ id: 1, title: 'Inception', summary: 'Summary', rating: 5, image: 'img.jpg' }]

  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(storage, 'getFavoris').mockReturnValue(mockFavs)
    vi.spyOn(storage, 'getReviewByMovie').mockReturnValue(null)
  })

  it('ouvre la modale et passe les étapes du formulaire', async () => {
    const wrapper = mount(FavorisView, {
      global: { plugins: [PrimeVue, router] }
    })
    
    // Attendre que onMounted s'exécute
    await new Promise(resolve => setTimeout(resolve, 0))
    await wrapper.vm.$nextTick()
    
    // 1. Ouvrir la modale
    await wrapper.find('.review-btn').trigger('click')
    expect(wrapper.find('.modal-content').exists()).toBe(true)
    
    // 2. Étape 1 (Note) vers Étape 2 (Commentaire)
    await wrapper.find('.modal-footer .p-button:last-child').trigger('click')
    expect(wrapper.text()).toContain('Votre avis détaillé')
    
    // 3. Simuler la saisie d'un commentaire pour débloquer le bouton "Suivant"
    await wrapper.find('textarea').setValue('Un chef d\'oeuvre')
    await wrapper.find('.modal-footer .p-button:last-child').trigger('click')
    
    // 4. Étape 3 (Récapitulatif)
    expect(wrapper.text()).toContain('Récapitulatif')
    expect(wrapper.text()).toContain('Un chef d\'oeuvre')
  })
})
