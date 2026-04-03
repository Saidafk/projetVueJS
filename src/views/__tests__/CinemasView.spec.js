import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CinemasView from '../CinemasView.vue'

describe('CinemasView', () => {
  it('affiche un message d\'erreur si la géolocalisation est refusée', async () => {
    // On simule une erreur de géolocalisation (code 1 = Permission Denied)
    global.navigator.geolocation = {
      getCurrentPosition: vi.fn((success, error) => error({ code: 1 }))
    }

    const wrapper = mount(CinemasView)
    
    // On laisse le temps au script de s'exécuter
    await new Promise(resolve => setTimeout(resolve, 100))
    
    expect(wrapper.text()).toContain('Veuillez autoriser l\'accès à votre position')
  })
})
