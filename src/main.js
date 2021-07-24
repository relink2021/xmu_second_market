import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import './assets/css/global.css'
import './assets/font/iconfont.css'
import './assets/font2/iconfont.css'
import axios from 'axios'

Vue.prototype.$http = axios
axios.defaults.baseURL = "http://localhost:9000"

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
