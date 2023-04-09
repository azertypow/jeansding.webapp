import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.scss'
import {stateStore} from "@/stores/stateStore"
import {getDeviceWidthSizeName} from "@/Utils/getDeviceWidthSizeName";
import {setStateOnNavigation} from "@/Utils/setStateOnNavigation"

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

async function initData() {
  stateStore().apiData          = await (await window.fetch('https://jeansdinge.sdrvl.ch/get/itemList')).json()
  stateStore().apiProjects      = await (await window.fetch('https://jeansdinge.sdrvl.ch/get/projects')).json()
  stateStore().apiContributors  = await (await window.fetch('https://jeansdinge.sdrvl.ch/get/contributors')).json()

  if(router.currentRoute.value.name)
    setStateOnNavigation(
      router.currentRoute.value.name,
      router.currentRoute.value.params,
    )
}
initData().then(() => {
  stateStore().updateFilteredArticles_bySection()
})


// see _scss-var.scss
window.addEventListener('resize', () => {
  stateStore().device = getDeviceWidthSizeName()
})
