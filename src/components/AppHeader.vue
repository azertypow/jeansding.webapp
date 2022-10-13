<template>
  <div class="v-app-header">

    <div class="v-app-header__title v-app-header__title">
      <router-link to="/"       class="v-app-header__title__left jd-font-xxl">Inventory</router-link>
      <div                      class="v-app-header__title__center jd-font-xxl">Jeansding</div>
      <router-link to="/media"  class="v-app-header__title__right jd-font-xxl">Media</router-link>
      <div class="v-app-header__ui"></div>
    </div>

  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"

export default defineComponent({
  data() {
    return {
    }
  },

  computed: {},

})</script>

<style lang="scss">
.v-app-header {
  --v-app-header--title-height: 2em;
  --v-app-header--title-width: 16em;
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
}

.v-app-header__title__right {
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translate(0, -50%);
  color: var(--jd-color--secondary);
}

.v-app-header__title__center {
  text-align: center;
  position: relative;
}

.v-app-header__ui {
  width:  var(--v-app-header--ui-size);
  height: var(--v-app-header--ui-size);
  background-color: var(--jd-color--main);
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

  .is-media & {
    transform: translate(
            calc(var(--v-app-header--title-width) - var(--v-app-header--ui-size) ),
            -50%,
    );
  }
}
</style>
