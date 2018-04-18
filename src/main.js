import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './vuex'
import './assets/bootstrap/css/bootstrap.min.css'
import './assets/css/account.css'
import 'nprogress/nprogress.css'   //路由切换进度条样式
import * as util from './util/util'

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