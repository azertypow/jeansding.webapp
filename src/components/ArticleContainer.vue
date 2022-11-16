<template>
  <router-link
      class="v-article-container"
      :to="'/projects/' + articleData.uid"
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

      const vimeoUrl = 'https://vimeo.com/api/oembed.json?url=' + encodeURI(this.articleData.vimeoLink)

      this.thumbnail_url = (await (await window.fetch(vimeoUrl)).json() as IVimeoOembed).thumbnail_url
    }
  },

  computed: {
    cleanedIntro(): string {
      return cleanIntroHTML(this.articleData.description)
    },
  }

})</script>

<style lang="scss" >
.v-article-container {
  box-sizing: border-box;
  padding-bottom: 1rem;
  border-bottom: solid 2px var(--jd-color--secondary);
}

.v-article-container__intro {
  max-height: 5rem;
  overflow: hidden;
}

.v-article-container__img {
  display: block;
  width: 100%;
}

</style>
