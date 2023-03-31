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
          class="v-card-item--id v-card-item__coll"
      >
        {{ dataTag.id }}
      </div>
      <div
          class="v-card-item--title v-card-item__coll"
      >
        {{ dataTag.title }}
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
            size="xs"
            :zoom-scale="2"
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
            <li><strong>Date:</strong     > {{new Date(dataTag.infoDate).getFullYear()}}</li>
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

      <div
          class="v-card-item__coll"
      >
        <div
            class="v-card-item__tag"
            v-for="tagName of dataTag.category"
        >
          <tag
              :name="tagName"
              color-style="grey"
          ></tag>
        </div>
      </div>

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

      this.globalState.currentOpenObject = this.isOpen ? null : this.dataTag;

      this.globalState.abstractActivatedFilterTagForArticle = this.isOpen ? this.dataTag.category : []

      this.globalState.updateFilteredArticles_bySection()

      this.setVimeoPlayerHTML()

      window.setTimeout(() => {
        document.querySelector('.v-list-container__scroll-box')?.scrollTo({
          behavior: 'smooth',
          top: this.$el.offsetTop - 101,
        })
      }, 150)
    },

    async setVimeoPlayerHTML() {
      if (!this.dataTag.vimeoLink || !this.isOpen) {

        this.globalState.vimeoPlayerForRightPanelInInventoryPage = null

      } else {

        const vimeoUrl = 'https://vimeo.com/api/oembed.json?autopip=1&title=0&byline=0&portrait=0&color=025BFA&responsive=1&url=' + encodeURI(this.dataTag.vimeoLink)
        this.globalState.vimeoPlayerForRightPanelInInventoryPage = (await (await window.fetch(vimeoUrl)).json() as IVimeoOembed).html

      }


    }

  },

  props: {
    dataTag: {
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
      if (this.globalState.itemImageMode) return true
      if (this.isAlwaysOpen) return true
      return this.dataTag.slug === this.globalState.currentOpenObject?.slug
    },

    isVisible(): boolean {
      if (this.disableTagFilterAction) return true
      if (this.globalState.activatedFilterTag.length < 1) return true

      if (this.$route.name === ':projectSection' || this.$route.name === ':projectSection/:articleUid')
        return this.globalState.activatedFilterTag.some(category => this.dataTag.category?.includes(category))

      return this.globalState.activatedFilterTag.every(category => this.dataTag.category?.includes(category))
    },

    hasBookArticleLinked(): boolean {
      if (!this.globalState.apiProjects['denimpop']) return false


      return Object.values(this.globalState.apiProjects['denimpop'].children).find(value => {

        if (!value.Linkwith) return false

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
  border-top: solid 1px;
  align-items: baseline;
  justify-content: flex-start;
  cursor: pointer;
  background: white;
  z-index: 1;
  position: relative;
  flex-direction: row;

  .v-card-item__icon-box {
    position: absolute;
    height: 1rem;
    width: auto;
    right: 0;
    top: .5rem;
    display: flex;

    > * {
      display: block;
      height: 1rem;
      width: auto;
      margin-left: .5rem;
    }
  }

  > .v-card-item__coll {
    box-sizing: border-box;
    width: 100%;
  }

  .v-card-item--id {
    width: auto;
    padding-right: 1rem;
  }
}

.v-card-item__tag {
  margin-top: 1rem;
  margin-right: .5rem;
  display: inline-block;
}

.v-card-item__body {
  display: flex;
  flex-wrap: nowrap;
  padding-bottom: 2rem;
  padding-top: .5rem;
  flex-direction: column;

  .device-mobile & {
    flex-direction: column;

    > * {
      width: 100%;
    }
  }
}

.v-card-item__body__top {
  width: 100%;
  box-sizing: border-box;

  img {
    display: block;
    width: 100%;
    height: auto;
  }
}

.v-card-item__body__bottom {
  width: 100%;
  box-sizing: border-box;

  > ul {
    padding: 0;

    li {
      display: block;
      padding: 0;
    }
  }
}

.v-card-item__body__bottom__text-content {
  margin-top: 1rem;

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
  padding-top: .5rem;
  white-space: break-spaces;
}
.v-card-item--title {
  padding-right: 3rem;
}

.v-card-item--id {
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
}

</style>
