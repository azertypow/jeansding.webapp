<template>
  <div class="v-media">
    <p>content right</p>
    <vimeo-player></vimeo-player>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import VimeoPlayer from "@/components/VimeoPlayer.vue"

export default defineComponent({
  components: {VimeoPlayer},
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
