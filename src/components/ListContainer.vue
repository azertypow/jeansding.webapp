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
      return this.globalState.apiData
    }
  },

})</script>

<style lang="scss">
.v-list-container {
}
</style>
