import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.scss'
import {stateStore} from "@/stores/stateStore"

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

async function initData() {
  stateStore().apiData = await (await window.fetch('https://jeansdinge.sdrvl.ch/get/itemList')).json()
}
initData().then()
