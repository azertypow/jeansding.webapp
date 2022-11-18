<template>
  <div class="v-list-container">
    <div
        class="v-list-container__tag-filter"
    >activated tags: <span
        class="jd-button"
        v-for="tag of activatedFilterTag"
        @click="removeTag(tag)"
    >{{tag}} ✗</span>
    </div>
    <list-item
        v-for="item of itemList"
        :dataTag="item"
    ></list-item>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import {stateStore} from "@/stores/stateStore"
import type {Api} from "@/Utils/api"
import ListItem from "@/components/ListItem.vue"

export default defineComponent({
  components: {ListItem},
  data() {
    return {
      globalState: stateStore()
    }
  },

  methods: {
    removeTag(tag: string) {
      console.log(tag)
      this.globalState.removeTag(tag)
    }
  },

  computed: {
    itemList(): Api.IItem[] {
      if(this.globalState.activatedFilterTag.length === 0) return Object.values( this.globalState.apiData )
      return Object.values(this.globalState.apiData).filter(value => {

        let containMinOneTagOfFilteredTags = false

        this.globalState.activatedFilterTag.forEach(tagFiltered => {
          if(value.category.includes(tagFiltered)) containMinOneTagOfFilteredTags = true
        })

        return containMinOneTagOfFilteredTags
      })
    },

    activatedFilterTag(): string[] {
      return this.globalState.activatedFilterTag
    },
  },

})</script>

<style lang="scss">
.v-list-container {
  overflow: hidden;
}
</style>
