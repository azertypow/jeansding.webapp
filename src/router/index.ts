import { createRouter, createWebHashHistory } from 'vue-router'
import Inventory from '../views/Inventory.vue'
import {stateStore} from "../stores/stateStore"
import {setStateOnNavigation} from "@/Utils/setStateOnNavigation"

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

  if(to.name !== undefined && to.name !== null)
    setStateOnNavigation(to.name, to.params, from.name)

  next()
})

router.afterEach(() => {
  if(stateStore().itemToScrollOnInventoryIsOpen !== null) {
    console.log(
        stateStore().itemToScrollOnInventoryIsOpen
    )
    stateStore().itemToScrollOnInventoryIsOpen.toggleOpenStatus()
    stateStore().itemToScrollOnInventoryIsOpen = null
  }

  stateStore().vimeoPlayerForRightPanelInInventoryPage = null
})

export default router
