import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'

// 安装自定义插件toast
import toast from 'components/common/toast'
Vue.use(toast)

Vue.config.productionTip = false
// 事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  
  store,
  render: h => h(App),
  router,
}).$mount('#app')


