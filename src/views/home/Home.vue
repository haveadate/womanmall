<template>
  <div id="home">
    <!-- 顶部导航栏 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!-- 可滚动的区域 -->
    <scroll class="wrapper" ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @scroll="contentScroll"
            @pullingUp="loadMore">
      <!-- 轮播图 -->
      <home-swiper :banners="banners" />
      <!-- 推荐栏 -->
      <recommend-view :recommends="recommends" />
      <!-- 本周推荐 -->
      <feature-view />
      <!-- 流行/新款/精选导航栏 -->
      <tab-control class="tab-control" :titles="['流行', '新款', '精选']" @tabClick="tabClick" />
      <!-- 流行/新款/精选详细信息展示 -->
      <goods-list :goods="getGoodsList" />
    </scroll>
    <!-- 回到顶部 -->
    <back-top @click.native="backTopClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
  // views/home模块
  import HomeSwiper from './childComps/HomeSwiper.vue'
  import RecommendView from './childComps/RecommendView.vue'
  import FeatureView from './childComps/FeatureView.vue'

  // components模块
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  // network模块
  import {
    getHomeMultidata,
    getHomeGoods
  } from 'network/home'


  export default {
    name: "Home",
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          pop: {
            page: 0,
            list: []
          },
          new: {
            page: 0,
            list: []
          },
          sell: {
            page: 0,
            list: []
          }
        },
        currentType: 'pop',
        isShowBackTop: false
      }
    },
    computed: {
      getGoodsList() {
        return this.goods[this.currentType].list
      }
    },
    methods: {
      /**
       * 事件绑定相关的方法
       */
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },
      backTopClick() {
        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      contentScroll(position) {
        this.isShowBackTop = -position.y > 1000
      },
      loadMore() {
        this.getGoods(this.currentType)
        // 请求一次数据完成后，要告诉better-scroll，上拉事件已经完成，否则不能完成下次上拉加载数据事件
        this.$refs.scroll.finishPullUp()
        // 加载完成后，对better-scroll进行刷新
        this.$refs.scroll.refresh()
      },
      /**
       * 网络请求相关的方法
       */
      getMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        }).catch(err => console.log(err))
      },
      getGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].page = page
          this.goods[type].list.push(...res.data.list)
        }).catch(err => console.log(err))
      }
    },
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,

      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    created() {
      // 1.请求多个数据(包含导航栏、商品……)
      this.getMultidata()

      // 2.请求流行/新款/精选商品数据
      this.getGoods('pop')
      this.getGoods('new')
      this.getGoods('sell')
    },
    mounted() {
      // 对better-scroll进行刷新
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  #home {
    height: 100vh;
    padding-top: 44px;
  }

  .wrapper {
    height: calc(100% - 49px);
    overflow: hidden;
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

  .tab-control {
    position: sticky;
    top: 44px;
    background-color: #fff;
    z-index: 666;
  }
</style>
