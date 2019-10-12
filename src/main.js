// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible/flexible'
import '@/assets/css/reset.css';
import http from './http'
//console.log(process.env)
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)

import Moment from "moment";
Vue.filter('dateFormat', function (str, pattern = 'YYYY-MM-DD') {
   return Moment(str).format(pattern)
})

import VuePicturePreview from 'vue-picture-preview';
Vue.use(VuePicturePreview);

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

