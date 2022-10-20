<template>
  <div class="v-article-container">
    <h3>Title</h3>
    <h5>Subtitle</h5>
    <img src="/" alt="article cover" class="v-article-container__img">
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"

export default defineComponent({

})</script>

<style lang="scss">
.v-article-container {
}

.v-article-container__img {
  display: block;
  width: 100%;
  padding-top: 50%;
  background-color: var(--jd-color--secondary);
}
</style>
