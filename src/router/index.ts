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
      redirect: '/projects/symposium',

      children: [
        {
          path: '/projects/:projectSection',
          name: ':projectSection',
          component: () => import('../views/Media.vue'),
        },
        {
          path: '/projects/:projectSection/:articleUid',
          name: ':projectSection/:articleUid',
          component: () => import('../views/Article.vue'),
        },
      ],

    }
  ]
})

router.beforeEach((to, from, next) => {

  document.querySelector('html')!.className = to.name === 'inventory' ? 'is-inventory' : 'is-projects'

  stateStore().currentOpenObject = null

  next()
})

export default router
