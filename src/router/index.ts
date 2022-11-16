import { createRouter, createWebHashHistory } from 'vue-router'
import Inventory from '../views/Inventory.vue'
import {stateStore} from "../stores/stateStore"

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'inventory',
      component: Inventory,
    },
    {
      path: '/projects',
      name: 'projects',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Media.vue')

    }
  ]
})

router.beforeEach((to, from, next) => {

  document.querySelector('html')!.className = `is-${to.name?.toString() || 'null'}`

  stateStore().currentOpenObject = null

  next()
})

export default router
