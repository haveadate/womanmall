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
        this.bscroll && this.bscroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.bscroll && this.bscroll.finishPullUp()
      },
      refresh() {
        // 本身better-scroll默认只能加载一次，如果要多次使用，要告诉它已经加载完成
        this.bscroll && this.bscroll.refresh()
      }
    },
    mounted() {
      // 1.创建BScroll对象
      this.bscroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })
      // 2.监听滚动的位置
      if (this.probeType === 2 || this.probeType === 3) {
        this.bscroll.on('scroll', position => {
          this.$emit('scroll', position)
        })
      }
      // 3.监听上拉事件
      if (this.pullUpLoad) {
        this.bscroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }
    }
  }
</script>

<style scoped>
</style>
