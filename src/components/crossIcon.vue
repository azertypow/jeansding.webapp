<template>
  <div
      class="v-cross-icon"
  >
    <div class="v-cross-icon__center-line"></div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'crossIcon',
  components: {},
});
</script>

<style lang="scss" scoped>
$lineHeight: 2px;
$iconWidth: 30px;

.v-cross-icon {
  cursor: pointer;
  width: $iconWidth;
  height: $lineHeight*8;
}

.v-cross-icon__center-line {
  background: transparent;
  width: $iconWidth;
  height: $lineHeight;
  position: relative;
  transition: background 10ms 300ms ease;
  transform: translateY($lineHeight*4);

  &:before, &:after {
    top: 0;
    transition: transform .25s ease-in-out;
    position: absolute;
    background: white;
    width: $iconWidth;
    height: $lineHeight;
    content: '';
  }
  &:before {
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
  }

}

.v-cross-icon:hover {
  .v-cross-icon__center-line {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(-0deg);
    }
  }
}
</style>
