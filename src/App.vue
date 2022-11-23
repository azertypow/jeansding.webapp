<template>
  <div
      class="v-app"
  >
    <header>
      <app-header></app-header>
    </header>

    <div class="v-app__body">
      <div
          class="v-app__body__left"
      >
        <list-container></list-container>
      </div>

      <div
          class="v-app__body__right"
      >
        <router-view v-slot="{ Component }">
          <transition name="transition-page">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>

    <footer>
      <app-footer></app-footer>
    </footer>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import AppHeader from "@/components/AppHeader.vue"
import AppFooter from "@/components/AppFooter.vue"
import ListContainer from "@/components/ListContainer.vue"

export default defineComponent({
  components: {ListContainer, AppFooter, AppHeader, },

  computed: {},

})</script>

<style lang="scss">
.v-app {
  padding-top: 5rem;
  height: 100%;
  box-sizing: border-box;

  > header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
  }

  > footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 10;
  }
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
</style>
