<template>
  <div
      @click="iconClicked"
      :class="{
    'is-open': isOpen
      }"
      class="v-cross-icon"
  >
    <div class="v-cross-icon__center-line"></div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'burgerIcon',
  components: {},

  data() {
    return {
      isOpen: false,
    }
  },

  methods: {
    iconClicked() {
      this.isOpen = !this.isOpen

      this.$emit('iconClicked', this.isOpen)
    }
  },
});
</script>

<style lang="scss" scoped>
$lineHeight: 2px;
$iconWidth: 20px;

.v-cross-icon {
  cursor: pointer;
  width: $iconWidth;
  height: $lineHeight*8;
}

.v-cross-icon__center-line {
  background: white;
  width: $iconWidth;
  height: $lineHeight;
  position: relative;
  transition: background 10ms 300ms ease;
  transform: translateY($lineHeight*4);

  &:before, &:after {
    transition: top 300ms 350ms ease,
    transform 300ms 50ms ease;
    position: absolute;
    background: white;
    width: $iconWidth;
    height: $lineHeight;
    content: '';
  }
  &:before {
    top: $lineHeight*-3;
  }

  &:after {
    top: $lineHeight*3;
  }

}

.v-cross-icon.is-open {
  .v-cross-icon__center-line {
    background: transparent;

    &:after, &:before {
      transition: top 300ms 50ms ease, transform 300ms 350ms ease;
      top: 0;
    }
    &:before {
      transform: rotate(45deg);
    }
    &:after {
      transform: rotate(-45deg);
    }
  }
}
</style>