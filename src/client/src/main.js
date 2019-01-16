// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import auth from './auth/AuthService'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' // Vuesax styles
import 'material-icons/iconfont/material-icons.css'

Vue.use(Vuesax)
Vue.use(auth)
Vue.config.productionTip = false
Vue.use(BootstrapVue)

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
