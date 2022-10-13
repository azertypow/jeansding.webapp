<template>
  <button
      class="v-tag"
  >{{name}}</button>
</template>

<script lang="ts">
import {defineComponent} from "vue"

export default defineComponent({
  props: {
    name: String,
  },

})</script>

<style lang="scss">
.v-tag {
  cursor: pointer;
  border: none;
  border-left: solid var(--jd-color--white);
  padding: .5rem;
  background-color: var(--jd-color--white);
  color: inherit;

  &:hover {
    border-left: solid var(--jd-color--main);
    background-color: #ebebeb;
  }
}
</style>
