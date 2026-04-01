import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Test1View from '../views/Test1View.vue'
import Test2View from '../views/Test2View.vue'
import Test3View from '../views/Test3View.vue'
import Test4View from '../views/Test4View.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/test1',
      name: 'test1',
      component: Test1View,
    },
    {
      path: '/test2',
      name: 'test2',
      component: Test2View,
    },
    {
      path: '/test3',
      name: 'test3',
      component: Test3View,
    },
    {
      path: '/test4',
      name: 'test4',
      component: Test4View,
    },
  ],
})

export default router
