<template>
  <router-link
      class="v-article-container"
      :to="`/projects/${articleData.parentUid}/${articleData.uid}`"
  >
    <h3>{{articleData.title}}</h3>
    <h5>{{articleData.author}}</h5>
    <img
        v-if="thumbnail_url"
        :src="thumbnail_url" alt="article cover" class="v-article-container__img"
    >
    <div
        v-else
        class="v-article-container__intro"
        v-html="cleanedIntro"
    ></div>
  </router-link>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import type {PropType} from "vue"
import type {Api} from "@/Utils/api"
import {cleanIntroHTML} from "@/Utils/cleanIntroHTML"
import type {IVimeoOembed} from "@/Utils/vimeo"

export default defineComponent({

  data() {
    return {
      thumbnail_url: null as string | null,
    }
  },

  mounted() {
    this.$nextTick(() => {

      this.setThumbnail_url()
    })
  },

  props:{
    articleData: {
      type: Object as PropType<Api.IArticle>,
      required: true,
    },
  },

  methods: {
    async setThumbnail_url() {
      if(this.articleData.vimeoLink === null ) return
      if(this.articleData.vimeoLink.length < 1 ) return

      const vimeoUrl = 'https://vimeo.com/api/oembed.json?width=1280&url=' + encodeURI(this.articleData.vimeoLink)

      this.thumbnail_url = (await (await window.fetch(vimeoUrl)).json() as IVimeoOembed).thumbnail_url
    }
  },

  computed: {
    cleanedIntro(): string {
      return cleanIntroHTML(this.articleData.description)
    },
  }

})</script>

<style lang="scss" scoped >
.v-article-container {
  display: block;
  box-sizing: border-box;
  //border-bottom: solid 2px var(--jd-palette--blue-light);
  border-radius: .25rem;
  text-decoration: none;

  // transition
  transition: border-radius .5s ease-in-out;

  &:hover {
    border-radius: .5rem;
    box-shadow: 0 0 0 8px white, 0 0 0 10px var(--jd-palette--blue-light);
    img {
      border-bottom-right-radius: .5rem;
      border-bottom-left-radius:  .5rem;
    }
  }
}

.v-article-container__intro {
  max-height: 5rem;
  overflow: hidden;
}

.v-article-container__img {
  display: block;
  width: 100%;
}


h3, h5, p {
  font-size: .9rem;
  line-height: 1.2em;
}

h3 {
  text-transform: capitalize;
}

h5 {
  margin-bottom: .5rem;
}

</style>
