<template>
  <div id="detail">
    <!-- 顶部导航栏 -->
    <detail-nav-bar class="detail-nav" @navItemClick="navItemClick" ref="nav" />
    <scroll class="detail-content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <!-- 内容区域顶部轮播图 -->
      <detail-swiper :top-images="topImages" @swiperImgLoaded="newRefresh" />
      <!-- 商品信息 -->
      <detail-base-info :goods="goods" />
      <!-- 店铺信息 -->
      <detail-shop-info :shop="shop" />
      <!-- 商品详细信息 -->
      <detail-goods-info :detail-info="detailInfo" @goodsImgLoaded="detailImgLoad" />
      <!-- 规格参数 -->
      <detail-param-info :param-info="goodsParam" ref="params" />
      <!-- 评论 -->
      <detail-comment-info :comment-info="commentInfo" ref="comment" />
      <!-- 推荐 -->
      <goods-list :goods="recommend" ref="recommend" />
    </scroll>
    <!-- 底部菜单栏 -->
    <detail-bottom-bar @addToShopcart="addToShopcart" />
    <!-- 回到顶部 -->
    <back-top @click.native="backTopClick" v-show="isShowBackTop" class="top" />
  </div>
</template>

<script>
  import {
    mapActions
  } from 'vuex'

  import DetailNavBar from './childComps/DetailNavBar.vue'
  import DetailSwiper from './childComps/DetailSwiper.vue'
  import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
  import DetailShopInfo from './childComps/DetailShopInfo.vue'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
  import DetailParamInfo from './childComps/DetailParamInfo.vue'
  import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
  import DetailBottomBar from './childComps/DetailBottomBar.vue'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'

  import {
    getDetailData,
    getDetailRecommend,
    Goods,
    Shop,
    GoodsParam
  } from 'network/detail.js'

  import {
    debounce
  } from 'common/utils.js'
  import {
    backTop
  } from 'common/mixin.js'
  import {
    DEBOUNCE_SPAN,
    DETAIL_SCROLL_SPAN
  } from 'common/const.js'

  export default {
    name: "Detail",
    mixins: [backTop],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        goodsParam: {},
        commentInfo: {},
        recommend: [],
        detailImgDebounce: null,
        imgLoadedListener: null,
        navContentOffsetTops: [],
        navContentDebounce: null,
        refreshDebounce: null,
        navCurIdx: 0
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,

      Scroll,
      GoodsList
    },
    created() {
      // 1.获取当前商品的id
      this.iid = this.$route.params.iid

      // 2.通过商品id对数据进行请求
      getDetailData(this.iid).then(res => {
        const data = res.result
        // console.log(data)

        // 1.获取顶部图片轮播的数据
        this.topImages = data.itemInfo.topImages

        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 3.获取店铺信息
        this.shop = new Shop(data.shopInfo)

        // 4.获取商品详细信息
        this.detailInfo = data.detailInfo

        // 5.获取商品的参数信息
        this.goodsParam = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 6.获取商品的评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      })

      // 3.请求推荐的数据
      getDetailRecommend().then(res => {
        this.recommend = res.data.list
      })

      // 4.商品详细信息处图片加载完成后的防抖函数绑定
      this.detailImgDebounce = debounce(() => {
        this.newRefresh()
        this.getContentOffsetTops()
      }, DEBOUNCE_SPAN)

      // 5.绑定navContentDebounce
      this.navContentDebounce = debounce(this.getContentOffsetTops, DEBOUNCE_SPAN)

      // 6.绑定refreshDebounce
      this.refreshDebounce = debounce(this.newRefresh, DEBOUNCE_SPAN)

      // 7.绑定推荐图片完成后的事件监听
      this.imgLoadedListener = () => {
        this.refreshDebounce()
        this.navContentDebounce()
      }
    },
    methods: {
      ...mapActions(['addGoods']),

      newRefresh() {
        this.$refs.scroll.refresh()
      },
      navItemClick(index) {
        this.newRefresh()
        this.$refs.scroll.scrollTo(0, -this.navContentOffsetTops[index], DETAIL_SCROLL_SPAN)
      },
      getContentOffsetTops() {
        this.navContentOffsetTops = []
        this.navContentOffsetTops.push(0)
        this.navContentOffsetTops.push(this.$refs.params.$el.offsetTop)
        this.navContentOffsetTops.push(this.$refs.comment.$el.offsetTop)
        this.navContentOffsetTops.push(this.$refs.recommend.$el.offsetTop)
        // 方便后面滚动进度的轮询
        this.navContentOffsetTops.push(Number.MAX_VALUE)
      },
      detailImgLoad() {
        this.detailImgDebounce()
      },
      contentScroll(position) {
        const positionY = -position.y
        const forLen = this.navContentOffsetTops.length - 1
        for (let i = 0; i < forLen; i++) {
          if (this.navCurIdx !== i && (positionY >= this.navContentOffsetTops[i] &&
              positionY < this.navContentOffsetTops[i + 1])) {
            this.navCurIdx = i
            this.$refs.nav.activeIndex = this.navCurIdx
          }
        }

        // 监听滚动位置，判断回到顶部按钮是否显示
        this.backTopListener(position)
      },
      addToShopcart() {
        // 1.获取购物车页面需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid

        // 2.将商品添加到购物车里
        this.addGoods(product).then(res => {
          this.$toast.show(res, 1500)
        })
      }
    },
    mounted() {
      // 推荐商品栏图片刷新后的处理
      this.$bus.$on("itemImgLoaded", this.imgLoadedListener)
    },
    destroyed() {
      // 必须要这样做，因为就算detail组件被销毁了，还是会监听路由总线传过来的事件
      this.$bus.$off("itemImgLoaded", this.imgLoadedListener)
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    height: 100vh;
    background-color: #fff;
    z-index: 9;
  }

  .detail-content {
    /* 使offsetTop属性能够正确获取 */
    position: relative;
    height: calc(100% - 44px - 58px);
    overflow: hidden;
  }

  .top {
    bottom: 58px;
  }
</style>
