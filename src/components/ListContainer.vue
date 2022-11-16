<template>
  <div class="v-list-container">
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

  computed: {
    itemList(): Api.ItemList {
      if(this.globalState.activatedFilterTag.length === 0) return this.globalState.apiData
      return this.globalState.apiData.filter(value => {

        let containMinOneTagOfFilteredTags = false

        this.globalState.activatedFilterTag.forEach(tagFiltered => {
          if(value.categories.includes(tagFiltered)) containMinOneTagOfFilteredTags = true
        })

        return containMinOneTagOfFilteredTags
      })
    }
  },

})</script>

<style lang="scss">
.v-list-container {
  overflow: hidden;
}
</style>
