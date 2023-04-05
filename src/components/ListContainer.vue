<template>
  <div class="v-list-container">
<div
    class="v-list-container__scroll-box"
>
    <transition name="transition-header" >
    <div
        v-if="$route.name === 'inventory'"
        class="v-list-container__header"
    >
      <div
          class="v-list-container__header__box__toggle-mode"
      >
        <toggle-list-item-presentation-button></toggle-list-item-presentation-button>
      </div>
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
          class="v-list-container__header__box v-list-container__header__box--small"
      >
        <toggle-list-item-view-button></toggle-list-item-view-button>
      </div>
    </div>
    </transition>

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

    <transition name="transition-header" >
    <div
        class="v-list-container__coll-header"
        v-if="$route.name === 'inventory' && globalState.listItemPresentationMode === 'list'"
    >
      <div>NUMBER</div>
      <div>ITEM</div>
      <div>CATEGORIES</div>
    </div>
    </transition>

    <div
        v-if="listItemPresentationModeAbstraction === 'list'"
        v-show="showItem"
        class="v-list-container__list v-list-container__list--list-view"
    >
      <list-item
          v-for="item of globalState.apiData"
          :dataTag="item"
          :key="item.id"
          @vue:mounted="onListItemMounted"
      ></list-item>
      <div style="height: 50vh" ></div>
    </div>

    <div
        v-if="listItemPresentationModeAbstraction === 'grid'"
        v-show="showItem"
        class="v-list-container__list v-list-container__list--grid-view"
    >
      <div
          v-for="index in numberOfColl"
          class="v-list-container__grid__coll"
      >
        <card-item
            v-for="item of randomItemListSorted.slice().splice(Math.ceil( randomItemListSorted.length/numberOfColl* (index - 1) ), Math.ceil( randomItemListSorted.length/numberOfColl ))"
            :dataTag="item"
            :key="item.id"
            @vue:mounted="onListCardMounted"
        ></card-item>
        <div style="height: 50vh" ></div>
      </div>
    </div>
</div>

<div
    class="v-list-container__loader-animation"
>

    <transition name="transition-loader" >
      <div
          v-if="!listMounted"
          class="v-list-container__loader"
      >
        <div
            class="v-list-container__loader__lines"
        >
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </transition>

    <transition name="transition-loader" >
      <div
          v-if="!galleryMounted"
          class="v-list-container__loader"
      >
        <div
            class="v-list-container__loader__card"
        >
          <div class="v-list-container__list--grid-view" >
            <div
                class="v-list-container__grid__coll"
                v-for="index in numberOfColl"
            >
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </transition>
</div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import {stateStore} from "@/stores/stateStore"
import type {Api} from "@/Utils/api"
import ListItem from "@/components/ListItem.vue"
import SearchBar from "@/components/SearchBar.vue"
import ToggleListItemViewButton from "@/components/ToggleListItemViewButton.vue"
import ToggleListItemPresentationButton from "@/components/ToggleListItemPresentationButton.vue"
import CardItem from "@/components/CardItem.vue"

export default defineComponent({
  components: {CardItem, ToggleListItemPresentationButton, ToggleListItemViewButton, SearchBar, ListItem},
  data() {
    return {
      globalState: stateStore(),
      counterOfMountedItemList: 0,
      listMounted: false,

      counterOfMountedItemCard: 0,
      galleryMounted: true,

      listItemPresentationModeAbstraction: 'list' as 'list' | 'grid'
    }
  },

  methods: {
    onListItemMounted() {
      this.counterOfMountedItemList++
      if(Object.keys( this.itemList).length > this.counterOfMountedItemList) window.setTimeout(() => {
        this.listMounted = true
      }, 1_000)
    },
    onListCardMounted() {
      this.counterOfMountedItemCard++
      if(Object.keys( this.itemList).length > this.counterOfMountedItemList) window.setTimeout(() => {
        this.galleryMounted = true
      }, 1_000)
    }

  },

  watch: {
    'listItemPresentationMode'(){
      this.counterOfMountedItemList = 0
      this.counterOfMountedItemCard = 0

      if(this.listItemPresentationMode === 'list') {
        this.listMounted     = false
        this.galleryMounted  = true
      }
      if(this.listItemPresentationMode === 'grid') {
        this.listMounted     = true
        this.galleryMounted  = false
      }

      window.setTimeout(() => {
        this.listItemPresentationModeAbstraction = this.listItemPresentationMode
      }, 500)
    },
  },

  computed: {
    numberOfColl(): number {
      if (this.globalState.device === 'mobile') return 1
      if (this.globalState.device === 'small') return 2
      return 3
    },

    itemList(): Api.ItemList {
      return this.globalState.apiData
    },

    randomItemListSorted(): Api.IItem[] {
      const shuffleArray: Api.IItem[] = Object.values( this.globalState.apiData )

      let m = shuffleArray.length, currentElement, pickRandomRemainingElement

      while (m) {
        pickRandomRemainingElement = Math.floor(Math.random() * m--)
        currentElement = shuffleArray[m]
        shuffleArray[m] = shuffleArray[pickRandomRemainingElement]
        shuffleArray[pickRandomRemainingElement] = currentElement
      }

      return shuffleArray
    },

    showItem(): boolean {

      if( this.$route.name === 'inventory' ) return true
      if( this.$route.name === ':projectSection' ) return true

      return this.$route.name === ':projectSection/:articleUid' && this.globalState.activatedFilterTag.length > 0

    },

    listItemPresentationMode(): 'list' | 'grid' {
      return this.globalState.listItemPresentationMode
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
  position: relative;
  padding-top: 5rem;
  box-sizing: border-box;
  min-height: 100vh;
  height: 100%;

  /**
  LIST
   */
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

    .device-mobile & {
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
    position: relative;

    &.v-list-container__header__box--small {
      width: auto;
      display: flex;
      justify-content: center;
    }
  }

  .v-list-container__header__box__toggle-mode {
    position: absolute;
    top: 1rem;
    left: 1rem;
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

  /**
  GENERAL LIST
  */
  .v-list-container__list {

  }


  /**
  GRID
   */
  .v-list-container__list--grid-view {
    display: flex;
    flex-wrap: nowrap;

    .v-list-container__grid__coll {
      width: 100%;
      padding-left: .5rem;
      padding-right: .5rem;
      box-sizing: border-box;
      flex-shrink: 1;
    }
  }

  /**
  SCROLL CONTAINER
   */
  .v-list-container__scroll-box {
    overflow: scroll;
    height: 100%;
    padding-right: .5rem;

    &::-webkit-scrollbar {
      background: var(--jd-color--white);
      width: .5rem;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--jd-color--main);
      border-radius: 1rem;
    }
  }
  /**
  LOADERS
   */
  .v-list-container__loader {
    position: absolute;
    background: white;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 1000;
    padding-top: 5rem;
    box-sizing: border-box;
  }

  .v-list-container__loader__lines {
    > div {
      height: 1.9rem;
      box-sizing: content-box;
      border-bottom: solid 1px var(--jd-color--main);
      animation: width-scale 2s ease-in-out;
      animation-iteration-count: 1;
      animation-fill-mode: forwards;
      transform-origin: left;
      transform: scale3d(0, 1, 1);

      @for $i from 0 through 20 {

        &:nth-child(#{$i}) {
          animation-delay: $i * .05s;
        }
      }
    }
  }

  .v-list-container__loader__card {
    height: 60rem;

    .v-list-container__grid__coll {
      height: 100%;
      display: flex;
      flex-direction: column;

      > div {
        margin-bottom: 2rem;
        border-top: solid 1px var(--jd-color--main);
        animation: width-scale 1s ease-in-out;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
        transform-origin: left;
        transform: scale3d(0, 1, 1);

        &:before {
          content: '';
          display: block;
          margin-top: 3rem;
          height: 10rem;
          background: var(--jd-color--main);
          animation: height-scale 1s ease-in-out;
          animation-iteration-count: 1;
          animation-fill-mode: forwards;
          transform-origin: top;
          transform: scale3d(1, 0, 1);
        }
      }

      @for $i from 1 through 3 {
        @for $j from 1 through 3 {

          > div:nth-child(#{$i}) {
            animation-delay: ($i * .05s) + ($j * .05s);
          }

          &:nth-child(#{$i}) {
            > div:before {
              animation-delay: ($i * .2s) + ($j * .2s);
            }
          }
        }
      }
    }
  }

  @keyframes width-scale {
    0% {
      transform: scale3d(0, 1, 1);
    }

    100% {
      transform: scale3d(1, 1, 1);
    }

  }

  @keyframes height-scale {
    0% {
      transform: scale3d(1, 0, 1);
      opacity: 0;
    }

    50% {
      opacity: 1;
    }

    100% {
      transform: scale3d(1, 1, 1);
      opacity: 1;
    }

  }

  .device-mobile & {
    width: 100%;
  }
}

.v-list-container__loader-animation {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

</style>
