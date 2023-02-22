<template>
  <div
      class="v-toggle-list-item-presentation-button jd-button"
      @click="toggleListPresentationMode"
  >
    <icon-gallery v-if="globalState.listItemPresentationMode === 'list'" ></icon-gallery>
    <icon-list    v-if="globalState.listItemPresentationMode === 'grid'" ></icon-list>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {stateStore} from "@/stores/stateStore";
import IconGallery from "@/components/icons/IconGallery.vue";
import IconList from "@/components/icons/IconList.vue";

export default defineComponent({
  name: 'ToggleListItemPresentationButton',
  components: {IconList, IconGallery},

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

  computed: {},

});
</script>

<style lang="scss" scoped>
.v-toggle-list-item-presentation-button {
  box-sizing: border-box;
  user-select: none;
  position: relative;
  cursor: pointer;
  display: flex;
  height: 2rem;
  align-items: center;
}
</style>