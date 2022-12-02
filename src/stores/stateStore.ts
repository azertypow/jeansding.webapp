import { defineStore } from 'pinia'
import type {Api} from "@/Utils/api"
import article from "@/views/Article.vue";

export const stateStore = defineStore('stateStore', {

  state: () => ({
    currentOpenObject: null as Api.IItem | null,
    apiData: {} as Api.ItemList,
    apiProjects: {} as Api.IProjects,
    activatedFilterTag: [] as string[],
    activatedFilterBySlug: [] as string[],
    objectByActivatedFilterBySlug: [] as Api.IItem[],

    footNotes: [] as {index: number, html: string}[],

    menuIsOpen: false,
    creditIsOpen: false,
  }),

  getters: {
    filteredArticle(): Api.IArticle[] {

      let allProjectsArticle: Api.IArticle[] = []

      allProjectsArticle = allProjectsArticle.concat(Object.values( this.apiProjects['symposium']?.children || {} ))
      allProjectsArticle = allProjectsArticle.concat(Object.values( this.apiProjects['artist-videos']?.children || {} ))
      allProjectsArticle = allProjectsArticle.concat(Object.values( this.apiProjects['denimpop']?.children || {} ))
      allProjectsArticle = allProjectsArticle.concat(Object.values( this.apiProjects['exhibitions']?.children || {} ))

      if(this.activatedFilterTag.length === 0) return allProjectsArticle

      return allProjectsArticle.filter(article => {
        return this.activatedFilterTag.every(category=> article.category?.includes(category))
      })
    }
  },

  actions: {
    pushTag(value: string) {
      if( this.activatedFilterTag.includes( value ) ) return
      this.activatedFilterTag.push(value)
    },
    removeTag(value: string) {
      const indexOfMatchedTag = this.activatedFilterTag.findIndex((arrayValue) => {
        return arrayValue === value
      })

      console.log(indexOfMatchedTag)

      this.activatedFilterTag.splice(indexOfMatchedTag, indexOfMatchedTag + 1)
    },

    setActivatedFilterBySlug(listOfSlug: string[]) {
      this.activatedFilterBySlug = listOfSlug
      this.setObjectByActivatedFilterBySlug()
    },

    async setObjectByActivatedFilterBySlug() {

      if (this.activatedFilterBySlug.length < 1) this.objectByActivatedFilterBySlug = []

      else this.objectByActivatedFilterBySlug = Object.values( this.apiData ).filter((item) => {
        return this.activatedFilterBySlug.every( slug => item.slug?.includes(slug))
      })
    },
  },
})
