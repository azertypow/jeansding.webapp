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
      <div class="jd-with-gutter" style="white-space: nowrap">
        <burger-icon
            @iconClicked="toggleMenu"
        ></burger-icon>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import SearchBar from "@/components/SearchBar.vue";
import BurgerIcon from "@/components/burgerIcon.vue";
import {stateStore} from "@/stores/stateStore";

export default defineComponent({
  components: {BurgerIcon, SearchBar},

  data() {
    return {
      searchIsOpen: false,
      stateStore: stateStore()
    }
  },

  methods: {
    toggleMenu(isOpen: boolean) {
      this.stateStore.menuIsOpen = isOpen
    },
  },
})</script>

<style lang="scss">
.v-app-footer {
  height:2rem;
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
