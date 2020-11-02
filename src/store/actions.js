// vuex->actions
import {
  ADD_COUNT,
  ADD_TO_CART
} from './mutation-types.js'

export default {
  // 添加商品
  addGoods(context, payload) {
    return new Promise((resolve, reject) => {
      // 判断商品是否已加入购物车，并返回
      const existPro = context.state.shopcart.find(item => item.iid === payload.iid)
      // 若商品存在，则数目加1，若商品不存在，则加入购物车
      if (existPro) {
        context.commit(ADD_COUNT, existPro)
        resolve("商品数量+1")
      } else {
        context.commit(ADD_TO_CART, payload)
        resolve("已添加到购物车")
      }
    })
  }
}
