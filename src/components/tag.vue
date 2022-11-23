<template>
  <button
      class="v-tag"
      @click.stop="pushTag"
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

  methods: {
    pushTag() {

      document.querySelector('.v-app__body__left')?.scrollTo({
        behavior: 'smooth',
        top: 0,
      })
      window.setTimeout(() => {
        this.stateStore.pushTag(this.name)
      }, 500)

    }
  },

})</script>

<style lang="scss">
.v-tag {
  cursor: pointer;
  border: none;
  border-left: solid var(--jd-color--white);
  padding: .4rem;
  background-color: var(--jd-color--white);
  color: inherit;
  font-size: .8rem;
  line-height: 1rem;
  text-transform: capitalize;

  &:hover {
    background-color: #ebebeb;
  }
}
</style>
