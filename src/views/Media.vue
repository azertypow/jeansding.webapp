<template>
  <div class="v-media">
    <header
        class="v-media__header"
    >
      <router-link
          v-for="(value, key) in globalState.apiProjects"
          :class="{'is-active': key === $route.params.projectSection}"
          :to="key"
          class="jd-button"
      >{{value.title}}</router-link>
    </header>

    <main
        v-if="globalState.apiProjects[$route.params.projectSection]"
    >
      <div
          class="v-media__intro"
      >
        <h3>{{ globalState.apiProjects[$route.params.projectSection].description_title }}</h3>
        <h5>{{ globalState.apiProjects[$route.params.projectSection].description_author }}</h5>

        <div
            v-for="block of globalState.apiProjects[$route.params.projectSection].text"
        >
          <div v-html="block" ></div>
        </div>
      </div>

      <section
          class="v-media__item"
      >
        <div
            class="v-media__item__grid"
            v-for="item of globalState.apiProjects[$route.params.projectSection].children"
        >
          <article-container
              style="border-bottom: none"
              :article-data="item"
          ></article-container>
        </div>
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import {stateStore} from "@/stores/stateStore"
import ArticleContainer from "@/components/ArticleContainer.vue"

export default defineComponent({
  components: {ArticleContainer},

  data(){return {



    globalState: stateStore(),

  }},

  computed: {
    sortedArticle() {
      /**
       * todo: trier par importance
       * moins l'articles a de relation avec les objet, plus il a une valeur élevé.
       * un article lié a un seul objet plus fort en importance
       * qu'un article lié a 2 objets
       * */
    }
  },

})</script>

<style lang="scss">
.v-media {
}

.v-media__header {
  display: flex;
  width: 100%;
  justify-content: center;
  box-sizing: border-box;
  padding-left: .5rem;
  padding-rigt: .5rem;

  > button, .jd-button {
    margin-left:  .5rem;
    margin-right: .5rem;
  }
}

.v-media__intro {
  box-sizing: border-box;
  padding-left: .5rem;
  padding-right: .5rem;
}

.v-media__item {
  display: flex;
  flex-wrap: wrap;
}

.v-media__item__grid {
  width: calc(100% / 4);
  box-sizing: border-box;
  padding-left: .5rem;
  padding-right: .5rem;
}

</style>
