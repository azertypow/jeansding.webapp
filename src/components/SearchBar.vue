<template>
  <div
      class="v-search-bar"
  >
    <span
      class="v-search-bar__text"
    >{{searchBarText}}</span>
    <span
      class="jd-button is-active v-search-bar__tag"
      v-for="tag of activatedFilterTag"
      @click="removeTag(tag)"
    >{{tag}} ✗</span>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {stateStore} from "@/stores/stateStore";

export default defineComponent({
  name: 'SearchBar',
  components: {},

  data() {
    return {
      globalState: stateStore(),
    }
  },

  methods: {
    removeTag(tag: string) {
      this.globalState.removeTag(tag)
    }
  },

  computed: {
    searchBarText(): string {
      if(this.globalState.activatedFilterTag.length > 0) return 'Select Categories: '
      return 'Select Category: '
    },

    activatedFilterTag(): string[] {
      return this.globalState.activatedFilterTag
    },
  },

});
</script>

<style lang="scss" scoped>
.v-search-bar {
  user-select: none;
  padding: .5rem;
  border-radius: 1rem;
  width: calc(100% / 6 * 4);
  border: solid 1px var(--jd-color--secondary);
  margin: 3rem auto 2rem;

  .v-search-bar__text {
    opacity: .5;
  }

  .v-search-bar__tag {
    text-transform: capitalize;
  }
}
</style>