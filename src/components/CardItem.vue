<template>
  <div
      v-show="isVisible"
      class="v-card-item"
      :class="{
        'is-open': isOpen,
      }"
  >
    <div
        class="v-card-item__header"
        @click="toggleOpenStatus()"
    >
      <div
          class="v-card-item__icon-box"
      >
        <img
            v-if="dataTag.vimeoLink && $route.path === '/'"
            src="../assets/icons/play.svg"
            alt="icon info: this item contain a video"
        />

        <img
            v-if="hasBookArticleLinked && $route.path === '/'"
            src="../assets/icons/book.svg"
            alt="icon info: this item contain a book link"
        />
      </div>

      <div
          class="v-card-item--id v-card-item__coll jd-with-gutter"
      >
        {{ dataTag.id }}
      </div>
      <div
          class="v-card-item--title v-card-item__coll jd-with-gutter"
      >
        {{ dataTag.title }}
      </div>

        <div
            class="v-card-item__coll jd-with-gutter"
            v-show="$route.path === '/'"
        >
          <tag
              v-for="tagName of dataTag.category"
              :name="tagName"
          ></tag>
        </div>
    </div>

      <div
          class="v-card-item__body"
      >
        <div
            class="v-card-item__body__top"
        >
          <image-lazy-load
              v-for="img of dataTag.img"
              :image-data="img"
              alt=""
              size="reg"
          />
        </div>

        <transition name="item__body">
        <div
            class="v-card-item__body__bottom"
            v-show="isOpen"
        >
          <div
              class="v-card-item__body__bottom__text-content"
              v-html="dataTag.text"
          ></div>

          <ul>
            <li><strong>Date:</strong     > {{dataTag.infoDate}}</li>
            <li><strong>Object:</strong   > {{dataTag.infoObject}}</li>
            <li><strong>Dimension:</strong> {{dataTag.infoDimensions}}</li>
            <li><strong>Loan:</strong     > {{dataTag.infoLoan}}</li>
            <li><strong>Location:</strong > {{dataTag.infoLocation}}</li>
            <li><strong>Made:</strong     > {{dataTag.infoMade_in}}</li>
            <li><strong>Material:</strong > {{dataTag.infoMaterial}}</li>
            <li><strong>Price:</strong    > {{dataTag.infoPrice}}</li>
          </ul>

        </div>
        </transition>

      </div>

  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import type {PropType} from "vue"
import type {Api} from "@/Utils/api"
import Tag from "@/components/tag.vue"
import {stateStore} from "@/stores/stateStore"
import type {IVimeoOembed} from "@/Utils/vimeo";
import ImageLazyLoad from "@/components/ImageLazyLoad.vue";

export default defineComponent({
  components: {ImageLazyLoad, Tag},

  data() {
    return {
      globalState: stateStore(),
    }
  },

  methods: {
    toggleOpenStatus() {

      if(this.$route.name !== 'inventory') {
        this.globalState.itemToScrollOnInventoryIsOpen = this
        this.$router.push('/')
        return
      }

      this.globalState.currentOpenObject = this.isOpen ? null : this.dataTag;

      this.globalState.abstractActivatedFilterTagForArticle = this.isOpen ? this.dataTag.category : []

      this.globalState.updateFilteredArticles_bySection()

      this.setVimeoPlayerHTML()

      window.setTimeout(() => {
        document.querySelector('.v-app__body__left')?.scrollTo({
          behavior: 'smooth',
          top: this.$el.offsetTop - 101,
        })
      }, 150)
    },

    async setVimeoPlayerHTML() {
      if( ! this.dataTag.vimeoLink || ! this.isOpen) {

        this.globalState.vimeoPlayerForRightPanelInInventoryPage = null

      } else {

        const vimeoUrl = 'https://vimeo.com/api/oembed.json?autopip=1&title=0&byline=0&portrait=0&color=025BFA&responsive=1&url=' + encodeURI(this.dataTag.vimeoLink)
        this.globalState.vimeoPlayerForRightPanelInInventoryPage = (await (await window.fetch(vimeoUrl)).json() as IVimeoOembed).html

      }


    }

  },

  props: {
    dataTag:   {
      required: true,
      type: Object as PropType<Api.IItem>,
    },

    isAlwaysOpen: {
      required: false,
      type: Boolean,
      default: false,
    },

    disableTagFilterAction: {
      required: false,
      type: Boolean,
      default: false,
    },
  },

  computed: {
    isOpen(): boolean {
      if(this.globalState.itemImageMode) return true
      if (this.isAlwaysOpen) return true
      return this.dataTag.slug === this.globalState.currentOpenObject?.slug
    },

    isVisible(): boolean {
      if(this.disableTagFilterAction) return true
      if(this.globalState.activatedFilterTag.length < 1) return true

      if( this.$route.name === ':projectSection' || this.$route.name === ':projectSection/:articleUid')
        return this.globalState.activatedFilterTag.some(category=> this.dataTag.category?.includes(category))

      return this.globalState.activatedFilterTag.every(category=> this.dataTag.category?.includes(category))
    },

    hasBookArticleLinked(): boolean {
      if(! this.globalState.apiProjects['denimpop']) return false


      return  Object.values(this.globalState.apiProjects['denimpop'].children).find(value => {

        if( ! value.Linkwith ) return false

        return value.Linkwith?.split(',').find(slugOfLinkedWidth => {
          return slugOfLinkedWidth.trim() === this.dataTag.slug
        }) !== undefined
      }) !== undefined
    }
  },

})</script>

<style lang="scss">
@import "../assets/scss-var";

.v-card-item {
  width: 100%;
  user-select: none;
  position: relative;
}

.v-card-item__header {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  border-bottom: solid 1px;
  align-items: center;
  cursor: pointer;
  background: white;
  z-index: 1;
  position: relative;
  height: 1.9rem;

  .v-card-item__icon-box {
    position: absolute;
    height: 1rem;
    width: auto;
    right: 0;
    display: flex;

    > * {
      display: block;
      height: 1rem;
      width: auto;
      margin-left: .5rem;
    }
  }

  .is-open & {
    border-bottom: none;
  }

  > .v-card-item__coll {
    box-sizing: border-box;
    width: calc(100% / 3);
    white-space: nowrap;
  }

  .v-card-item--id {
    transition: padding-left .25s 1s linear;
  }

  .is-projects & > .v-card-item__coll {
    width: calc(100%);

    &.v-card-item--id {
      width: 3em;
      padding: 0;
      flex-shrink: 0;
    }
  }
}

.v-card-item__img-previous {
  display: block;
  position: absolute;
  top: 0;
  left: 4rem;
  width: calc( 100% / 3 - 3rem);
  height: auto;
  z-index: 10;
  pointer-events: none;

  .is-projects & {
    width: calc( 100% - 4rem);
  }

  .is-open & {
    display: none !important;
  }
}

.v-card-item__body {
  display: flex;
  flex-wrap: nowrap;
  border-bottom: solid 1px;
  padding-bottom: 1rem;
  flex-direction: column;

  .is-projects & {
    flex-direction: column;

    > * {
      width: 100%;
    }
  }

  .device-small & {
    flex-direction: column;

    > * {
      width: 100%;
    }
  }
}

.v-card-item__body__top {
  width: calc(100% / 3 * 2);
  box-sizing: border-box;
  padding-right: .5rem;

  img {
    display: block;
    width: 100%;
    height: auto;
  }

  .is-projects & {
    margin-bottom: 1rem;
    padding-right: 0;
  }
}

.v-card-item__body__bottom {
  width: calc(100% / 3);
  box-sizing: border-box;
  padding-left: .5rem;

  > ul {
    padding: 0;

    li {
      display: block;
      padding: 0;
    }

    .is-projects & {
      display: none;
    }
  }

  .is-projects & {
    padding-left: 0;
  }
}

.v-card-item__body__bottom__text-content {
  > *:first-child {
    margin-top: 0;
  }

  > *:last-child {
    margin-bottom: 0;
  }
}

.v-card-item--id,
.v-card-item--title {
  font-weight: 500;
}

.v-card-item--id {
  transition: width .5s 1s ease-in-out;

  @media (max-width: $break-width-reg) {
    width: 3rem !important;
  }
}

.v-card-item__vimeo {
  width: 100%;
  position: relative;

  > iframe {
    width: 100%;
    height: auto;
  }

  .is-projects & {
    display: none;
  }
}

</style>
