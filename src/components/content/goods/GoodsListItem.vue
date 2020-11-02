<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="listItemImg" @load="itemImgLoaded" />
    <div class="goods-item-info">
      <p class="title">{{goodsItem.title}}</p>
      <span class="price left">￥{{goodsItem.price}}</span>
      <span class="collect right">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GoodsListItem',
    props: {
      goodsItem: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    methods: {
      itemImgLoaded() {
        // 注意，在很多地方都会使用这个组件，
        // 所以，在事件监听方面，各个地方需要做一些处理
        this.$bus.$emit("itemImgLoaded")
      },
      itemClick() {
        this.$router.push(`/detail/${this.goodsItem.iid}`)
      }
    },
    computed: {
      listItemImg() {
        return this.goodsItem.image || this.goodsItem.show.img
      }
    }
  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 6px;
    text-align: center;
    width: 48%;
  }

  .goods-item>img {
    width: 100%;
    border-radius: 3px;
  }

  .goods-item-info {
    margin-top: 4px;
    font-size: 12px;
  }

  .goods-item-info .title {
    margin-bottom: 3px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .goods-item-info .price {
    position: relative;
    left: 5px;
    color: var(--color-high-text);
  }

  .goods-item-info .collect {
    position: relative;
    top: -3px;
    right: 5px;
    vertical-align: middle;
  }

  .goods-item-info .collect::before {
    display: inline-block;
    content: '';
    position: relative;
    top: 2px;
    left: -1px;
    width: 14px;
    height: 14px;
    background-image: url("~assets/img/common/collect.svg");
    background-position: 0 0;
    background-size: 14px 14px;
  }
</style>
