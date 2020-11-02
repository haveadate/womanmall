<template>
  <div class="bottom-bar">
    <div class="sbr-selector">
      <check-button class="select-all" :selected="selectState" @click.native="selectorClick" />
      <span>全选</span>
    </div>
    <div class="sbr-total">合计:￥{{totalPrice}}</div>
    <div class="sbr-purchase" @click="toPay">去结算({{selectedGoodsLen}})</div>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'

  import CheckButton from './CheckButton.vue'

  export default {
    name: "ShopcartBottomBar",
    computed: {
      ...mapGetters(['goods']),
      totalPrice() {
        // 先过滤，再计算
        return this.goods.filter(item => {
          return item.selected
        }).reduce((total, item) => {
          return total + parseFloat(item.price) * parseInt(item.count)
        }, 0).toFixed(2)
      },
      selectedGoodsLen() {
        return this.goods.filter(item => item.selected).length
      },
      // 对于全选按钮，一是状态的显示，另一个是点击效果
      selectState() {
        if (this.goods.length === 0) return false
        return !this.goods.some(item => !item.selected)
      }
    },
    methods: {
      selectorClick() {
        if (this.selectState) this.goods.forEach(item => item.selected = false)
        else this.goods.forEach(item => item.selected = true)
      },
      toPay() {
        if (!this.goods.length) {
          this.$toast.show("购物车还是空的呢")
        } else if (!this.selectedGoodsLen) {
          this.$toast.show('请选择需要结算的商品')
        } else {
          this.$toast.show('即将跳转到支付页面...')
        }
      }
    },
    components: {
      CheckButton
    }
  }
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    top: -1px;
    display: flex;
    width: 100%;
    height: 44px;
    background-color: #efefef;
    box-shadow: 0 -2px 3px rgba(100, 100, 100, .2);
    font-size: 14px;
  }

  .sbr-selector {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .sbr-selector .select-all {
    position: relative;
    top: -2px;
  }

  .sbr-selector span {
    margin-left: 5px;
  }

  .sbr-total {
    flex: 2;
    height: 44px;
    font-size: 16px;
    line-height: 44px;
  }

  .sbr-purchase {
    width: 100px;
    height: 44px;
    background-color: orangered;
    color: #fff;
    text-align: center;
    line-height: 44px;
    box-shadow: 0 -2px 3px rgba(255, 69, 0, .3);
  }
</style>
