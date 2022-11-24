import { defineStore } from 'pinia'
import type {Api} from "@/Utils/api"

export const stateStore = defineStore('stateStore', {

  state: () => ({
    currentOpenObject: null as Api.IItem | null,
    apiData: {} as Api.ItemList,
    apiProjects: {} as Api.IProjects,
    activatedFilterTag: [] as string[],
    menuIsOpen: false,
    creditIsOpen: false,
  }),

  getters: {
    // doubleCount: (state) => state.count * 2,
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
  },
})
