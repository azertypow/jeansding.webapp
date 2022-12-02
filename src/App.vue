<template>
  <div
      class="v-app"
      :class="{
        'credit-is-open': creditIsOpen,
        'menu-is-open': menuIsOpen,
      }"
  >
    <header>
      <app-header></app-header>
    </header>

    <div
        class="v-app__cross-icon"
        v-if="creditIsOpen"
        @click="crossIconClicked"
    >
      <cross-icon></cross-icon>
    </div>

    <div class="v-app__body">
      <div
          class="v-app__body__left"
      >
        <list-container></list-container>
      </div>

      <div
          class="v-app__body__right"
      >
        <router-view v-slot="{ Component, route }">
          <transition name="transition-page">
            <component :is="Component" :key="route.path" />
          </transition>
        </router-view>
      </div>
    </div>

    <footer>
      <div class="v-app__footnote">
        <div
            v-for="note of footNotes"
            v-html="note.index + ' - ' + note.html"
        ></div>
      </div>
      <app-footer></app-footer>
    </footer>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import AppHeader from "@/components/AppHeader.vue"
import AppFooter from "@/components/AppFooter.vue"
import ListContainer from "@/components/ListContainer.vue"
import { stateStore } from "./stores/stateStore"
import CrossIcon from "@/components/crossIcon.vue";

export default defineComponent({
  components: {CrossIcon, ListContainer, AppFooter, AppHeader, },

  computed: {
    creditIsOpen(): boolean {
      return this.stateSore.creditIsOpen
    },

    menuIsOpen(): boolean {
      return this.stateSore.menuIsOpen
    },

    footNotes(): {index: number, html: string}[] {
      return this.stateSore.footNotes
    }
  },

  data() {
    return {
      stateSore: stateStore(),
    }
  },

  methods: {
    crossIconClicked() {
      this.stateSore.creditIsOpen = false
    }
  }

})</script>

<style lang="scss">
.v-app {
  padding-top: var(--v-app-header--title-height);
  height: 100%;
  box-sizing: border-box;

  > header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
  }

  > footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 10;
  }
}

.v-app__cross-icon {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
}

.v-app__body {
  display: block;
  height: 100%;
  position: relative;
}

.v-app__body__left {
  padding-left: 1rem;
  padding-right: .5rem;
  width: 75%;
  transition: width 500ms ease-in-out;
  box-sizing: border-box;
  height: 100%;
  overflow: scroll;
  background: var(--jd-color--white);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;

  &::-webkit-scrollbar {
    background: var(--jd-color--white);
    width: .5rem;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--jd-color--main);
    border-radius: 1rem;
  }

  .is-projects & {
    width: 25%;
  }
}

.v-app__body__right {
  color: var(--jd-color--secondary);
  width: 25%;
  box-sizing: border-box;
  padding-bottom:  50vh;
  height: 100%;
  overflow: scroll;
  position: absolute;
  right: 0;
  top: 0;
  //transition: width 500ms ease-in-out;

  .is-projects & {
    width: 75%;
    padding-top: 1rem;
  }

  &::-webkit-scrollbar {
    background: var(--jd-color--white);
    width: .5rem;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--jd-color--secondary);
    border-radius: 1rem;
  }
}

.v-app__footnote {
  position: fixed;
  right: 0;
  bottom: var(--jd-height-of-header);
  width: calc( 100% / 4 * 3);
  box-sizing: border-box;
  background: white;
  padding: .5rem;
  padding-right: 1.5rem;

  > * {
    max-width: var(--js-max-width--reg);
    margin: auto;
  }
}

</style>
