<template>
  <svg
      class="v-icon-list"
      width="28"
      height="18"
      viewBox="0 0 56 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
  >
    <rect               width="9"   height="7" />
    <rect x="16"        width="40"  height="7" />
    <rect y="14"        width="9"   height="7" />
    <rect x="16" y="14" width="40"  height="7" />
    <rect y="28"        width="9"   height="7" />
    <rect x="16" y="28" width="40"  height="7" />
  </svg>

</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'IconList',
  components: {},

});
</script>

<style lang="scss" scoped>
.v-icon-list {
  rect {
    fill: var(--jd-color--main);
  }
}
</style>
