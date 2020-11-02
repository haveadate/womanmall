// vuex->mutations
import {
  ADD_COUNT,
  ADD_TO_CART
} from './mutation-types.js'

export default {
  // 添加商品的数目
  [ADD_COUNT](state, payload) {
    payload.count += 1
  },
  // 将商品添加到购物车
  [ADD_TO_CART](state, payload) {
    payload.count = 1
		payload.selected = true
    state.shopcart.push(payload)
  }
}
