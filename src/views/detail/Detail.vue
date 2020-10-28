<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @navItemClick="navItemClick" ref="nav" />
    <scroll class="detail-content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages" @swiperImgLoaded="newRefresh" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @goodsImgLoaded="detailImgLoad" />
      <detail-param-info :param-info="goodsParam" ref="params" />
      <detail-comment-info :comment-info="commentInfo" ref="comment" />
      <goods-list :goods="recommend" ref="recommend" />
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar.vue'
  import DetailSwiper from './childComps/DetailSwiper.vue'
  import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
  import DetailShopInfo from './childComps/DetailShopInfo.vue'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
  import DetailParamInfo from './childComps/DetailParamInfo.vue'
  import DetailCommentInfo from './childComps/DetailCommentInfo.vue'

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

  export default {
    name: "Detail",
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
      }, 50)

      // 5.绑定navContentDebounce
      this.navContentDebounce = debounce(this.getContentOffsetTops, 50)

      // 6.绑定refreshDebounce
      this.refreshDebounce = debounce(this.newRefresh, 50)

      // 7.绑定推荐图片完成后的事件监听
      this.imgLoadedListener = () => {
        this.refreshDebounce()
        this.navContentDebounce()
      }
    },
    methods: {
      newRefresh() {
        this.$refs.scroll.refresh()
      },
      navItemClick(index) {
        this.newRefresh()
        this.$refs.scroll.scrollTo(0, -this.navContentOffsetTops[index], 300)
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
          if (this.navCurIdx !== i && (positionY >= this.navContentOffsetTops[i]
            && positionY < this.navContentOffsetTops[i + 1])) {
            this.navCurIdx = i
            this.$refs.nav.activeIndex = this.navCurIdx
          }
        }
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
    height: calc(100% - 44px);
    overflow: hidden;
  }
</style>
