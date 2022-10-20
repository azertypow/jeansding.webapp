<template>
  <div class="v-media">
    <p>content right</p>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"

export default defineComponent({

  computed: {
    sortedArticle() {
      /**
       * todo: trier par importance
       * moins l'articles a de relation avec les objet, plus il a une valeur élevé.
       * un article lié a un seul objet plus fort en importance
       * qu'un article lié a 2 objets
       * */
    }
  },

})</script>

<style lang="scss">
.v-media {
}
</style>
