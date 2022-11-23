<template>
  <div class="v-app-header">

    <div class="v-app-header__title">
      <router-link to="/"       class="v-app-header__title__left jd-font-xxl">Inventory</router-link>
      <div                      class="v-app-header__title__center jd-font-xxl">Jeansdinge</div>
      <router-link to="/projects"  class="v-app-header__title__right jd-font-xxl">Projects</router-link>
      <div class="v-app-header__ui">
        <jeansdinge-smiley></jeansdinge-smiley>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import JeansdingeSmiley from "@/components/icons/JeansdingeSmiley.vue"

export default defineComponent({
  components: {JeansdingeSmiley},
  data() {
    return {
    }
  },

  computed: {},

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
  transition: transform 500ms ease-in-out;

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
}

</style>
