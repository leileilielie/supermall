import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// 添加$bus
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
