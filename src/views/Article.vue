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

    <div
        v-if="currentArticle"
        class="v-article__content"
    >

      <div
          class="v-article__content__vimeo-box"
          v-if="currentArticle.vimeoLink"
          v-html="video"
      ></div>

      <div
          class="v-article__content__header"
      >
        <div
            class="v-article__content__description jd-text-max-width-reg"
            v-html="currentArticle.description"
        ></div>
        <h1>{{currentArticle.title}}<template v-if="currentArticle.subtitle" ><br>{{currentArticle.subtitle}}</template></h1>
        <h2>{{currentArticle.author}}</h2>
      </div>

      <div
          class="v-article__blocks"
          v-for="element of currentArticle.article_content" v-html="element"
      ></div>
    </div>

    <section
        class="v-article__item"
    >
      <div
          class="v-article__item__grid"
          v-for="item of globalState.apiProjects[currentSectionUID].children"
      >
        <article-container
            style="border-bottom: none"
            :article-data="item"
        ></article-container>
      </div>
    </section>

  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import {stateStore} from "@/stores/stateStore"
import type {Api} from "@/Utils/api";
import type {IVimeoOembed} from "@/Utils/vimeo";
import ArticleContainer from "@/components/ArticleContainer.vue";

export default defineComponent({

  components: {ArticleContainer},

  data(){return {

    globalState: stateStore(),

    video: '',

  }},

  mounted() {
    this.$nextTick(() => {
      this.setVideo()
    })
  },

  methods: {
    async setVideo() {

      if(! this.currentArticle) return null

      const vimeoUrl = 'https://vimeo.com/api/oembed.json?autopip=1&title=0&byline=0&responsive=1&portrait=0&&color=025BFA&url=' + encodeURI(this.currentArticle.vimeoLink)

      this.video = (await (await window.fetch(vimeoUrl)).json() as IVimeoOembed).html
    }
  },

  computed: {

    apiProjects(): Api.IProjects {
      return this.globalState.apiProjects
    },

    currentArticle(): Api.IArticle | null {
      return this.apiProjects[this.projectSection]?.children['mediapage/'+this.projectSection+'/'+this.articleUid]
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
  padding: 0 .5rem;

  .v-article__content__vimeo-box {
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    transition: border-radius .5s ease-out;
    border-radius: 1rem;
    max-width: var(--js-max-width--reg);
    margin: 1rem auto auto auto;

    &:hover {
      border-radius: .2rem;
    }

    > * {
      display: block;
      margin: auto;
      height: 100%;
      width: 100%;
    }
  }

  .v-article__content__header {
    margin: 1rem auto 2rem auto;
    max-width: var(--js-max-width--reg);

    h1, h2 {
      text-align: center;
      margin: 0;
    }
  }

  .v-article__content__description {
    color: var(--jd-color--main);

    + * {
      margin-top: 4rem !important;
    }
  }

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

  .v-article__blocks {
    margin: auto;

    h1,
    h2 {
      margin-top: 5rem;
      margin-bottom: 0;
      text-align: center;

      + h1,
      + h2 {
        margin-top: 0;
      }
    }

    p {
      max-width: var(--js-max-width--reg);
      margin: auto;
      font-size:    1.2rem;
      line-height:  1.25em;
      margin-top: 1.25rem;
      margin-bottom: 1.25rem;
    }

    figure {
      display: block;
      box-sizing: border-box;
      width: 100%;
      margin: 0;
      padding: 0;

      > ul {
        display: flex;
        box-sizing: border-box;
        width: calc(100% + .5rem);
        height: calc(100vh - 15rem);
        overflow: auto;
        padding: 0;
        margin-left: -.5rem;

        li {
          display: block;
          box-sizing: border-box;
          height: 100%;
          padding: 0 .5rem;

          > img {
            display: block;
            width: auto;
            height: 100%;
          }
        }
      }
    }
  }

  .v-article__item {
    display: flex;
    flex-wrap: wrap;
  }

  .v-article__item__grid {
    width: calc(100% / 4);
    box-sizing: border-box;
    padding-left: .5rem;
    padding-right: .5rem;
  }

}
</style>
