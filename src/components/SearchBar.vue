<template>
  <div
      class="v-search-bar"
      @click="listOfTagIsOpen = !listOfTagIsOpen"
  >
    <span
      class="v-search-bar__text"
    >{{searchBarText}}</span>
    <span
      class="jd-button is-active v-search-bar__tag"
      v-for="tag of activatedFilterTag"
      @click.stop="removeTag(tag)"
    >{{tag}} ✗</span>

    <div
        v-if="listOfTagIsOpen"
        class="v-search-bar__list-of-tag"
    >
      <span
          class="jd-button is-active v-search-bar__tag"
          v-for="tag of possibleTags"
          @click.stop="pushTag(tag)"
      >{{tag}}</span>
    </div>

  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {stateStore} from "@/stores/stateStore";
import type {Api} from "@/Utils/api";

export default defineComponent({
  name: 'SearchBar',
  components: {},

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

      console.log(arrayOfItemActive)

      for (let item of arrayOfItemActive) {
        for( const category of item.category ) {
          if( ! arrayOfAllTags.includes(category) ) arrayOfAllTags.push(category)
        }
      }

      return arrayOfAllTags
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
  padding: .5rem;
  border-radius: 1rem;
  border: solid 1px var(--jd-color--secondary);
  position: relative;

  .v-search-bar__text {
    opacity: .5;
  }

  .v-search-bar__tag {
    text-transform: capitalize;
  }

  .v-search-bar__list-of-tag {
    > * {
      margin-top: .25rem;
      margin-right: .25rem;
    }
  }
}
</style>