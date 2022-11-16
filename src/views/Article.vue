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
}
</style>
