<template>
  <div class="v-inventory">
    <template
        v-if="globalState.device === 'reg'"
    >
      <div
          style="margin-top: 0; padding-top: .5rem"
          class="v-inventory__section-title"
          v-if="globalState.abstractActivatedFilterTagForArticle.length === 0"
      >
        <div class="jd-button" style="cursor: default" >Welcome!</div>
      </div>

      <div
          v-if="globalState.abstractActivatedFilterTagForArticle.length === 0"
      >
        <div>
          <p>Why is it that denim sneaks up on objects? Why do designers and marketers feel compelled to wrap commodities in denim-like materials? By claiming some higher aesthetic or symbolic property (why else adorn themselves in denim?), all the while flagrantly displaying their cheapness (the denim is fake), the denim-wrapped objects that artist Katharina Hohmann and designer Katharina Tietze have collected over the past 20 years form a puzzling and alluring whole. The Jeansdinge (‘denim things’) collection includes a wide range of objects, mass-produced commodities for the most part: desk chairs, condoms, plates, bikinis, perfume, headphones, etc.</p>
          <p>Yanking these objects out of consumption cycles, the collection affords a means through which to reflect on art, design and the various accusations of complicity with which they have been charged. What does a “vulgar” collection of denim-swathed objects have to say about both fields, their relation and our current moment? What histories, affects and stories does the collection ‘archive’ through them? In what ways can we account for the violence that underwrites the production of these mass-produced objects? What new narratives does it make possible?</p>
        </div>
      </div>

      <div
          class="v-list-item__vimeo"
          v-if="globalState.vimeoPlayerForRightPanelInInventoryPage"
          v-html="globalState.vimeoPlayerForRightPanelInInventoryPage"
      >
      </div>

      <template
          v-if="globalState.abstractActivatedFilterTagForArticle.length === 0"
      >
        <div class="v-inventory__section-title">
          <router-link
              to="projects/symposium"
              class="jd-button"
          >Symposium</router-link>
        </div>
        <div
          v-for="article of globalState.filteredArticleBySections.symposium"
        >
          <article-container
              :article-data="article"
          ></article-container>
        </div>
      </template>

      <div class="v-inventory__section-title" v-if="globalState.filteredArticleBySections.denimpop.length > 0"
      >
        <router-link
            to="projects/denimpop"
            class="jd-button"
        >Book</router-link>
      </div>
      <div
          v-for="article of globalState.filteredArticleBySections.denimpop"
      >
        <article-container
            :article-data="article"
        ></article-container>
      </div>

      <template
          v-if="globalState.abstractActivatedFilterTagForArticle.length === 0"
      >
        <div class="v-inventory__section-title">
          <router-link
              to="projects/exhibitions"
              class="jd-button"
          >Exhibitions</router-link>
        </div>
        <div
            v-for="article of globalState.filteredArticleBySections.exhibitions"
        >
          <article-container
              :article-data="article"
          ></article-container>
        </div>
      </template>
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

export default defineComponent({
  components: {ArticleContainer, ListContainer},

  data() {
    return {
      globalState: stateStore(),
    }
  },

})</script>

<style lang="scss">
.v-inventory {
  padding-left: .5rem;
  padding-right: .5rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  > div:not(.jd-button) {
    width: 100%;
  }


  .v-inventory__section-title {
    position: sticky;
    top: -1rem;
    width: 100%;
    margin-top: 1rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    background: white;
    display: flex;
    justify-content: center;
    box-shadow: -10px 0 0px 0px white, 10px 0 0px 0px white;

    > .jd-button {
      border-color: var(--jd-palette--blue-light);
    }
  }
}
</style>
