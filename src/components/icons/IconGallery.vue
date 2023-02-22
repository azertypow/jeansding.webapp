<template>
  <svg
      class="v-icon-gallery"
      width="14"
      height="9"
      viewBox="0 0 56 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
  >
    <rect               width="14" height="14"/>
    <rect x="21"        width="14" height="14"/>
    <rect x="42"        width="14" height="14"/>
    <rect y="21"        width="14" height="14"/>
    <rect x="21" y="21" width="14" height="14"/>
    <rect x="42" y="21" width="14" height="14"/>
  </svg>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'IconGallery',
  components: {},

});
</script>

<style lang="scss" scoped>
.v-icon-gallery {
  rect {
    fill: var(--jd-color--main);
  }
}
</style>
