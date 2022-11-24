<template>
  <div class="v-app-header">

    <div class="v-app-header__title">
      <router-link to="/"       class="v-app-header__title__left jd-font-xxl">Inventory</router-link>
      <div                      class="v-app-header__title__center jd-font-xxl" style="font-weight: 600">Jeansdinge</div>
      <router-link to="/projects"  class="v-app-header__title__right jd-font-xxl">Projects</router-link>
      <div
          class="v-app-header__ui"
          @click="smileyClicked"
      >
        <jeansdinge-smiley></jeansdinge-smiley>
        <div class="v-app-header__background"></div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import JeansdingeSmiley from "@/components/icons/JeansdingeSmiley.vue"
import {stateStore} from "@/stores/stateStore";

export default defineComponent({
  components: {JeansdingeSmiley},
  data() {
    return {
      stateStore: stateStore()
    }
  },

  computed: {},

  methods: {
    smileyClicked() {
      this.stateStore.creditIsOpen = true
    }
  },

})</script>

<style lang="scss">
.v-app-header {
  --v-app-header--title-height: 5em;
  --v-app-header--title-width: 21em;
  --v-app-header--ui-size: 4rem;
  background: var(--jd-color--white);
  box-shadow: 0 10px 10px  var(--jd-color--white);
}

.v-app-header__title {
  position: relative;
  margin: auto;
  height: var(--v-app-header--title-height);
  width: var(--v-app-header--title-width);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.v-app-header__title__left {
  position: absolute;
  right: 100%;
  top: 50%;
  transform: translate(0, -50%);
  color: var(--jd-palette--blue-dark);
}

.v-app-header__title__right {
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translate(0, -50%);
  color: var(--jd-palette--blue-light);
}

.v-app-header__title__center {
  text-align: center;
  position: relative;
  color: var(--jd-color--varriable);
  transition: color 1s ease-in-out;
}

.v-app-header__ui {
  width:  var(--v-app-header--ui-size);
  height: var(--v-app-header--ui-size);
  border-radius: 100%;
  position: absolute;
  top: 50%;
  left: 0;
  z-index: 0;
  cursor: pointer;
  transition: transform 750ms ease-in-out;

  transform: translate(
          calc(var(--v-app-header--title-width) / 2 - var(--v-app-header--ui-size) / 2),
          -50%,
  );

  .is-inventory & {
    transform: translate(
            0,
            -50%,
    );
  }

  .is-projects & {
    transform: translate(
            calc(var(--v-app-header--title-width) - var(--v-app-header--ui-size) ),
            -50%,
    );
  }

  .v-app-header__background {
    background-color: var(--jd-color--varriable);
    position: absolute;
    top:  50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width:  0;
    height: 0;
    border-radius: 100%;

    // transitions properties
    transition:
        width         1s ease-in-out 0s,
        height        1s ease-in-out 0s;
  }

  .credit-is-open & {
    transform: translate(
            calc(var(--v-app-header--title-width) / 2 - var(--v-app-header--ui-size) / 2),
            calc( -50% + 50vh),
    );

    .v-app-header__background {
      width:  calc(200vw);
      height: calc(200vw);

      transition:
          width         .75s ease-in-out .25s,
          height        .75s ease-in-out .25s;
    }
  }
}

</style>
