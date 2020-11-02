<template>
  <div>
    <shopcart-goods-item v-for="(item, index) in goods" :key="index" :goodsItem="item" />
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'

  import ShopcartGoodsItem from './ShopcartGoodsItem.vue'

  export default {
    name: "ShopcartGoodsList",
    computed: {
      ...mapGetters(['goods'])
    },
    components: {
      ShopcartGoodsItem
    }
  }
</script>

<style scoped>
</style>
