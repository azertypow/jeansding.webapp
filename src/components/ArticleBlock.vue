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
    document.querySelector('.v-app__body__right')!.addEventListener('scroll', this.onScrollAction)

    ;(this.$refs.articleBlockContainer as HTMLElement).append(this.articleContentHtmlElement)
  },

  beforeUnmount() {
    document.querySelector('.v-app__body__right')!.removeEventListener('scroll', this.onScrollAction)
  },

  computed: {
    articleContentHtmlElement(): HTMLElement {
      this.footNoteElements = []

      const domparser = new DOMParser()
      const articleDocument = domparser.parseFromString(`<div class="v-article-block__html"  >${this.html}</div>`, 'text/html')

      articleDocument.querySelectorAll('article-footnote').forEach((articleFootNote, key) => {

        if( ! (articleFootNote.parentElement instanceof HTMLElement) ) return

        const noteReferenceInText = articleFootNote.parentElement.insertBefore(articleDocument.createElement('span'), articleFootNote)
        noteReferenceInText.innerHTML = `&nbsp;[ ${key + 1} ]`
        noteReferenceInText.dataset.html = articleFootNote.innerHTML
        noteReferenceInText.dataset.index = (key + 1).toString()
        noteReferenceInText.className = "v-article-block-note-reference"
        this.footNoteElements.push( noteReferenceInText )

        articleFootNote.remove()
      })

      return articleDocument.body.firstElementChild as HTMLElement
    }
  },

  methods: {
    onScrollAction() {
      for (const footNoteElement of this.footNoteElements) {
        console.log(footNoteElement.getBoundingClientRect())
        console.log(footNoteElement.getBoundingClientRect().top, footNoteElement.getBoundingClientRect().bottom)

        const footNoteIsVisibleOnScreen =
            footNoteElement.getBoundingClientRect().top > 50
            && footNoteElement.getBoundingClientRect().top < window.innerHeight

        const footNoteIsNotVisibleOnScreen = !footNoteIsVisibleOnScreen

        const keyOfNoteInGlobalArrayOfNoteToShow = stateStore().$state.footNotes.findIndex(value => {
          return value.index === parseInt(footNoteElement.dataset.index as string)
        })

        const footNoteIsNotInGlobalArrayOfNotesToShow = keyOfNoteInGlobalArrayOfNoteToShow < 0
        const footNoteIsInTheArrayOfNotesToShow = ! footNoteIsNotInGlobalArrayOfNotesToShow

        if ( footNoteIsVisibleOnScreen && footNoteIsNotInGlobalArrayOfNotesToShow ) {
          stateStore().$state.footNotes.push({
            index: parseInt(footNoteElement.dataset.index as string),
            html: footNoteElement.dataset.html as string
          })
        }

        if(footNoteIsNotVisibleOnScreen && footNoteIsInTheArrayOfNotesToShow) {
          stateStore().$state.footNotes.splice(keyOfNoteInGlobalArrayOfNoteToShow, 1)
        }


      }
    }
  },

});
</script>

<style lang="scss" >
.v-article-block {

}

.v-article-block-note-reference {
  color: var(--jd-palette--blue-dark);
}
</style>