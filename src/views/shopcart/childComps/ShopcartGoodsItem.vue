<template>
  <div class="goods-item">
    <div class="sgi-chk-btn">
      <check-button :selected="goodsItem.selected" @click.native="clickSelector" />
    </div>
    <div class="sgi-img">
      <img :src="goodsItem.image" alt="商品图片">
    </div>
    <div class="sgi-info">
      <div class="title">{{goodsItem.title}}</div>
      <div class="description">商品描述：{{goodsItem.desc}}</div>
      <div class="bottom">
        <div class="price left">￥{{goodsItem.price}}</div>
        <div class="count right">×{{goodsItem.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from './CheckButton.vue'

  export default {
    name: "ShopcartGoodsItem",
    props: {
      goodsItem: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    methods: {
      clickSelector() {
        this.goodsItem.selected = !this.goodsItem.selected
      }
    },
    components: {
      CheckButton
    }
  }
</script>

<style scoped>
  .goods-item {
    display: flex;
    width: 100%;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .sgi-chk-btn {
    display: flex;
    width: 5%;
    justify-content: center;
    align-items: center;
  }

  .sgi-img {
    padding: 5px;
  }

  .sgi-img img {
    display: block;
    width: 80px;
    height: 100px;
    border-radius: 5px;
  }

  .sgi-info {
    flex: 1;
    position: relative;
    padding: 5px 10px;
    font-size: 17px;
    color: #333;
    overflow: hidden;
  }

  .sgi-info .title,
  .sgi-info .description {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .sgi-info .description {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .sgi-info .bottom {
    position: absolute;
    margin-top: 10px;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .sgi-info .price {
    color: orangered;
  }
</style>
