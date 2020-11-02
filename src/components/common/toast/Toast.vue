<template>
  <div class="toast" v-show="isShow">
    <div>{{msg}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    data() {
      return {
        msg: '',
        isShow: false
      }
    },
    methods: {
      show(msg = "默认字符串", duration = 2000) {
        this.msg = msg
        this.isShow = true
        // 在时间间隔后隐藏toast
        setTimeout(() => {
          this.msg = ''
          this.isShow = false
        }, duration)
      }
    }
  }
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    padding: 30px 50px;
    background-color: rgba(0, 0, 0, .7);
    color: #fff;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    z-index: 888;
  }

  .toast>div {
    white-space: nowrap;
  }
</style>
