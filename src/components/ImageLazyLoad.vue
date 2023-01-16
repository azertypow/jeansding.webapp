<template>
  <img
      class="v-image-lazy-load"
      :src="imageUrl"
      :alt="alt"
      :class="{
        'is-loaded': isLoaded,
      }"
  />
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import type {PropType} from 'vue';
import type {Api} from "@/Utils/api";

export default defineComponent({
  name: 'ImageLazyLoad',
  components: {},

  data() {
    return {
      isLoaded: false,
      imageUrl: this.imageData.resize.tiny,
    }
  },

  props: {
    imageData: {
      type: Object as PropType<Api.IImage>,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
    size: {
      required: false,
      type: String as PropType<keyof Api.IImageResizes>,
      default: 'small' as keyof Api.IImageResizes
    }
  },

  mounted() {
    const imageWithWantedSize = new Image()
    imageWithWantedSize.addEventListener('load', () => {
      this.imageUrl = imageWithWantedSize.src
      this.isLoaded = true
    })
    imageWithWantedSize.src = this.imageData.resize[this.size]
  },


});
</script>

<style lang="scss" scoped>
.v-image-lazy-load {
  filter: blur(20px);
  overflow: hidden;

  &.is-loaded {
    transition: filter .25s linear;
    filter: blur(0);
  }
}
</style>