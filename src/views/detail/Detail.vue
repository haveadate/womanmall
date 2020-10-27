<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @navItemClick="navItemClick" />
    <scroll class="detail-content" ref="scroll">
      <detail-swiper :top-images="topImages" @swiperImgLoaded="swiperImgLoaded" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @goodsImgLoaded="goodsImgLoaded" />
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
        imgLoadedListener: null,
        navContentOffsetTops: [],
        navContentDebounce: null
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
    },
    methods: {
      swiperImgLoaded() {
        this.$refs.scroll.refresh()
      },
      goodsImgLoaded() {
        this.$refs.scroll.refresh()
      },
      navItemClick(index) {
        this.$refs.scroll.scrollTo(0, -this.navContentOffsetTops[index], 300)
      },
      getNavContentOffsetTops() {
        this.navContentOffsetTops = []
        this.navContentOffsetTops.push(0)
        this.navContentOffsetTops.push(this.$refs.params.$el.offsetTop - 44)
        this.navContentOffsetTops.push(this.$refs.comment.$el.offsetTop - 44)
        this.navContentOffsetTops.push(this.$refs.recommend.$el.offsetTop -44)
      }
    },
    mounted() {
      // 1.推荐图片加载完成的事件监听
      // 在将模板挂载完成以后，就要开始监听图片的加载事件
      const refresh = debounce(this.$refs.scroll.refresh, 50)
      // 2.对计算navContent添加防抖函数处理
      const getOffsetDebounce = debounce(this.getNavContentOffsetTops, 50)
      this.imgLoadedListener = () => {
        refresh()
        getOffsetDebounce()
      }
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
    height: calc(100% - 44px);
    overflow: hidden;
  }
</style>
