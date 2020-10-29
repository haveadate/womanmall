<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <div>客服</div>
      </div>
      <div>
        <i class="icon shop"></i>
        <div>店铺</div>
      </div>
      <div @click="collect">
        <i class="icon collect" :class="{collected: isCollect}"></i>
        <div>收藏</div>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="shopcart" @click="addToShopcart">加入购物车</div>
      <div class="purchase">购买</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBottomBar",
    data() {
      return {
        isCollect: false
      }
    },
    methods: {
      collect() {
        this.isCollect = !this.isCollect
      },
      addToShopcart() {
        this.$emit("addToShopcart")
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    display: flex;
    height: 58px;
    box-shadow: 0 -1px 1px rgba(100, 100, 100, .2);
  }

  .bar-item {
    flex: 1;
    display: flex;
  }

  .bar-left {
    font-size: 13px;
    text-align: center;
  }

  .bar-left>div {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .bar-left .icon {
    display: block;
    width: 22px;
    height: 22px;
    margin-bottom: 4px;
    background-image: url("~assets/img/detail/detail_bottom.png");
    background-size: 22px auto;
  }

  .bar-left .service {
    background-position: 0 -54px;
  }

  .bar-left .shop {
    background-position: 0 -98px;
  }

  .bar-left .collect {}

  .collected {
    background-position: 0 -28px;
  }

  .bar-right {
    line-height: 58px;
    font-size: 15px;
    text-align: center;
  }

  .bar-right .shopcart {
    flex: 1;
    background-color: #ffe817;
    color: #333;
  }

  .bar-right .purchase {
    flex: 1;
    background-color: #f69;
    color: #fff;
  }
</style>
