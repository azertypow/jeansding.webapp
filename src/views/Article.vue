<template>
  <div class="v-article">
    <header
        class="v-article__header"
    >
      <router-link
          v-for="(value, key) in globalState.apiProjects"
          :class="{'is-active': key === currentSectionUID}"
          :to="'/projects/' + key"
          class="jd-button"
      >{{value.title}}</router-link>
    </header>

    <h1>{{projectSection}}/{{articleUid}}</h1>

  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import {stateStore} from "@/stores/stateStore"

export default defineComponent({

  data(){return {

    globalState: stateStore(),

  }},

  computed: {

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
