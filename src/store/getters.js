// vuex->getters
export default {
  // 获取商品的种类
  goodsTypesLen(state) {
    return state.shopcart.length
  },
  goods(state) {
    return state.shopcart
  }
}
