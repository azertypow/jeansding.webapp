<template>
  <div class="v-media">
    <header
        class="v-media__header"
    >
      <router-link
          v-for="(value, key) in globalState.apiProjects"
          :class="{'is-active': key === currentSectionUID}"
          :to="'/projects/' + key"
          class="jd-button"
      >{{value.title}}</router-link>
    </header>

    <main
        class="v-media__content"
        v-if="globalState.apiProjects[currentSectionUID]"
    >
      <div
          class="v-media__intro"
      >
        <div
            class="v-media__intro-header"
        >
          <h1 v-if="globalState.apiProjects[currentSectionUID].description_title"       >{{ globalState.apiProjects[currentSectionUID].description_title }}</h1>
          <h2 v-if="globalState.apiProjects[currentSectionUID].description_subtitle"    >{{ globalState.apiProjects[currentSectionUID].description_subtitle }}</h2>
          <h5 v-if="globalState.apiProjects[currentSectionUID].description_author"      >{{ globalState.apiProjects[currentSectionUID].description_author }}</h5>
        </div>

        <div
            v-for="block of globalState.apiProjects[currentSectionUID].text"
            v-html="block"
            class="v-media__intro-text jd-text-max-width-reg"
        >
        </div>
      </div>

      <section
          class="v-media__item"
          v-if="globalState.apiProjects[currentSectionUID]"
      >
        <div
            class="v-media__item__coll"
        >
          <div
              v-if=         "getShortedItemForColumn(3)[0]"
              v-for="item of getShortedItemForColumn(3)[0]"
              class="v-media__item__grid"
          >
            <article-container
                style="border-bottom: none"
                :article-data="item"
            ></article-container>
          </div>
        </div>

        <div
            class="v-media__item__coll"
        >
          <div
              v-if=         "getShortedItemForColumn(3)[1]"
              v-for="item of getShortedItemForColumn(3)[1]"
              class="v-media__item__grid"
          >
            <article-container
                style="border-bottom: none"
                :article-data="item"
            ></article-container>
          </div>
        </div>

        <div
            class="v-media__item__coll"
        >
          <div
              v-if=         "getShortedItemForColumn(3)[2]"
              v-for="item of getShortedItemForColumn(3)[2]"
              class="v-media__item__grid"
          >
            <article-container
                style="border-bottom: none"
                :article-data="item"
            ></article-container>
          </div>
        </div>


      </section>
    </main>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import {stateStore} from "@/stores/stateStore"
import ArticleContainer from "@/components/ArticleContainer.vue"
import type {Api} from "@/Utils/api"

export default defineComponent({
  components: {ArticleContainer},

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

    currentProjectsSection(): Api.IProjectsSubpage | null {
      return this.globalState.apiProjects[this.currentSectionUID]
    },
  },

  methods: {
    getShortedItemForColumn(numCols: number): Api.IArticle[][] {

      const arrayToReturn: Api.IArticle[][] = []

      Object.values(this.globalState.apiProjects[this.currentSectionUID].children)
          .forEach((value, index) => {

            const collIndex = index % numCols

            arrayToReturn[collIndex] = Array.isArray(arrayToReturn[collIndex])
                ? [...arrayToReturn[collIndex], value]
                : [value]

          })

      return arrayToReturn
    }
  }

})</script>

<style lang="scss">
.v-media {

  .v-media__header {
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    padding-top: 1rem;
    padding-left: 1.5rem;
    padding-right: .5rem;
    right: 1rem;
    top: var(--v-app-header--title-height);
    width: calc(100% / 4 * 3 - 1rem);
    position: fixed;
    z-index: 100;
    background: white;
    box-shadow: 0 10px 0 0 var(--jd-color--white);

    > button, .jd-button {
      margin-left: .5rem;
      margin-right: .5rem;

      border-color: var(--jd-palette--blue-light);

      &.is-active {
        background-color: var(--jd-palette--blue-light);
      }
    }
  }

  .v-media__content {
    padding-top: 2rem;
  }

  .v-media__intro {
    box-sizing: border-box;
    padding-left: .5rem;
    padding-right: .5rem;
  }

  .v-media__intro-header {
    margin-top: 1rem;
    margin-bottom: 1rem;

    > * {
      margin: 0;
    }
  }

  .v-media__intro-text {
    > {
      h1, h2 {
        text-align: center;
        color: var(--jd-color--secondary);
      }
    }

    p {
      font-size: .9rem;
      line-height: 1.2em;
    }
  }

  .v-media__item {
    display: flex;
    flex-wrap: wrap;
    margin-top: 4rem;
  }

  .v-media__item__coll {
    width: calc(100% / 3);
    box-sizing: border-box;
    padding-left: .5rem;
    padding-right: .5rem;
    display: flex;
    flex-direction: column;
  }

  .v-media__item__grid + .v-media__item__grid {
    margin-top: 1rem;
  }
}

</style>
