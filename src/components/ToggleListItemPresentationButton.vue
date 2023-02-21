<template>
  <div
      class="v-toggle-list-item-presentation-button jd-button"
      @click="toggleListPresentationMode"
  >
    <span
      class="v-toggle-list-item-presentation-button__text"
    >{{buttonText}}</span>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {stateStore} from "@/stores/stateStore";

export default defineComponent({
  name: 'ToggleListItemPresentationButton',
  components: {},

  data() {
    return {
      globalState: stateStore(),
    }
  },

  methods: {
    toggleListPresentationMode() {
      this.globalState.listItemPresentationMode === 'list' ?
          this.globalState.listItemPresentationMode = 'grid'
          : this.globalState.listItemPresentationMode = 'list'
    }
  },

  computed: {
    buttonText(): string {
      return this.globalState.listItemPresentationMode ? 'Switch to grid presentation' : 'Switch to list presentation'
    },
  },

});
</script>

<style lang="scss" scoped>
.v-toggle-list-item-presentation-button {
  box-sizing: border-box;
  user-select: none;
  position: relative;
  text-align: center;
  cursor: pointer;
}
</style>