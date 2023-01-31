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
        <toggle-list-item-view-button></toggle-list-item-view-button>
      </div>
    </div>

    <div
        v-if="globalState.objectByActivatedFilterBySlug.length > 0 && $route.name !== 'inventory'"
        class="v-list-container__linked-object"
    >
      <list-item
          v-for="item of globalState.objectByActivatedFilterBySlug"
          :dataTag="item"
          :isAlwaysOpen="true"
          :disableTagFilterAction="true"
      ></list-item>
    </div>

    <div
        class="v-list-container__coll-header"
        v-if="$route.name === 'inventory'"
    >
      <div>NUMBER</div>
      <div>ITEM</div>
      <div>CATEGORIES</div>
    </div>

    <div
        v-show="showItem"
    >
      <list-item
          v-for="item of globalState.apiData"
          :dataTag="item"
          :key="item.id"
      ></list-item>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import {stateStore} from "@/stores/stateStore"
import type {Api} from "@/Utils/api"
import ListItem from "@/components/ListItem.vue"
import SearchBar from "@/components/SearchBar.vue";
import ToggleListItemViewButton from "@/components/ToggleListItemViewButton.vue";

export default defineComponent({
  components: {ToggleListItemViewButton, SearchBar, ListItem},
  data() {
    return {
      globalState: stateStore(),
    }
  },

  computed: {
    showItem(): boolean {

      if( this.$route.name === 'inventory' ) return true
      if( this.$route.name === ':projectSection' ) return true

      return this.$route.name === ':projectSection/:articleUid' && this.globalState.activatedFilterTag.length > 0;

    },

    activatedFilterTag(): string[] {
      return this.globalState.activatedFilterTag
    },
  },

})</script>

<style lang="scss">
@import '../assets/scss-var';

.v-list-container {
  overflow: hidden;
  padding-bottom:  50vh;
  position: relative;
  padding-top: 5rem;

  .v-list-container__header {
    top: var(--v-app-header--title-height);
    left: 0;
    position: fixed;
    width: calc( (100% / 3 * 2) - 1rem);
    box-sizing: border-box;
    z-index: 100;
    background: var(--jd-color--white);
    box-shadow: 0 10px 0 0 var(--jd-color--white);

    .is-projects & {
      padding-left: 1rem;
      width: calc(100% / 4 * 1 - 1rem);
    }

    .device-small & {
      width: 100%;
    }

    @media (min-width: $break-width-reg) {
      width: calc( (100% / 4 * 3) - 1rem);
    }
  }

  .v-list-container__linked-object {

  }

  .v-list-container__header__box {
    width: calc(100% / 6 * 4);
    margin: 1rem auto 0;
  }

  .v-list-container__coll-header {
    display: flex;
    position: fixed;
    left: 1rem;
    padding-top: 1rem;
    top: 7rem;
    z-index: 20;
    background: white;
    width: calc(75% - 2.25rem);

    > * {
      padding: 0 1rem;
      width: calc(100% / 3);
    }
  }

  .device-small & {
    width: 100%;
  }
}
</style>
