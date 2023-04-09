import {stateStore} from "@/stores/stateStore"
import {getSlugOfLinkedObjectsOfArticle, getTagsOfArticle} from "@/Utils/setTgsFilterByCurentArticleView"
import type { RouteParams, RouteRecordName } from "vue-router"


export function setStateOnNavigation(toName: RouteRecordName, toParams: RouteParams, fromName?: RouteRecordName | null ) {
  stateStore().itemImageMode = false
  stateStore().listItemPresentationMode = 'list'

  document.querySelector('html')!.className = toName === 'inventory' ? 'is-inventory' : 'is-projects'

  if( fromName === ':projectSection' || fromName === ':projectSection/:articleUid' ) {

    if (toName === ':projectSection' || toName === ':projectSection/:articleUid') {
      document.querySelector('.v-list-container__scroll-box')!.scrollTo({
        top: 0,
        behavior: undefined,
      })

      document.querySelector('.v-app__body__right')!.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }


  } else if( toName === 'inventory' || toName === ':projectSection') {
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

  if( toName === 'inventory' || fromName === 'inventory' || toName === ':projectSection' ) stateStore().clearAllTag()

  if( toName === ':projectSection/:articleUid' ) {

    stateStore().activatedFilterTag = getTagsOfArticle({
      projectSection: toParams.projectSection as string,
      articleUid: toParams.articleUid as string,
    })

    stateStore().setActivatedFilterBySlug(getSlugOfLinkedObjectsOfArticle({
      projectSection: toParams.projectSection as string,
      articleUid: toParams.articleUid as string,
    }))
  } else {
    stateStore().setActivatedFilterBySlug([])
  }
}
