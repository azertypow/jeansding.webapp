<template>
  <div
      class="v-toggle-list-item-view-button"
      @click="globalState.itemImageMode = !globalState.itemImageMode"
  >
    <span
      class="v-toggle-list-item-view-button__text"
    >{{buttonText}}</span>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {stateStore} from "@/stores/stateStore";
import type {Api} from "@/Utils/api";

export default defineComponent({
  name: 'ToggleListItemViewButton',
  components: {},

  data() {
    return {
      globalState: stateStore(),
    }
  },

  computed: {
    buttonText(): string {
      return this.globalState.itemImageMode ? 'Switch to compact view' : 'Switch to image view'
    },
  },

});
</script>

<style lang="scss" scoped>
.v-toggle-list-item-view-button {
  user-select: none;
  padding: .5rem;
  border-radius: 2rem;
  border: solid 2px var(--jd-palette--blue-dark);
  position: relative;
  text-align: center;
  cursor: pointer;

  .v-toggle-list-item-view-button__list-of-tag {
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

    .v-toggle-list-item-view-button__tag {
      margin-top: .25rem;
      margin-right: .25rem;
    }
  }

  .v-toggle-list-item-view-button__tag {
    text-transform: capitalize;
    border: none;
  }

  &.tag-on-top {

    .v-toggle-list-item-view-button__list-of-tag {
      top: auto;
      bottom: 100%;

      .v-toggle-list-item-view-button__tag {
        margin-top: 0;
        margin-bottom: .25rem;
      }
    }
  }
}
</style>