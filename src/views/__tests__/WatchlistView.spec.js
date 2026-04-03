import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import WatchlistView from '../WatchlistView.vue'
import * as storage from '../../services/storage'

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/watchlist', component: {} }, { path: '/decouvrir', component: {} }]
})

describe('WatchlistView', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('affiche un message si la watchlist est vide', async () => {
    vi.spyOn(storage, 'getWatchlist').mockReturnValue([])
    const wrapper = mount(WatchlistView, {
      global: { plugins: [router] }
    })
    
    expect(wrapper.text()).toContain('Votre watchlist est vide')
  })

  it('affiche les films présents dans la watchlist', async () => {
    const mockMovies = [{ id: 1, title: 'Inception', summary: 'Description', rating: 5, image: '' }]
    vi.spyOn(storage, 'getWatchlist').mockReturnValue(mockMovies)
    
    const wrapper = mount(WatchlistView, {
      global: { plugins: [router] }
    })
    
    await wrapper.vm.$nextTick()
    
    expect(wrapper.find('h3').text()).toBe('Inception')
    expect(wrapper.findAll('.movie-card')).toHaveLength(1)
  })
})
