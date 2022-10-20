<template>
  <div class="v-inventory">

    <div>
      <h4>text</h4>
      <h3>FeansDinge in the move</h3>
      <h5>Katharina Hohmann</h5>

      <p
       >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus alias aut eos, id impedit in ipsa itaque
        laboriosam magnam magni maxime mollitia necessitatibus nobis non placeat quaerat, quisquam tenetur vitae?
        <br><span>…</span>
      </p>
    </div>

    <h4>Symposium</h4>
    <div
      v-for="article of Array(5)"
    >
      <article-container></article-container>
    </div>

    <h4>Artist video</h4>
    <div
        v-for="article of Array(5)"
    >
      <article-container></article-container>
    </div>

    <h4>Denim pop book</h4>
    <div
        v-for="article of Array(5)"
    >
      <article-container></article-container>
    </div>

  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import ListContainer from "@/components/ListContainer.vue"
import ArticleContainer from "@/components/ArticleContainer.vue"

export default defineComponent({
  components: {ArticleContainer, ListContainer},
})</script>

<style lang="scss">

</style>
