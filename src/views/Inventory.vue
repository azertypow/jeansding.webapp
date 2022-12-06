<template>
  <div class="v-inventory">

    <div
        v-if="globalState.apiProjects.symposium && globalState.abstractActivatedFilterTagForArticle.length === 0"
    >
      <h4>text</h4>
      <h3>{{ globalState.apiProjects.symposium.description_title }}</h3>
      <h5>{{ globalState.apiProjects.symposium.description_author }}</h5>

      <div
          v-html="cleanedIntroSymposiumForAside"
      ></div>
    </div>

    <div class="jd-button" v-if="globalState.filteredArticleBySections.symposium.length > 0">Symposium</div>
    <div
      v-for="article of globalState.filteredArticleBySections.symposium"
    >
      <article-container
          :article-data="article"
      ></article-container>
    </div>

    <div class="jd-button" v-if="globalState.filteredArticleBySections.denimpop.length > 0">Book</div>
    <div
        v-for="article of globalState.filteredArticleBySections.denimpop"
    >
      <article-container
          :article-data="article"
      ></article-container>
    </div>

    <div class="jd-button" v-if="globalState.filteredArticleBySections.exhibitions.length > 0">Exhibitions</div>
    <div
        v-for="article of globalState.filteredArticleBySections.exhibitions"
    >
      <article-container
          :article-data="article"
      ></article-container>
    </div>

  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import ListContainer from "@/components/ListContainer.vue"
import ArticleContainer from "@/components/ArticleContainer.vue"
import {stateStore} from "@/stores/stateStore"
import {cleanIntroHTML} from "@/Utils/cleanIntroHTML"
import type {Api} from "@/Utils/api";

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

      return  cleanIntroHTML(firstBlockHtml) + '<div>…</div>'
    },

  },

})</script>

<style lang="scss">
.v-inventory {
  padding-left: .5rem;
  padding-right: .5rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  > .jd-button {
    margin-top: 2rem;
    border-color: var(--jd-palette--blue-light);
  }
}
</style>
