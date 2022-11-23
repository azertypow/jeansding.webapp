<template>
  <div class="v-list-container">

    <div
        class="v-list-container__search-bar-box"
    >
      <search-bar></search-bar>
    </div>

    <div
        class="v-list-container__coll-header"
    >
      <div>NUMBER</div>
      <div>ITEM</div>
      <div>CATEGORIES</div>
    </div>

    <list-item
        v-for="item of globalState.apiData"
        :dataTag="item"
    ></list-item>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import {stateStore} from "@/stores/stateStore"
import type {Api} from "@/Utils/api"
import ListItem from "@/components/ListItem.vue"
import SearchBar from "@/components/SearchBar.vue";

export default defineComponent({
  components: {SearchBar, ListItem},
  data() {
    return {
      globalState: stateStore(),
    }
  },

  computed: {
    // itemList(): Api.IItem[] {
    //   if(this.globalState.activatedFilterTag.length === 0) return Object.values( this.globalState.apiData )
    //   return Object.values(this.globalState.apiData).filter(value => {
    //
    //     let containMinOneTagOfFilteredTags = false
    //
    //     this.globalState.activatedFilterTag.forEach(tagFiltered => {
    //       if(value.category.includes(tagFiltered)) containMinOneTagOfFilteredTags = true
    //     })
    //
    //     return containMinOneTagOfFilteredTags
    //   })
    // },

    activatedFilterTag(): string[] {
      return this.globalState.activatedFilterTag
    },
  },

})</script>

<style lang="scss">
.v-list-container {
  overflow: hidden;
  padding-bottom:  50vh;

  .v-list-container__search-bar-box {
    width: calc(100% / 6 * 4);
    margin: 3rem auto 2rem;
  }

  .v-list-container__coll-header {
    display: flex;

    > * {
      padding: 0 1rem;
      width: calc(100% / 3);
    }
  }
}
</style>
