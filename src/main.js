import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './vuex'
import * as util from './util/util'

import 'babel-polyfill'    //兼容IE

Vue.config.productionTip = false

global.api = util.default.baseUrl
global.util = util

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})