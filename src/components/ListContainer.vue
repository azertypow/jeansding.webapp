<template>
  <div class="v-list-container">

    <div
        v-if="$route.name === 'inventory'"
        class="v-list-container__header"
    >
      <div
          class="v-list-container__header__box"
      >
        <search-bar></search-bar>
      </div>
    </div>

    <div
        v-else
        class="v-list-container__header"
    >
      <div
          class="v-list-container__header__box"
      >
        <search-bar></search-bar>
      </div>
    </div>

    <div
        class="v-list-container__coll-header"
        v-if="$route.name === 'inventory'"
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
  position: relative;
  padding-top: 4rem;

  .is-projects & {
    padding-top: 5rem;
  }

  .v-list-container__header {
    top: var(--v-app-header--title-height);
    left: 0;
    position: fixed;
    width: calc(100% / 4 * 3);
    z-index: 100;
    background: var(--jd-color--white);
    box-shadow: 0 10px 0 0 var(--jd-color--white);

    .is-projects & {
      width: calc(100% / 4 * 1);
    }
  }

  .v-list-container__header__box {
    width: calc(100% / 6 * 4);
    margin: 1rem auto 0;
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
