<template>
  <div id="shopcart">
    <!-- 顶部导航栏 -->
    <nav-bar class="sc-nav-bar">
      <div slot="center">购物车({{goodsTypesLen}})</div>
    </nav-bar>
    <!-- 中间的商品信息展示 -->
    <scroll class="sc-content" ref="scroll">
      <shopcart-goods-list />
    </scroll>
    <!-- 底部汇总栏 -->
    <shopcart-bottom-bar class="sc-bottom-bar" />
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'

  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'

  import ShopcartGoodsList from './childComps/ShopcartGoodsList.vue'
  import ShopcartBottomBar from './childComps/ShopcartBottomBar.vue'

  export default {
    name: "Shopcart",
    computed: {
      ...mapGetters(['goodsTypesLen'])
    },
    activated() {
      this.$refs.scroll.refresh()
    },
    components: {
      NavBar,
      Scroll,

      ShopcartGoodsList,
      ShopcartBottomBar
    }
  }
</script>

<style scoped>
  #shopcart {
    height: 100vh;
  }

  .sc-nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }

  .sc-content {
    height: calc(100% - 44px - 49px - 44px);
    overflow: hidden;
  }
</style>
