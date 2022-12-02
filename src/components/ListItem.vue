<template>
  <div
      v-show="isVisible"
      class="v-list-item"
      :class="{
        'is-open': isOpen,
      }"
  >
    <template
        v-if="imagePreviousIsOpen"
    >
      <img
          v-for="img of dataTag.img"
          alt="item image previous"
          :src="img.mediaUrl"
          class="v-list-item__img-previous"
      >
    </template>
    <div
        class="v-list-item__header"
        @click="toggleOpenStatus()"
        @mouseenter="showImagePrevious()"
        @mouseleave="hiddeImagePrevious()"
    >
      <img
          class="v-list-item__icon-video"
          v-if="vimeoPlayerHTML && $route.path === '/'"
          src="../assets/icons/play.svg"
          alt="icon info: this item contain a video"
      />

      <div
          class="v-list-item--id v-list-item__coll jd-with-gutter"
      >
        {{ dataTag.id }}
      </div>
      <div
          class="v-list-item--title v-list-item__coll jd-with-gutter"
      >
        {{ dataTag.title }}
      </div>

<!--      <transition name="slide-fade">-->
        <div
            class="v-list-item__coll jd-with-gutter"
            v-show="$route.path === '/'"
        >
          <tag
              v-for="tagName of dataTag.category"
              :name="tagName"
          ></tag>
        </div>
<!--      </transition>-->
    </div>

    <transition name="item__body">
      <div
          class="v-list-item__body"
          v-if="isOpen"
      >
        <div
            class="v-list-item__body__left"
        >
          <img
              v-for="img of dataTag.img"
              :src="img.mediaUrl"
              alt=""
          />
        </div>
        <div
            class="v-list-item__body__right"
        >
          <div
              class="v-list-item__body__right__text-content"
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

          <div
              class="v-list-item__vimeo"
              v-if="vimeoPlayerHTML"
              v-html="vimeoPlayerHTML"
          >
          </div>
        </div>

      </div>
    </transition>

  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import type {PropType} from "vue"
import type {Api} from "@/Utils/api"
import Tag from "@/components/tag.vue"
import {stateStore} from "@/stores/stateStore"
import type {IVimeoOembed} from "@/Utils/vimeo";

export default defineComponent({
  components: {Tag},

  data() {
    return {
      globalState: stateStore(),
      imagePreviousIsOpen: false,
      vimeoPlayerHTML: null as string | null
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.setVimeoPlayerHTML()
    })
  },

  methods: {
    toggleOpenStatus() {
      if(this.$route.name === 'media') return
      this.isOpen ?
          this.globalState.currentOpenObject = null
          : this.globalState.currentOpenObject = this.dataTag

      window.setTimeout(() => {
        document.querySelector('.v-app__body__left')?.scrollTo({
          behavior: 'smooth',
          top: this.$el.offsetTop - 100,
        })
      }, 150)
    },

    showImagePrevious() {
      this.imagePreviousIsOpen = true;
    },

    hiddeImagePrevious() {
      this.imagePreviousIsOpen = false;
    },

    async setVimeoPlayerHTML() {
      if( ! this.dataTag.vimeoLink ) return

      const vimeoUrl = 'https://vimeo.com/api/oembed.json?autopip=1&title=0&byline=0&portrait=0&color=025BFA&responsive=1&url=' + encodeURI(this.dataTag.vimeoLink)

      this.vimeoPlayerHTML = (await (await window.fetch(vimeoUrl)).json() as IVimeoOembed).html

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
      if (this.isAlwaysOpen) return true
      return this.dataTag.slug === this.globalState.currentOpenObject?.slug
    },

    isVisible(): boolean {
      if(this.disableTagFilterAction) return true
      if(this.globalState.activatedFilterTag.length < 1) return true
      return this.globalState.activatedFilterTag.every(category=> this.dataTag.category?.includes(category))
    },
  },

})</script>

<style lang="scss">
.v-list-item {
  width: 100%;
  user-select: none;
  position: relative;
}

.v-list-item__header {
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

  .v-list-item__icon-video {
    position: absolute;
    height: 1rem;
    width: auto;
    right: 0;
  }

  > .v-list-item__coll {
    box-sizing: border-box;
    width: calc(100% / 3);
    white-space: nowrap;
  }

  .is-projects & > .v-list-item__coll {
    width: calc(100%);

    &:first-child {
      width: 3rem;
      flex-shrink: 0;
    }
  }
}

.v-list-item__img-previous {
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
}

.v-list-item__body {
  display: flex;
  flex-wrap: nowrap;
  border-bottom: solid 1px;
  padding-bottom: 1rem;

  .is-projects & {
    flex-direction: column;

    > * {
      width: 100%;
    }
  }
}

.v-list-item__body__left {
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

.v-list-item__body__right {
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

.v-list-item__body__right__text-content {
  > *:first-child {
    margin-top: 0;
  }

  > *:last-child {
    margin-bottom: 0;
  }
}

.v-list-item--id,
.v-list-item--title {
  font-weight: 500;
}

.v-list-item__vimeo {
  width: 100%;
  position: relative;

  > iframe {
    width: 100%;
    height: auto;
  }
}

</style>
