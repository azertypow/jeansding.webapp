<template>
  <div class="v-inventory">

    <div
        v-if="globalState.apiProjects.symposium"
    >
      <h4>text</h4>
      <h3>{{ globalState.apiProjects.symposium.description_title }}</h3>
      <h5>{{ globalState.apiProjects.symposium.description_author }}</h5>

      <div
          v-html="cleanedIntroSymposiumForAside"
      ></div>
    </div>

    <template
        v-if="globalState.apiProjects.symposium"
    >
      <h4>Symposium</h4>
      <div
        v-for="article of globalState.apiProjects.symposium.children"
      >
        <article-container
            :article-data="article"
        ></article-container>
      </div>
    </template>

  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import ListContainer from "@/components/ListContainer.vue"
import ArticleContainer from "@/components/ArticleContainer.vue"
import {stateStore} from "@/stores/stateStore"
import {cleanIntroHTML} from "@/Utils/cleanIntroHTML"

export default defineComponent({
  components: {ArticleContainer, ListContainer},

  data() {
    return {
      globalState: stateStore(),
    }
  },

  computed: {
    cleanedIntroSymposiumForAside(): string {

      const firstBlockHtml = Object.values(this.globalState.apiProjects
          .symposium
          .text)[0]
      || '<p>continu to read</p>'

      return  cleanIntroHTML(firstBlockHtml) + '<p>…</p>'
    }
  },

})</script>

<style lang="scss">
.v-inventory {
  padding-left: .5rem;
  padding-right: .5rem;
}
</style>
