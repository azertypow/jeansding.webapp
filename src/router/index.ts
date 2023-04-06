import { createRouter, createWebHashHistory } from 'vue-router'
import Inventory from '../views/Inventory.vue'
import {stateStore} from "../stores/stateStore"
import {getSlugOfLinkedObjectsOfArticle, getTagsOfArticle} from "@/Utils/setTgsFilterByCurentArticleView";

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
  stateStore().itemImageMode = false
  stateStore().listItemPresentationMode = 'list'

  document.querySelector('html')!.className = to.name === 'inventory' ? 'is-inventory' : 'is-projects'

  if( from.name === ':projectSection' || from.name === ':projectSection/:articleUid' ) {

    if (to.name === ':projectSection' || to.name === ':projectSection/:articleUid') {
      document.querySelector('.v-list-container__scroll-box')!.scrollTo({
        top: 0,
        behavior: undefined,
      })

      document.querySelector('.v-app__body__right')!.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }


  } else if( to.name === 'inventory' || to.name === ':projectSection') {
    document.querySelector('.v-app__body__right')!.scrollTo({
      top: 0,
      behavior: undefined,
    })

    const leftElement = document.querySelector('.v-list-container__scroll-box')
    if( leftElement instanceof HTMLElement) leftElement.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  if( to.name === 'inventory' || from.name === 'inventory' || to.name === ':projectSection' ) stateStore().clearAllTag()

  if( to.name === ':projectSection/:articleUid' ) {

    stateStore().activatedFilterTag = getTagsOfArticle({
      projectSection: to.params.projectSection as string,
      articleUid: to.params.articleUid as string,
    })

    stateStore().setActivatedFilterBySlug(getSlugOfLinkedObjectsOfArticle({
      projectSection: to.params.projectSection as string,
      articleUid: to.params.articleUid as string,
    }))
  } else {
    stateStore().setActivatedFilterBySlug([])
  }

  stateStore().currentOpenObject = null
  stateStore().clearFootNoteListAndRemoveScrollListener()

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
