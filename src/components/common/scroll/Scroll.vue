<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    data() {
      return {
        bscroll: null
      }
    },
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      // 封装bscroll.scrollTo方法, scrollTo第三个参数表示多少时间回到顶部
      scrollTo(x, y, time = 200) {
        this.bscroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.bscroll.finishPullUp()
      },
      refresh() {
        this.bscroll.refresh()
      }
    },
    mounted() {
      // 1.创建BScroll对象
      this.bscroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: true
      })
      // 2.监听滚动的位置
      this.bscroll.on('scroll', (position) => {
        this.$emit('scroll', position)
      })
      // 3.监听上拉事件
      this.bscroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    }
  }
</script>

<style scoped>
</style>
