// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import 'lib-flexible/flexible'
import '@/assets/css/reset.css';
import http from './http'


import store from "@/store/index";
Vue.config.productionTip = false
Vue.prototype.$http = http;



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

