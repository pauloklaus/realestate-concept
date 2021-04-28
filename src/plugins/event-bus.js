import Vue from "vue"
const bus = new Vue()

Vue.use({
    install(Vue) {
        Vue.prototype.$bus = bus
    }
});
