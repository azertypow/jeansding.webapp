<template>
  <div class="v-contributors">
    <div class="v-contributors__header jd-font-xxl"
    >
      <div class="jd-font-xxl">Jeansdinge</div>

      <h1>Contributors</h1>
    </div>
      <div
          class="v-contributors__content"
      >
        <div
            class="v-contributors__content__left jd-with-gutter"
            @mouseleave="activityActiveByOver = []"
        >
          <transition-group
              name="scale"
          >
            <div
                v-for="(contributor, index) of stateStore().apiContributors.contributors"
                :key="index"
                ref="contributors"
                v-show="activityActiveByClick === '' || (contributor.activity && contributor.activity.includes(activityActiveByClick))"
                @mouseenter="activityActiveByOver = contributor.activity || []"
                @click="toggleDescription(index)"
                class="v-contributors__description-box"
                :class="{
                  'is-empty': !contributor.description
                }"
            >
              <p
                  class="jd-font-xl head-student"
              >{{ contributor.first_name }} {{ contributor.name }}</p>
              <div
                  class="v-contributors__description-box__text"
                  v-html="contributor.description"
              ></div>
            </div>
          </transition-group>
        </div>

        <div
            class="v-contributors__content__right jd-with-gutter"
            :class="{
              'has-active-activity': activityActiveByOver.length > 0
            }"
        >
          <p
              class="jd-font-default"
              v-for="activity of stateStore().apiContributors.activityList"
              @click="activityActiveByClick = activity === activityActiveByClick ? '' : activity"
              :class="{
                'is-active': activityActiveByOver.includes( activity ) || activity === activityActiveByClick,
              }"
          >{{activity}}</p>
        </div>

      </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {stateStore} from "@/stores/stateStore";

export default defineComponent({
  name: 'Contributors',
  components: {},

  data() {
    return {
      stateStore: stateStore,
      activityActiveByOver:   [] as string[],
      activityActiveByClick:  '',
    }
  },

  methods: {
    toggleDescription( index: number) {
      if( !Array.isArray( this.$refs.contributors )) return
      if( ! (this.$refs.contributors[index] instanceof HTMLElement) ) return

      this.$refs.contributors[index].classList.toggle('description-is-open')
    },

    addActivityFilterByOver(arrayOfActivityToAdd: string[]) {
      for(const activityToAdd of arrayOfActivityToAdd) {
        if( this.activityActiveByOver.includes( activityToAdd ) ) return
        else this.activityActiveByOver.push( activityToAdd )
      }
    },

    removeActivityFilterByOver(arrayOfActivityToRemove: string[]) {
      for(const activityToRemove of arrayOfActivityToRemove) {
        const index = this.activityActiveByOver.indexOf(activityToRemove)
        this.activityActiveByOver = this.activityActiveByOver.splice(index, 1)
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.v-contributors {
  color: var(--jd-color--white);
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 1.5rem);
  position: fixed;
  z-index: 9999;
}

.v-contributors__header {
  position: fixed;
  top: 0;
  left: 0;
  color: var(--jd-color--white);
  text-align: center;
  width: 100%;
  z-index: 20;
  padding-top: 1rem;
  line-height: var(--v-app-header--title-height);
  background-color: var(--jd-color--varriable);

  h1 {
    margin: 0;
    padding-top: 1rem;
    padding-bottom: 1rem;
    font-weight: 400;
  }
}

.v-contributors__content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--jd-color--varriable);
  z-index: 10;
  overflow: auto;
  box-sizing: border-box;
  padding-top: var(--v-app-header--title-height);
  user-select: none;
  display: flex;
}

.v-contributors__content__left {
  width: 50%;
  margin-left: 25%;
  box-sizing: border-box;
  padding-top: 5rem;

  h1 {
    margin: 0;
    text-align: center;
    width: 100%;
    background-color: var(--jd-color--varriable);
    position: fixed;
    left: 0;
    top: var(--v-app-header--title-height);
    padding-top: 0;
    padding-bottom: 1rem;
    font-weight: 400;
  }

  p {
    margin: 0;
  }

  .device-mobile & {
    margin-left: 0;
    width: 100%;
    padding-right: 2rem;
  }

}

.v-contributors__content__right {
  width: 25%;
  position: fixed;
  right: 0;
  top: var(--v-app-header--title-height);
  padding-top: 5rem;
  box-sizing: border-box;

  &.has-active-activity {
    > * {
      opacity: .15;
    }
  }

  > * {
    margin-top: 0;
    margin-bottom: 0;
    opacity: .5;
    cursor: pointer;
    transition: opacity 500ms 150ms;

    &.is-active {
      transition: opacity 500ms 0ms;
      opacity: 1;
    }
  }

  .device-mobile & {
    display: none;
  }
}
</style>

<style lang="scss">
.v-contributors__description-box {
  position: relative;
  margin-top: 0;
  margin-bottom: 0;
  transition: margin-top 500ms ease-in-out;

  &:not(.is-empty) {
    cursor: pointer;
  }

  .v-contributors__description-box__text {
    display: none;

    > *:fist-child {
      margin-top: 1rem;
    }
    > *:last-child {
      margin-bottom: 3rem;
    }
  }

  &.description-is-open:not(.is-empty) {
    margin-top: 1rem;
    margin-bottom: 2rem;

    .v-contributors__description-box__text {
      display: block;
    }
  }
}

</style>
