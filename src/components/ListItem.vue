<template>
  <div
      @click="toggleOpenStatus()"
      class="v-list-item"
  >
    <div
        class="v-list-item__header"
    >
      <div
          class="v-list-item__coll"
      >
        {{ dataTag.id }}
      </div>
      <div
          class="v-list-item__coll"
      >
        {{ dataTag.title }}
      </div>
      <div
          class="v-list-item__coll"
      >
        <tag
            v-for="tagName of dataTag.tags"
            :name="tagName"
        ></tag>
      </div>
    </div>

    <div
        class="v-list-item__body"
        v-if="isOpen"
    >
      <div
          class="v-list-item__body__left"
      >
        <img src="" alt=""/>
      </div>
      <div
          class="v-list-item__body__right"
      >
        <div>{{dataTag.text}}</div>

        <ul>
          <li><strong>Date:</strong     > {{dataTag.infoDate}}</li>
          <li><strong>Object:</strong   > {{dataTag.infoObject}}</li>
          <li><strong>Dimension:</strong> {{dataTag.infoDimensions}}</li>
          <li><strong>Loan:</strong     > {{dataTag.infoLoan}}</li>
          <li><strong>Location:</strong > {{dataTag.infoLocation}}</li>
          <li><strong>Made:</strong     > {{dataTag.infoMade_in}}</li>
          <li><strong>Material:</strong > {{dataTag.infoMaterial}}</li>
          <li><strong>Price:</strong    > {{dataTag.infoPrice}}</li>
        </ul>
      </div>

    </div>

  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import type {PropType} from "vue"
import type {Api} from "@/Utils/api"
import Tag from "@/components/tag.vue"
import {stateStore} from "@/stores/stateStore"

export default defineComponent({
  components: {Tag},

  data() {
    return {
      globalState: stateStore()
    }
  },

  methods: {
    toggleOpenStatus() {
      this.isOpen ?
          this.globalState.currentOpenObject = null
          : this.globalState.currentOpenObject = this.dataTag

      window.setTimeout(() => {
        document.querySelector('html')?.scrollTo({
          behavior: 'smooth',
          top: this.$el.offsetTop - 50,
        })
      }, 150)
    },
  },

  props: {
    dataTag:   {
      required: true,
      type: Object as PropType<Api.IItem>,
    },
  },

  computed: {
    isOpen(): boolean {
      return this.dataTag.slug === this.globalState.currentOpenObject?.slug
    }
  },

})</script>

<style lang="scss">
.v-list-item {
  width: 100%;
}

.v-list-item__header {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  border-bottom: solid 1px;
  align-items: center;
  cursor: pointer;

  > .v-list-item__coll {
    width: calc(100% / 3);
  }
}

.v-list-item__body {
  display: flex;
  flex-wrap: nowrap;
}

.v-list-item__body__left {
  width: calc(100% / 3 * 2);

  img {
    display: block;
    width: 100%;
    height: 30rem;
    background-color: var(--jd-color--main);
  }
}

.v-list-item__body__right {
  width: calc(100% / 3);
}

</style>
