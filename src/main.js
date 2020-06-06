import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueFormulate from '@braid/vue-formulate'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/main.css'
import AppModalbox from './components/modalbox/index'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueFormulate)

Vue.component('app-not', AppModalbox)

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    store.dispatch('GET_PRODUCTS');
    store.dispatch('GET_CATS');
    store.dispatch('GET_CAT_PRODUCTS');
    store.dispatch('GET_OFFERS');
    store.dispatch('GET_SPECIALITY');
  },
}).$mount('#app')
