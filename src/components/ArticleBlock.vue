<template>
  <div class="v-article-block"
       ref="articleBlockContainer"
  ></div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {stateStore} from "@/stores/stateStore";

export default defineComponent({
  name: 'ArticleBlock',
  components: {},

  data() {
    return {
      footNoteElements: [] as HTMLSpanElement[]
    }
  },

  props: {
    html: {
      required: true,
      type: String,
    }
  },

  mounted() {
    ;(this.$refs.articleBlockContainer as HTMLElement).append(this.articleContentHtmlElement)
  },

  beforeUnmount() {
    stateStore().clearFootNoteListAndRemoveScrollListener()
  },

  computed: {
    articleContentHtmlElement(): HTMLElement {
      const domparser = new DOMParser()
      const articleDocument = domparser.parseFromString(`<div class="v-article-block__html"  >${this.html}</div>`, 'text/html')

      articleDocument.querySelectorAll('article-footnote').forEach((articleFootNote) => {

        stateStore().pushFooterNoteElement( articleDocument, articleFootNote )

        articleFootNote.remove()
      })

      return articleDocument.body.firstElementChild as HTMLElement
    }
  },

});
</script>

<style lang="scss" >
.v-article-block {
  .v-article-block__html {

    figure {
      > ul {
        > li {
          &:only-child {
            margin: auto;
          }
        }
      }
    }

    figure > ul > li > img:only-child {
      display: block;
    }
  }
}

.v-article-block-note-reference {
  color: var(--jd-palette--blue-dark);
}
</style>