<template>
  <div class="v-article">
    <header
        class="v-article__header"
    >
      <router-link
          v-for="(value, key) in apiProjects"
          :class="{'is-active': key === currentSectionUID}"
          :to="'/projects/' + key"
          class="jd-button"
      >{{value.title}}</router-link>
    </header>

    <h1>{{currentArticle.title}}</h1>

    <h2>{{currentArticle.author}}</h2>

    <div v-html="currentArticle.description"></div>

<!--    <div v-for="element of currentArticle.article_content" v-html="element"></div>-->

  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import {stateStore} from "@/stores/stateStore"
import type {Api} from "@/Utils/api";

export default defineComponent({

  data(){return {

    globalState: stateStore(),

  }},

  computed: {

    apiProjects(): Api.IProjects {
      return this.globalState.apiProjects
    },

    currentArticle(): Api.IArticle {
      console.log(this.apiProjects[this.projectSection])

      return this.apiProjects[this.projectSection].children['mediapage/'+this.projectSection+'/'+this.articleUid]
    },

    projectSection(): string {
      return this.$route.params.projectSection as string
    },

    articleUid(): string {
      return this.$route.params.articleUid as string
    },

    currentSectionUID():
        "symposium" |
        "artist-videos" |
        "articles" |
        "projects" {
      return this.$route.params.projectSection as string as
          "symposium" |
          "artist-videos" |
          "articles" |
          "projects"
    },
  },

})</script>

<style lang="scss">
.v-article {

  .v-article__header {
    display: flex;
    width: 100%;
    justify-content: center;
    box-sizing: border-box;
    padding-left: .5rem;
    padding-rigt: .5rem;

    > button, .jd-button {
      margin-left: .5rem;
      margin-right: .5rem;
    }
  }

}
</style>
