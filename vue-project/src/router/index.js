import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/decouvrir',
      name: 'discovery',
      component: () => import('../views/DiscoveryView.vue'),
    },
    {
      path: '/watchlist',
      name: 'watchlist',
      component: () => import('../views/WatchlistView.vue'),
    },
    {
      path: '/favoris',
      name: 'favoris',
      component: () => import('../views/FavorisView.vue'),
    },
    {
      path: '/critiques',
      name: 'reviews',
      component: () => import('../views/ReviewsView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/cinemas',
      name: 'cinemas',
      component: () => import('../views/CinemasView.vue'),
    },
  ],
})

export default router
