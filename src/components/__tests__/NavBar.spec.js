import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import NavBar from '../NavBar.vue'
import * as storage from '../../services/storage'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: {} },
    { path: '/decouvrir', component: {} },
    { path: '/watchlist', component: {} },
    { path: '/favoris', component: {} },
    { path: '/critiques', component: {} },
    { path: '/cinemas', component: {} },
    { path: '/about', component: {} }
  ]
})

describe('NavBar', () => {
  it('affiche les liens de navigation principaux', () => {
    const wrapper = mount(NavBar, {
      global: { plugins: [router] }
    })
    
    expect(wrapper.text()).toContain('CinéList')
    expect(wrapper.text()).toContain('Découvrir')
    expect(wrapper.text()).toContain('Favoris')
  })

  it('affiche un badge si il y a des favoris', async () => {
    // On simule 3 favoris
    vi.spyOn(storage, 'getFavoris').mockReturnValue([{}, {}, {}])
    
    const wrapper = mount(NavBar, {
      global: { plugins: [router] }
    })
    
    await wrapper.vm.$nextTick()
    
    const badge = wrapper.find('.badge')
    expect(badge.exists()).toBe(true)
    expect(badge.text()).toBe('3')
  })
})
