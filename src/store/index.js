import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

// 1.安装插件
Vue.use(Vuex)

const state = {
  shopcart: []
}
// 2.创建Store对象
const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

// 3.导出，挂载到Vue实例上
export default store
