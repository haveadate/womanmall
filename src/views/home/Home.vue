<template>
  <div id="home">
    <!-- 顶部导航栏 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!-- 流行/新款/精选导航栏 -->
    <tab-control class="fixed" :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl1" v-show="isTabControlFixed" />
    <!-- 可滚动的区域 -->
    <scroll class="wrapper" ref="scroll" :probe-type="3" :pull-up-load="true" @scroll="contentScroll" @pullingUp="loadMore">
      <!-- 轮播图 -->
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad" />
      <!-- 推荐栏 -->
      <recommend-view :recommends="recommends" />
      <!-- 本周推荐 -->
      <feature-view />
      <!-- 流行/新款/精选导航栏 -->
      <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl2" />
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

  // network模块
  import {
    getHomeMultidata,
    getHomeGoods
  } from 'network/home'

  // common模块
  import {
    debounce
  } from 'common/utils'
  import {
    backTop
  } from 'common/mixin.js'
  import {DEBOUNCE_SPAN} from 'common/const.js'

  export default {
    name: "Home",
    mixins: [backTop],
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
        tabControlOffsetTop: 0,
        isTabControlFixed: false,
        imgLoadedListener: null
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
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      contentScroll(position) {
        // 1.监听滚动位置，判断回到顶部按钮是否显示
        this.backTopListener(position)

        // 2.监听滚动位置，判断tabControl是否吸顶（position：fixed）
        this.isTabControlFixed = -position.y > this.tabControlOffsetTop
      },
      loadMore() {
        this.getGoods(this.currentType)
      },
      swiperImgLoad() {
        // 获取tabControl的offsetTop
        this.tabControlOffsetTop = this.$refs.tabControl2.$el.offsetTop
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

          // 请求一次数据完成后，要告诉better-scroll，上拉事件已经完成，否则不能完成下次上拉加载数据事件
          this.$refs.scroll.finishPullUp()
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
      Scroll
    },
    created() {
      // 1.请求多个数据(包含导航栏、商品……)
      this.getMultidata()

      // 2.请求流行/新款/精选商品数据
      this.getGoods('pop')
      this.getGoods('new')
      this.getGoods('sell')
    },
    activated() {
      // 1. 图片加载完成的事件监听
      // 在将模板挂载完成以后，就要开始监听图片加载事件
      const refresh = debounce(this.$refs.scroll.refresh, DEBOUNCE_SPAN)
      this.imgLoadedListener = () => {
        refresh()
      }

      this.$bus.$on("itemImgLoaded", this.imgLoadedListener)
    },
    deactivated() {
      // 在切换显示到其它路由组件时，需要注销路由总线中绑定的事件
      this.$bus.$off("itemImgLoaded", this.imgLoadedListener)
    }
  }
</script>

<style scoped>
  #home {
    height: 100vh;
    /* padding-top: 44px; */
  }

  .wrapper {
    position: absolute;
    top: 44px;
    left: 0;
    bottom: 49px;
    right: 0;
    overflow: hidden;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /* 这是针对原生JS才需要设置的样式，对于better-scroll的局部滚动，则不需要设置此样式 */
    /* position: fixed; */
    /* top: 0;
    left: 0;
    right: 0;
    z-index: 999; */
  }

  .fixed {
    position: relative;
    z-index: 888;
    background-color: #fff;
  }
</style>
