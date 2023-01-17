<template>
  <div class="v-article-block"
       ref="articleBlockContainer"
  ></div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {stateStore} from "@/stores/stateStore";
import {fetchImageData} from "@/Utils/fetchImageData";

export default defineComponent({
  name: 'ArticleBlock',
  components: {},

  data() {
    return {
      footNoteElements: [] as HTMLSpanElement[],
    }
  },

  props: {
    html: {
      required: true,
      type: String,
    }
  },

  async mounted() {
    ;(this.$refs.articleBlockContainer as HTMLElement).append( await this.getArticleContentHtmlElement() )
  },

  beforeUnmount() {
    stateStore().clearFootNoteListAndRemoveScrollListener()
  },

  methods: {
    async getArticleContentHtmlElement(): Promise<HTMLElement> {
      const domparser = new DOMParser()
      const articleDocument = domparser.parseFromString(`<div class="v-article-block__html"  >${this.html}</div>`, 'text/html')

      // footnote
      articleDocument.querySelectorAll('article-footnote').forEach((articleFootNote) => {

        stateStore().pushFooterNoteElement( articleDocument, articleFootNote )

        articleFootNote.remove()
      })

      //image
      const imageInArticle = articleDocument.querySelectorAll('img')
      const currentArticlePath = this.$router.currentRoute.value.fullPath.replace('/projects/', '')
      const articleName = `mediapage/${currentArticlePath}`

      for (const image of imageInArticle) {

        const fileName = image.src.split('/').pop() || ''
        image.classList.add('is-loading')
        image.src = '' // prevent loaded image

        fetchImageData({
          articleName, fileName
        }).then(imageData => {
          image.src = imageData.resize.tiny

          const loadedImage = new Image()
          loadedImage.src = imageData.resize.reg

          loadedImage.addEventListener('load', () => {
            image.src = loadedImage.src
            image.classList.add('is-load')
          })
        })

      }

      return articleDocument.body.firstElementChild as HTMLElement
    }
  },

});
</script>

<style lang="scss" >
.v-article-block {
  .v-article-block__html {

    //todo: tu remove
    h5 {
      text-align: center;
      text-indent: 0;
      top: 4rem;
      position: relative;
    }

    figure {
      > ul {
        scroll-snap-type: x mandatory;
        padding-right: 100% !important;

        > li {
          scroll-snap-align: start;

          &:only-child {
            margin: auto;
          }
        }
      }
    }

    figure > ul > li > img:only-child {
      display: block;
    }

    img {
      &.is-loading{
        filter: blur(20px);
      }
      &.is-load {
        transition: filter .25s linear;
        filter: blur(0);
      }
    }

  }
}

.v-article-block-note-reference {
  color: var(--jd-palette--blue-dark);
}
</style>