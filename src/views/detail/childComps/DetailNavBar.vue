<template>
  <div id="detail-nav-bar">
    <nav-bar>
      <div class="left" slot="left" @click="back">
        <img src="~assets/img/common/back.svg">
      </div>
      <div class="center" slot="center">
        <div v-for="(value, index) in titles"
            :class="{active: index === activeIndex}"
            @click="titleClick(index)">{{value}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name: "DetailNavBar",
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        activeIndex: 0
      }
    },
    components: {
      NavBar
    },
    methods:{
      back() {
        this.$router.back()
      },
      titleClick(index) {
        this.activeIndex = index
        // 将点击标题的下标传递给父组件
        this.$emit("navItemClick", index)
      }
    },
    activated() {
      // 重新点击查看详情时，状态重置（避免keep-alive的影响）
      this.activeIndex = 0
    }
  }
</script>

<style scoped>
  .left {
    text-align: center;
  }

  .left>img {
    position: relative;
    top: -3px;
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }

  .center {
    display: flex;
    font-size: 14px;
    text-align: center;
    line-height: 44px;
  }

  .center>div {
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }
</style>
