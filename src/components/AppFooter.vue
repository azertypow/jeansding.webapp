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
      <div class="jd-with-gutter" style="white-space: nowrap">search item</div>
      <div class="jd-with-gutter" style="white-space: nowrap">nav item</div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"

export default defineComponent({

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
}

.v-app-footer__body__left,
.v-app-footer__body__right {
  display: flex;
}
</style>
