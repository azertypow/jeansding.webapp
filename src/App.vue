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
        <RouterView />
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
  display: flex;
  flex-wrap: nowrap;
  height: 100%;
  padding-right: .5rem;
}

.v-app__body__left {
  padding-left: 1rem;
  padding-right: .5rem;
  width: 75%;
  transition: width 500ms ease-in-out;
  box-sizing: border-box;
  height: 100%;
  overflow: scroll;

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
  padding-bottom:  4rem;
  height: 100%;
  overflow: scroll;
  transition: width 500ms ease-in-out;

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
