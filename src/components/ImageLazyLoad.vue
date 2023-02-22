<template>
  <div
      class="v-image-lazy-load"
  >
    <image-zoom :src-of-img-zoom="imageZoomUrl" :scale="zoomScale">
      <img
          class="v-image-lazy-load__img"
          :src="imageUrl"
          :alt="alt"
          :class="{
            'is-loaded': isLoaded,
          }"
      />
    </image-zoom>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import type {PropType} from 'vue';
import type {Api} from "@/Utils/api";
import ImageZoom from "@/components/ImageZoom.vue";

export default defineComponent({
  name: 'ImageLazyLoad',
  components: {ImageZoom},

  data() {
    return {
      isLoaded: false,
      imageUrl: this.imageData.resize.tiny,
      imageZoomUrl: this.imageData.resize.large,
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
    },
    zoomScale: {
      required: false,
      type: Number,
      default: 3,
    },
  },

  mounted() {
    const imageWithWantedSize = new Image()
    imageWithWantedSize.addEventListener('load', () => {
      this.imageUrl = imageWithWantedSize.src
      this.isLoaded = true
    })
    imageWithWantedSize.src = this.imageData.resize[this.size]
  },

  methods: {
    zoomIn() {
      console.log(this.imageData.resize.large)
    }
  },


});
</script>

<style lang="scss" scoped>
.v-image-lazy-load {
  display: block;
}

.v-image-lazy-load__img {
  filter: blur(20px);
  overflow: hidden;

  &.is-loaded {
    transition: filter .25s linear;
    filter: blur(0);
  }
}
</style>