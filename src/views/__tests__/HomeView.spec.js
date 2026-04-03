import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../HomeView.vue'

// On simule un routeur pour tester les liens RouterLink
const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: {} }]
})

describe('HomeView', () => {
  it('affiche correctement le titre et le bouton', async () => {
    const wrapper = mount(HomeView, {
      global: { plugins: [router] }
    })
    
    expect(wrapper.find('h1').text()).toBe('CinéList')
    expect(wrapper.find('.cta-button').exists()).toBe(true)
  })
})
