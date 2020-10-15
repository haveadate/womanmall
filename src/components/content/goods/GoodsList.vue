<template>
  <div class="goods-list">
    <goods-list-item v-for="(item, index) in goods" :goodsItem="item" :key="index" />
  </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem'

  export default {
    name: 'GoodsList',
    props: {
      goods: {
        type: Array,
        default () {
          return []
        }
      }
    },
    components:{
      GoodsListItem
    }
  }
</script>

<style scoped>
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-top: 10px;
  }
</style>
