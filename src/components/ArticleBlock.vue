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

  computed: {
    htmlCleanGallery(): string {

      const htmlContent = document.createElement('div')
      htmlContent.innerHTML = this.html

      if( ! (htmlContent instanceof HTMLElement) ) return ''

      const allFigures = htmlContent.querySelectorAll('figure')

      for (const figure of allFigures) {
        const divGalleryContainer = document.createElement('div')
        divGalleryContainer.className = 'jd-gallery-img'
        const divForCursor = document.createElement('div')
        divForCursor.className = 'jd-gallery-img__cursor'
        divGalleryContainer.appendChild(divForCursor)

        figure.querySelectorAll('img').forEach(imgElement => {
          divGalleryContainer.appendChild( imgElement.cloneNode(true) )
        })

        if([... figure.querySelectorAll('img')].length === 1)  divGalleryContainer.classList.add('not-gallery')

        htmlContent
            .insertBefore( divGalleryContainer, figure )
        figure.remove()
      }


      return htmlContent.innerHTML
    }
  },

  methods: {
    getMousePositionRelativeToTheGallery(e: MouseEvent, gallery: HTMLElement): 'left' | 'right' {
      const xPosition = e.clientX - gallery.getBoundingClientRect().x

      if( xPosition * 100 / gallery.getBoundingClientRect().width < 50 )
        return  'left'

      return 'right'
    },

    async mouseClickGallery( e: MouseEvent, gallery: HTMLElement ) {
      if(this.getMousePositionRelativeToTheGallery(e, gallery) === 'left' )
        this.galleryScrollToLeft(gallery)
      else
        this.galleryScrollToRight(gallery)
    },

    galleryScrollToLeft(gallery: HTMLElement) {
      const listOfImage = gallery.querySelectorAll('img')
      for(const img of listOfImage) {
        if (img.getBoundingClientRect().x > gallery.getBoundingClientRect().x + 10) {
          gallery.scrollTo({
            left: img.offsetLeft,
            behavior: 'smooth'
          })
          break
        }
      }
    },

    galleryScrollToRight(gallery: HTMLElement) {
      const listOfImage = [...gallery.querySelectorAll('img')].reverse()
      for(const img of listOfImage) {
        if (img.getBoundingClientRect().x < gallery.getBoundingClientRect().x - 10) {
          gallery.scrollTo({
            left: img.offsetLeft,
            behavior: 'smooth'
          })
          break
        }
      }
    },

    async mouseOverGallery(e: MouseEvent, gallery: HTMLElement) {

      const cursorContainer = gallery.querySelector('.jd-gallery-img__cursor')
      if( !(cursorContainer instanceof HTMLElement) ) return

      if( this.getMousePositionRelativeToTheGallery(e, gallery) === 'left' )
        cursorContainer.innerHTML = "&larr;"

      else cursorContainer.innerHTML = "&rarr;"

      cursorContainer.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`

    },

    async getArticleContentHtmlElement(): Promise<HTMLElement> {
      const domparser = new DOMParser()
      const articleDocument = domparser.parseFromString(`<div class="v-article-block__html"  >${this.htmlCleanGallery}</div>`, 'text/html')

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

      const allFigureElementsInArticle = articleDocument.querySelectorAll('figure')

      Object.values( allFigureElementsInArticle ).forEach( figureElement => {
        if( figureElement.querySelectorAll('ul > li > img').length === 1 ) figureElement.classList.add('ts-article-block-has-only-one-image')
      })


      // gallery navigation
      articleDocument.querySelectorAll('.jd-gallery-img').forEach(value => {
        if (!(value instanceof HTMLElement)) return
        value.addEventListener('mousemove', e => this.mouseOverGallery(e, value) )
        value.addEventListener('mouseenter', () =>{
          const cursorElement = value.querySelector('.jd-gallery-img__cursor')
          if ( cursorElement instanceof HTMLElement)
            cursorElement.style.display = 'block'
        })
        value.addEventListener('mouseleave', () =>{
          const cursorElement = value.querySelector('.jd-gallery-img__cursor')
          if ( cursorElement instanceof HTMLElement)
            cursorElement.style.display = 'none'
        } )
        value.addEventListener('click',     e => this.mouseClickGallery(e, value) )
      })


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
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */

        &::-webkit-scrollbar {
          display: none;
        }

        > li {
          scroll-snap-align: start;

          &:only-child {
            margin: auto;
          }
        }
      }

      &.ts-article-block-has-only-one-image {

        ul {
          padding-right: 0 !important;
          scroll-snap-type: none;
          margin-left: 0;
        }
      }
    }
  }
}

.jd-gallery-img {
  user-select: none;
  display: flex;
  flex-direction: row;
  width: 100%;
  box-sizing: border-box;
  overflow: auto;
  padding-right: 100%;
  scroll-snap-type: x mandatory;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */

  cursor: none;

  .jd-gallery-img__cursor {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    pointer-events: none;
    user-select: none;
    //mix-blend-mode: difference;
    font-size: calc( 1vh + 4rem);
  }

  &::-webkit-scrollbar {
    display: none;
  }

  > img {
    scroll-snap-align: start;
    display: block;
    width: auto;
    height: calc(100vh - 15rem);
    min-height: 20rem;
    padding-right: 1rem;

    &.is-loading{
      filter: blur(20px);
    }
    &.is-load {
      transition: filter .25s linear;
      filter: blur(0);
    }

    &:only-child {
      margin: auto;
    }
  }

  &.not-gallery {
    justify-content: center;
    padding: 0;
    cursor: default;

    .jd-gallery-img__cursor {
      display: none !important;
    }
  }
}

.v-article-block-note-reference {
  color: var(--jd-palette--blue-dark);
}
</style>
