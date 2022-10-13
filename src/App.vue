<template>
  <div
      class="v-app"
  >
    <header>
      <app-header></app-header>
    </header>

    <RouterView />

    <footer>
      <app-footer></app-footer>
    </footer>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import AppHeader from "@/components/AppHeader.vue"
import AppFooter from "@/components/AppFooter.vue"

export default defineComponent({
  components: {AppFooter, AppHeader},

  computed: {},

})</script>

<style lang="scss">
.v-app {
  padding-top: 2rem;
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
</style>
