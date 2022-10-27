<template>
  <button
      class="v-tag"
      @click="stateStore.activatedFilterTag.push(name)"
  >{{name}}</button>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import {stateStore} from "@/stores/stateStore"

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      stateStore: stateStore()
    }
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
  font-size: .8rem;
  line-height: 1rem;

  &:hover {
    border-left: solid currentColor;
    background-color: #ebebeb;
  }
}
</style>
