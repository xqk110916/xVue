import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

import aVue from '@smallwei/avue'
import '@smallwei/avue/lib/index.css'

Vue.config.productionTip = false

Vue.use(aVue)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
