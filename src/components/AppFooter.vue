<template>
  <div class="v-app-footer">
    <div
        class="v-app-footer__body__left"
    >
      <div class="jd-with-gutter">About/Contact</div>
    </div>

    <div
        class="v-app-footer__body__right"
    >
      <div
          v-if="!searchIsOpen"
          class="jd-with-gutter"
          @click="searchIsOpen = true"
      >
        <img src="../assets/icons/search.svg" alt="search" class="v-app-footer__search-icon" >
      </div>
      <div
          class="v-app-footer__search-bar"
          v-if="searchIsOpen"
      >
        <search-bar
            :tags-on-top="true"
        ></search-bar>
      </div>
      <div class="jd-with-gutter" style="white-space: nowrap">
        <img src="../assets/icons/menu.svg" alt="menu" class="v-app-footer__menu" >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import SearchBar from "@/components/SearchBar.vue";

export default defineComponent({
  components: {SearchBar},

  data() {
    return {
      searchIsOpen: false,
    }
  },
})</script>

<style lang="scss">
.v-app-footer {
  height: 3rem;
  color: var(--jd-color--white);
  background-color: var(--jd-color--varriable);
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  transition: background-color 1s ease-in-out;
}

.v-app-footer__body__left,
.v-app-footer__body__right {
  display: flex;
  align-items: center;
}

.v-app-footer__search-bar {
  width: 20rem;
}

.v-app-footer__search-icon,
.v-app-footer__menu {
  display: block;
  height: 1rem;
}
</style>
