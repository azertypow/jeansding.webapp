<template>
  <div
      class="v-image-zoom"
      @mouseenter="showZoom = true"
      @mouseleave="showZoom = true"
      ref="wrapper"
      @mousemove="onMouseMove"
  >
    <slot></slot>
    <img
        ref="image"
        class="v-image-zoom__img"
        v-if="showZoom"
        alt=""
        :src="srcOfImgZoom"
    >
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'ImageZoom',
  components: {},

  data() {
    return {
      showZoom: false,
      // timeout handler for requestAnimationFrame
      rafTimeout: null as number | null
    }
  },

  props: {
    srcOfImgZoom: {
      required: true,
      type: String,
    },
  },

  methods: {
    onMouseMove(event: MouseEvent) {
      if (!(this.$refs.wrapper instanceof HTMLElement)) return

      if (this.rafTimeout) window.cancelAnimationFrame(this.rafTimeout)

      const {offsetWidth, offsetHeight} = this.$refs.wrapper

      this.rafTimeout = window.requestAnimationFrame(() => {
        if (!(this.$refs.image instanceof HTMLImageElement)) return

        /// get local cursor offset
        const {offsetX, offsetY} = event

        const deltaX = (100 / offsetWidth) * offsetX
        const deltaY = (100 / offsetHeight) * offsetY

        this.$refs.image.style.transformOrigin = `${Math.min(100, deltaX)}% ${Math.min(100, deltaY)}%`

      })
    },
  },

});
</script>

<style lang="scss" scoped>
.v-image-zoom {
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.v-image-zoom__img {
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  width: auto;
  height: auto;
}
</style>