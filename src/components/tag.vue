<template>
  <button
      class="v-tag"
      @click.stop="pushTag"
      :class="{'is-grey': colorStyle === 'grey'}"
  >{{placeholder}}</button>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import type {PropType} from "vue"
import {stateStore} from "@/stores/stateStore"

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    colorStyle: {
      type: String as PropType<'default' | 'grey'>,
      default: 'default',
    },
  },

  data() {
    return {
      stateStore: stateStore()
    }
  },

  computed: {
    // todo string replace NULL
    placeholder(): string {return this.name.replace('null', 'coming soon')}
  },

  methods: {
    pushTag() {

      document.querySelector('.v-list-container__scroll-box')?.scrollTo({
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

  &.is-grey {
    background-color: #ebebeb;

    &:hover {
      background-color: var(--jd-color--main);
      color: white;
    }
  }
}
</style>
