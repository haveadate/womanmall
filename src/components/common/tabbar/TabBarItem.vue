<template>
  <div class="tab-bar-item" @click="btnClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="fontStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      path: String,
      defaultColor: {
        type: String,
        default: "#000"
      },
      activeColor: {
        type: String,
        default: "#f00"
      }
    },
    computed: {
      isActive() {
        // this.$route的长度随着项目的扩大，会大于this.path
        return this.$route.path.indexOf(this.path) !== -1
      },
      fontStyle() {
        return this.isActive ? {
          color: this.activeColor
        } : {
          color: this.defaultColor
        }
      }
    },
    methods: {
      btnClick() {
        // 如果当前页面已经点击，则不用跳转
        if (this.$route.path !== this.path) {
          this.$router.replace(this.path)
        }
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    font-size: 14px;
  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    margin-bottom: 2px;
    vertical-align: middle;
  }
</style>
