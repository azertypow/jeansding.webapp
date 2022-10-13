import { defineStore } from 'pinia'
import type {Api} from "@/Utils/api"

export const stateStore = defineStore('stateStore', {

  state: () => ({
    currentOpenObject: null as Api.IItem | null,
    apiData: {} as Api.ItemList,
  }),

  getters: {
    // doubleCount: (state) => state.count * 2,
  },

  actions: {
    // increment() {
    //   this.count++
    // },
  },
})
