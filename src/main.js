import Vue from 'vue'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import toast from 'components/common/toast'

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
// 安装toast插件
Vue.use(toast)
// 解决移动端300ms延迟
FastClick.attach(document.body)
// 安装图片懒加载插件
Vue.use(VueLazyload, {
  loading: require('assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
