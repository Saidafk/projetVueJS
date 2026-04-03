import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import ReviewsView from '../ReviewsView.vue'
import * as storage from '../../services/storage'

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/reviews', component: {} }, { path: '/favoris', component: {} }]
})

describe('ReviewsView', () => {
  it('affiche les critiques triées par date', async () => {
    const mockReviews = [
      { movieId: 1, title: 'Old Movie', rating: 3, comment: 'Nice', date: '01/01/2024', image: '' },
      { movieId: 2, title: 'New Movie', rating: 5, comment: 'WOW', date: '10/10/2025', image: '' }
    ]
    vi.spyOn(storage, 'getReviews').mockReturnValue(mockReviews)
    
    const wrapper = mount(ReviewsView, {
      global: { plugins: [router] }
    })
    
    await wrapper.vm.$nextTick()
    
    // Le plus récent (2025) doit être en premier
    const titles = wrapper.findAll('h3')
    expect(titles[0].text()).toBe('New Movie')
    expect(titles[1].text()).toBe('Old Movie')
  })
})
