import Vue from 'vue'
import Vuex from 'vuex'

// 1.安装插件
Vue.use(Vuex)

// 2.创建Store对象
const store = new Vuex.Store({
  state: {
    shopcart: []
  },
  mutations: {
    // 添加到购物车
    addGoods(state, payload) {
      // 判断商品是否已加入购物车，并返回
      const existPro = state.shopcart.find(item => item.iid === payload.iid)
      // 若商品存在，则数目加1，若商品不存在，则加入购物车
      if (existPro) {
        existPro.count += 1
      } else {
        payload.count = 1
        state.shopcart.push(payload)
      }
    }
  }
})

// 3.导出，挂载到Vue实例上
export default store
