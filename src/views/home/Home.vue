<template>
  <div id="home">
    <!-- 顶部导航栏 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!-- 轮播图 -->
    <home-swiper :banners="banners" />
    <!-- 推荐栏 -->
    <recommend-view :recommends="recommends" />
    <!-- 本周推荐 -->
    <feature-view />
    <ul>
    	<li>占位</li>
    	<li>占位</li>
    	<li>占位</li>
    	<li>占位</li>
    	<li>占位</li>
    	<li>占位</li>
    	<li>占位</li>
    	<li>占位</li>
    	<li>占位</li>
    	<li>占位</li>
    	<li>占位</li>
    	<li>占位</li>
    	<li>占位</li>
    	<li>占位</li>
    	<li>占位</li>
    	<li>占位</li>
    	<li>占位</li>
    	<li>占位</li>
    	<li>占位</li>
    	<li>占位</li>
    	<li>占位</li>
    	<li>占位</li>
    	<li>占位</li>
    	<li>占位</li>
    	<li>占位</li>
    	<li>占位</li>
    	<li>占位</li>
    	<li>占位</li>
    	<li>占位</li>
    	<li>占位</li>
    	<li>占位</li>
    	<li>占位</li>
    </ul>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import HomeSwiper from './childComps/HomeSwiper.vue'
  import RecommendView from './childComps/RecommendView.vue'
  import FeatureView from './childComps/FeatureView.vue'

  import {
    getHomeMultidata
  } from 'network/home'


  export default {
    name: "Home",
    data() {
      return {
        banners: [],
        recommends: []
      }
    },
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView
    },
    created() {
      // 1.请求多个数据(包含导航栏、商品……)
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
  }

  .home-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: var(--color-tint);
    color: #fff;
    z-index: 999;
  }
</style>
