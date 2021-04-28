import "@babel/polyfill"
import "mutationobserver-shim"

import Vue from "vue"
import "./plugins/bootstrap-vue"
import "./plugins/firebase"
import "./plugins/event-bus"
import "./plugins/psk-copyandshare"
import "./resources/bootloader"

import App from "./App.vue"
import router from "./router"
import store from "./store"

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
