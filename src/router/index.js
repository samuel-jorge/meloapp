import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/reitoria',
      name: 'reitoria',
      component: () => import('../views/ReitoriaView.vue')
    },
    {
      path: '/sti',
      name: 'sti',
      component: () => import('../views/StiView.vue')
    },
    {
      path: '/cc',
      name: 'cc',
      component: () => import('../views/CcView.vue')
    },
    {
      path: '/prograd',
      name: 'prograd',
      component: () => import('../views/ProgradView.vue')
    },
    {
      path: '/sobre',
      name: 'sobre',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
