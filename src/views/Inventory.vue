<template>
  <div class="v-inventory">
    <template
        v-if="globalState.device === 'reg'"
    >
      <div class="jd-button" style="cursor: default" v-if="globalState.apiProjects.symposium && globalState.abstractActivatedFilterTagForArticle.length === 0" >Welcome!</div>

      <div
          v-if="globalState.apiProjects.symposium && globalState.abstractActivatedFilterTagForArticle.length === 0"
      >
        <div>
          <p>Why is it that denim sneaks up on objects? Why do designers and marketers feel compelled to wrap commodities in denim-like materials? By claiming some higher aesthetic or symbolic property (why else adorn themselves in denim?), all the while flagrantly displaying their cheapness (the denim is fake), the denim-wrapped objects that artist Katharina Hohmann and designer Katharina Tietze have collected over the past 20 years form a puzzling and alluring whole. The Jeansdinge (‘denim things’) collection includes a wide range of objects, mass-produced commodities for the most part: desk chairs, condoms, plates, bikinis, perfume, headphones, etc.</p>
          <p>Yanking these objects out of consumption cycles, the collection affords a means through which to reflect on art, design and the various accusations of complicity with which they have been charged. What does a “vulgar” collection of denim-swathed objects have to say about both fields, their relation and our current moment? What histories, affects and stories does the collection ‘archive’ through them? In what ways can we account for the violence that underwrites the production of these mass-produced objects? What new narratives does it make possible?</p>
        </div>
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
    </template>

    <template
        v-if="globalState.device === 'small'"
    >
      <list-container></list-container>
    </template>

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
