<template>
  <div class="v-inventory">
    <div
        class="v-inventory__left"
    >
      <list-container></list-container>
    </div>
    <div
        class="v-inventory__right"
    >
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import ListContainer from "@/components/ListContainer.vue"

export default defineComponent({
  components: {ListContainer},


})</script>

<style lang="scss">
.v-inventory {
  display: flex;
  flex-wrap: nowrap;
}

.v-inventory__left {
  width: 75%;
}

.v-inventory__right {
  width: 25%;
}
</style>
