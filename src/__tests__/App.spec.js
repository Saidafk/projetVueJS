import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
import NavBar from '../components/NavBar.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: { template: '<div>Home</div>' } }]
})

describe('App Layout', () => {
  it('contient la NavBar et la zone de contenu', async () => {
    const wrapper = mount(App, {
      global: { plugins: [router] }
    })
    
    expect(wrapper.findComponent(NavBar).exists()).toBe(true)
    expect(wrapper.find('main').exists()).toBe(true)
  })
})
