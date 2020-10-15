<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles" class="tab-control-item" :class="{active: index === currentIndex}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TabControl',
    data() {
      return {
        currentIndex: 0
      }
    },
    props: {
      titles: {
        type: Array,
        default () {
          return []
        }
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
        // 向外部传递数据
        this.$emit('tabClick', index)
      }
    }

  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 15px;
  }

  .tab-control-item {
    flex: 1;
  }

  .active span {
    padding: 5px;
    border-bottom: 2px solid var(--color-high-text);
    color: var(--color-high-text);
  }
</style>
