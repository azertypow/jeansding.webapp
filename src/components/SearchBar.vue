<template>
  <div
      class="v-search-bar"
      @click="listOfTagIsOpen = !listOfTagIsOpen"
      :class="{'tag-on-top': tagsOnTop}"
  >
    <span
      class="v-search-bar__text"
    >{{searchBarText}}</span>
    <span
      class="jd-button is-active v-search-bar__tag"
      v-for="tag of activatedFilterTag"
      @click.stop="removeTag(tag)"
    >{{tag.replace('null', 'coming soon')}} ✗</span>


    <transition name="slide_top" >
      <div
          v-if="listOfTagIsOpen"
          class="v-search-bar__list-of-tag"
      >
        <span
            class="jd-button is-active v-search-bar__tag"
            v-for="tag of possibleTags"
            @click.stop="pushTag(tag)"
        >{{tag.replace('null', 'coming soon')}}</span>
      </div>
    </transition>

    <transition name="slide_top" >
      <div
          v-if="listOfTagIsOpen"
          @click.stop="listOfTagIsOpen = false"
          class="v-search-bar__cache-to-close"
      ><div class="v-search-bar__cache-to-close__background" ></div></div>
    </transition>

  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {stateStore} from "@/stores/stateStore";
import type {Api} from "@/Utils/api";

export default defineComponent({
  name: 'SearchBar',
  components: {},

  props: {
    'tagsOnTop': {
      required: false,
      default: false,
      type: Boolean,
    }
  },

  data() {
    return {
      globalState: stateStore(),
      listOfTagIsOpen: false,
    }
  },

  methods: {
    removeTag(tag: string) {
      this.globalState.removeTag(tag)
    },

    pushTag(tag: string) {
      this.globalState.pushTag(tag)
    },
  },

  computed: {
    possibleTags(): string[] {
      const arrayOfAllTags: string[] = []

      const arrayOfItemActive = this.globalState.activatedFilterTag.length < 1 ?
          Object.values(this.listOfItem) :
          Object.values(this.listOfItem).filter(item => {
            return this.globalState.activatedFilterTag.every( activeCategory => {
              return item.category.includes(activeCategory)
            })
          })

      for (let item of arrayOfItemActive) {
        for( const category of item.category ) {
          if(
                  ! arrayOfAllTags.includes(category)
              &&  ! this.activatedFilterTag.includes(category)
          ) arrayOfAllTags.push(category)
        }
      }

      return arrayOfAllTags.sort()
    },

    searchBarText(): string {
      if(this.globalState.activatedFilterTag.length > 0) return 'Select Categories: '
      return 'Select Category: '
    },

    activatedFilterTag(): string[] {
      return this.globalState.activatedFilterTag
    },

    listOfItem() : Api.ItemList {
      return this.globalState.apiData
    }
  },

});
</script>

<style lang="scss" scoped>
.v-search-bar {
  user-select: none;
  padding: 0 .5rem;
  height: 2rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  border-radius: 2rem;
  border: solid 2px var(--jd-palette--blue-dark);
  position: relative;

  > * {
    margin-right: .25rem;
  }

  .v-search-bar__text {
    opacity: .5;
  }

  .v-search-bar__list-of-tag {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    z-index: 10;
    background: white;
    border: solid 2px var(--jd-palette--blue-dark);
    box-sizing: border-box;
    padding: 1rem;
    border-radius: 1rem;

    .v-search-bar__tag {
      margin-top: .25rem;
      margin-right: .25rem;
    }
  }

  .v-search-bar__tag {
    text-transform: capitalize;
    border: none;
  }

  &.tag-on-top {

    .v-search-bar__list-of-tag {
      top: auto;
      bottom: 100%;

      .v-search-bar__tag {
        margin-top: 0;
        margin-bottom: .25rem;
      }
    }
  }
}

.v-search-bar__cache-to-close {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.v-search-bar__cache-to-close__background {
  position: absolute;
  background-color: var(--jd-color--white);
  opacity: .75;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>