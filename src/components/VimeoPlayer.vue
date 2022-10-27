<template>
  <div class="v-vimeo-player">
    <div class="v-vimeo-player__container" >
      <iframe src="https://player.vimeo.com/video/680434762?h=1de95b5033&title=0&byline=0&portrait=0"
              frameborder="0"
              allow="fullscreen; picture-in-picture"
              webkitallowfullscreen
              mozallowfullscreen
              allowfullscreen
              class="v-vimeo-player__container__iframe"
      ></iframe>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"


export default defineComponent({
  props: {},

})</script>

<style lang="scss">
.v-vimeo-player {
}

.v-vimeo-player__container {
  position: relative;
  width: 100%;
  padding-top: 50%;
  background: var(--jd-color--secondary);
}

.v-vimeo-player__container__iframe {
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
}
</style>
