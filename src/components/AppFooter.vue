<template>
  <div class="v-app-footer">

    <transition name="slide_top">

      <div
          class="v-app-footer__content"
          v-if="stateStore.menuIsOpen"
      >
        <div
            class="v-app-footer__content__left jd-with-gutter"
        >
          <div class="v-app-footer__content__header">
            <div class="jd-font-xxl">Jeansdinge</div>

            <h1>Colophon</h1>
          </div>

          <p
          >The Jeansdinge collection is an ongoing project by Katharina Hohmann and Katharina Tietze.
            It started in 2001 with the first exhibition at K&K. Zentrum für Kunst und Mode, Weimar. Since then, the archive is growing, as almost every week new objects join the collection.
            This website is the result of a practice-based research project straddling the fields of art and fashion design at HEAD–Genève directed by Katharina Hohmann and funded by HES-SO (2021-2022). It is supported by the Swiss National Science Foundation (SNSF).
          </p>

          <h3>Research team</h3>
          <p>Aude Fellay</p>
          <p>Katharina Hohmann</p>
          <p>Lorelei Regamey</p>
          <p>Katharina Tietze</p>
          <p>Chaïm Vischel</p>


          <h3>Website</h3>
          <p>Design: Sonia Dominguez, Rob van Leijsen</p>
          <p>Development: Nicolas Baldran</p>

          <h3>Object-Photography</h3>
          <p>Manuel Fabritz</p>

          <h3>Translations and Proofreading English</h3>
          <p>Lucinda Rennison (For the book: Denimpop. Reading Jeansdige.)</p>

          <h3>Symposium / Open Archive Exhibition, Geneva, march 2022</h3>
          <p>Video: Jimmy Roura, HEAD–Genève</p>
          <p>Photography: Emmanuelle Bayart, Guillaume Collignon, HEAD–Genève</p>
          <p>Scenography: Camille Farrah Buhler</p>
          <p>Graphic Design: Maurane Zaugg</p>
          <p>Technics and Support: Helder Dos Santos, Frédéric Thrane</p>
          <p>Helping Hands: Oskar Fougeirol, Alexandra Galian, Félice Hubert, Niels Hung</p>

          <h3>Film-project with students</h3>
          <p>For co-teaching the film-project with students at HEAD-Genève - and uploading the films:</p>
          <p>Lucien Monot</p>
          <p>For co-teaching the film-project with students at ZHdK: Eva Wandeler</p>

          <h3>Head of Research: Anthony Masure</h3>
          <p>Financial advisor: Christelle Granite-Noble</p>
          <p>Financing: HES-SO, HEAD–Genève, SNF, ZHdK (translations)</p>

          <div
              class="v-app-footer__logo"
          >
            <div>
              <img alt="logo" src="../assets/logo/logo-head.svg">
              <img alt="logo" src="../assets/logo/2018_zhdk_logo_E_weiss.svg">
              <img alt="logo" src="../assets/logo/SNF_logo_standard_web_sw_neg_e.svg">
            </div>
            <div>
            </div>
            <div>
            </div>



          </div>

        </div>

        <div
            class="v-app-footer__content__right jd-with-gutter"
        >

        </div>

      </div>

    </transition>


    <div
        class="v-app-footer__body__left"
    >
      <div
          class="jd-with-gutter jd-font-small v-app-footer__logo-head"
      >HEAD&nbsp;–&nbsp;Genève</div>
    </div>

    <div
        class="v-app-footer__body__right"
    >
      <div class="jd-with-gutter" style="white-space: nowrap; position: relative; top: -1px">
        <burger-icon
            @iconClicked="toggleMenu"
        ></burger-icon>
      </div>

      <template
          v-if="stateStore.device === 'mobile'"
      >
        <router-link
            class="v-app-footer__body__right__link"
            to="/projects"
            v-if="$route.name === 'inventory'">Projects</router-link>
        <router-link
            class="v-app-footer__body__right__link"
            to="/"
            v-else>Inventory</router-link>
      </template>


    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import SearchBar from "@/components/SearchBar.vue";
import BurgerIcon from "@/components/burgerIcon.vue";
import {stateStore} from "@/stores/stateStore";

export default defineComponent({
  components: {BurgerIcon, SearchBar},

  data() {
    return {
      searchIsOpen: false,
      stateStore: stateStore()
    }
  },

  methods: {
    toggleMenu(isOpen: boolean) {
      this.stateStore.menuIsOpen = isOpen
    },
  },
})</script>

<style lang="scss">
@import "../assets/scss-var";

.v-app-footer {
  height: var(--jd-height-of-header);
  color: var(--jd-color--white);
  background-color: var(--jd-color--varriable);
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  transition: background-color 1s ease-in-out;
  z-index: 1000;

  .device-mobile & {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: var(--jd-color--varriable--reverse);
  }
}

.v-app-footer__content {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 1rem);
  background: var(--jd-color--varriable);
  z-index: 1000;
  overflow: auto;
  box-sizing: border-box;
  padding-top: var(--v-app-header--title-height);
  user-select: none;
  display: flex;

  .device-mobile & {
    height: 100%;
  }
}

.v-app-footer__content__header {
  position: fixed;
  top: 0;
  left: 0;
  text-align: center;
  width: 100%;
  padding-top: 1rem;
  background-color: var(--jd-color--varriable);

  h1 {
    margin: 0;
    padding-top: 1rem;
    padding-bottom: 1rem;
    font-weight: 400;
  }
}

.v-app-footer__content__left {
  width: 50%;
  margin-left: 25%;
  box-sizing: border-box;
  padding-top: 5rem;

  p {
    margin: 0;
  }

  .device-mobile & {
    margin-left: 0;
    width: 100%;
    padding-right: 2rem;
  }
}

.v-app-footer__content__right {
  width: 25%;
  position: fixed;
  right: 0;
  top: var(--v-app-header--title-height);
  padding-top: 5rem;
  box-sizing: border-box;
  > * {
    margin-top: 0;
    margin-bottom: 0;
    opacity: .5;
  }
}

.v-app-footer__body__left,
.v-app-footer__body__right {
  display: flex;
  align-items: center;
  z-index: 100000;

  .device-mobile & {
    padding: 0;
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;

    > * {
      padding: .5rem;
      margin: auto;
    }
  }
}

.v-app-footer__body__right__link {
  position: fixed;
  right: 0;
  top: 50%;
  transform: translate(calc(50vh - 7rem), -50%) rotate(90deg);
  width: calc(100vh - 12rem);
  box-sizing: border-box;
  transform-origin: center center;
  text-align: center;
  text-decoration: none;
}

.v-app-footer__search-bar {
  width: 20rem;
}

.v-app-footer__search-icon,
.v-app-footer__menu {
  position: relative;
  display: block;
  height: 1rem;
}

.v-app-footer__logo {
  display: flex;
  flex-wrap: nowrap;
  width: 100%;

  > div {
    width: calc(100% / 3);
    box-sizing: border-box;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  img {
    display: block;
    width: 100%;
    height: auto;
    margin-top: 3rem;
  }
}

.v-app-footer__logo-head {
  font-size: .85rem;

  @media (max-width: $break-width-xs) {
    display: none;
  }
}
</style>
