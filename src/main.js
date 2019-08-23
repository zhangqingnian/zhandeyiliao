// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import 'lib-flexible/flexible'
import '@/assets/css/reset.css';
Vue.config.productionTip = false

//axios 配置
axios.defaults.baseURL = 'ddddd';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
