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
      <a
          href="https://www.hesge.ch/head/en/project/jeansdinge-focus-collection-archive-450-denimeries"
          target="_blank"
          class="jd-with-gutter jd-font-small v-app-footer__logo-head"
      >HEAD&nbsp;–&nbsp;Genève</a>
    </div>

    <div
        class="v-app-footer__body__right"
    >
        <div
                class="jd-with-gutter"
                style="cursor: pointer"
                @click="togglePlayerState"
        >
            <svg
                    v-if="this.playerState === 'is-paused'"
                    class="v-app-footer__player"
                    width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"
            >
                <g clip-path="url(#clip0_163_281)">
                    <path d="M20 2C29.9 2 38 10.1 38 20C38 29.9 29.9 38 20 38C10.1 38 2 29.9 2 20C2 10.1 10.1 2 20 2ZM20 0C9 0 0 9 0 20C0 31 9 40 20 40C31 40 40 31 40 20C40 9 31 0 20 0Z"/>
                    <path d="M31 20L14 11V29L31 20Z" />
                </g>
                <defs>
                    <clipPath id="clip0_163_281">
                        <rect width="40" height="40" fill="white"/>
                    </clipPath>
                </defs>
            </svg>

            <svg
                    v-else-if="this.playerState === 'is-loading'"
                    class="v-app-footer__player"
                    width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"
            >
                <g clip-path="url(#clip0_163_273)">
                    <path
                            class="v-app-footer__player__loader"
                            d="M20 38C29.9 38 38 29.9 38 20H40C40 31 31 40 20 40C9 40 0 31 0 20C0 9 9 0 20 0V2C10.1 2 2 10.1 2 20C2 29.9 10.1 38 20 38Z"
                    />
                    <path d="M31 20L14 11V29L31 20Z"/>
                </g>
                <defs>
                    <clipPath id="clip0_163_273">
                        <rect width="40" height="40"/>
                    </clipPath>
                </defs>
            </svg>

            <svg
                    v-else
                    class="v-app-footer__player"
                    width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"
            >
                <g clip-path="url(#clip0_164_285)">
                    <path d="M20 2C29.9 2 38 10.1 38 20C38 29.9 29.9 38 20 38C10.1 38 2 29.9 2 20C2 10.1 10.1 2 20 2ZM20 0C9 0 0 9 0 20C0 31 9 40 20 40C31 40 40 31 40 20C40 9 31 0 20 0Z"/>
                    <rect x="14" y="10" width="4" height="19"/>
                    <rect x="22" y="10" width="4" height="19"/>
                </g>
                <defs>
                    <clipPath id="clip0_164_285">
                        <rect width="40" height="40" fill="white"/>
                    </clipPath>
                </defs>
            </svg>
        </div>
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
      stateStore: stateStore(),
      playerState: 'is-paused' as 'is-playing' | 'is-loading' | 'is-paused',
      audioFile: null as null | string,
      audio: null as null | HTMLAudioElement,
    }
  },

  methods: {
      toggleMenu(isOpen: boolean) {
          this.stateStore.menuIsOpen = isOpen
      },
      async togglePlayerState() {

          if (this.audioFile && this.audio) {

              if(this.playerState === "is-loading") return
              if (this.playerState === "is-paused") this.audio.play()
              else this.audio.pause()

          } else {

              this.playerState = 'is-loading'

              this.audioFile = (await import('../assets/20230601-Jeans_dinge_mix-converted-medium.mp3')).default

              if (typeof this.audioFile !== 'string') {
                  console.error('audio module import. typeof this.audioFile !== \'string\'')
                  return
              }

              this.audio = new Audio(this.audioFile)

              const onCanplaythrough = () => {
                  this.audio?.play()

                  this.audio?.removeEventListener('canplaythrough', onCanplaythrough)


                  this.audio?.addEventListener('play', () => {
                      this.playerState = 'is-playing'
                  })

                  this.audio?.addEventListener('playing', () => {
                      this.playerState = 'is-playing'
                  })

                  this.audio?.addEventListener('pause', () => {
                      this.playerState = 'is-paused'
                  })

                  this.audio?.addEventListener('ended', () => {
                      this.playerState = "is-paused"
                  })

                  this.audio?.addEventListener('waiting', () => {
                      this.playerState = "is-loading"
                  })

                  this.audio?.addEventListener('loadeddata', (e) => {
                      console.log("load data")
                  })
              }
              this.audio?.addEventListener('canplaythrough', onCanplaythrough)

          }
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

  .v-app-footer__player {
    display: block;
    width: 20px;
    height: auto;
    fill: white;

    .v-app-footer__player__loader {
      animation-name: loader-rotation;
      animation-duration: 2s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
      transform-origin: center;
      position: relative;
    }

    @keyframes loader-rotation {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

  }

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

.v-app-footer__body__right {

  .device-mobile & {
    flex-direction: column;
  }
}

.v-app-footer__body__left {

  .device-mobile & {
    display: none;
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
  text-decoration: none;

  @media (max-width: $break-width-xs) {
    display: none;
  }
}
</style>
