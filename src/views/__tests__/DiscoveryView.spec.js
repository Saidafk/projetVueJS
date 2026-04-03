import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import DiscoveryView from '../DiscoveryView.vue'
import * as api from '../../services/api'
import * as storage from '../../services/storage'

// Mock des notifications pour éviter les erreurs
vi.mock('../../services/notifications', () => ({
  useNotification: () => ({
    showNotify: vi.fn()
  })
}))

describe('DiscoveryView', () => {
  const mockMovies = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    title: `Movie ${i + 1}`,
    rating: 7.5,
    summary: 'Summary',
    image: 'img.jpg',
    genres: ['Action']
  }))

  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(api, 'getAllMovies').mockResolvedValue(mockMovies)
  })

  it('affiche le spinner pendant le chargement, puis les films', async () => {
    const wrapper = mount(DiscoveryView)
    expect(wrapper.find('.spinner').exists()).toBe(true)
    
    await new Promise(resolve => setTimeout(resolve, 0)) // Attendre le tick Vue
    await wrapper.vm.$nextTick()
    
    expect(wrapper.find('.spinner').exists()).toBe(false)
    expect(wrapper.findAll('.movie-card')).toHaveLength(10) // 10 par page
  })

  it('change de page au clic sur Suivant', async () => {
    const wrapper = mount(DiscoveryView)
    await new Promise(resolve => setTimeout(resolve, 0))
    
    const nextBtn = wrapper.find('.page-btn:last-child')
    await nextBtn.trigger('click')
    
    expect(wrapper.findAll('.movie-card')).toHaveLength(5) // Reste 5 films (15 total)
    expect(wrapper.text()).toContain('Affichage de 11 à 15')
  })

  it('appelle addToWatchlist lors du clic sur le bouton', async () => {
    const spy = vi.spyOn(storage, 'addToWatchlist')
    const wrapper = mount(DiscoveryView)
    await new Promise(resolve => setTimeout(resolve, 0))
    
    await wrapper.find('.add-btn').trigger('click')
    expect(spy).toHaveBeenCalled()
  })
})
