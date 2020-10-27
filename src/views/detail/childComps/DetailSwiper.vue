<template>
  <div>
    <swiper class="detail-swiper" v-if="topImages.length">
      <swiper-item v-for="(item, index) in topImages" :key="index">
        <img :src="item" @load="swiperImgLoaded">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {
    Swiper,
    SwiperItem
  } from 'components/common/swiper'

  export default {
    name: 'DetailSwiper',
    props: {
      topImages: {
        type: Array,
        default () {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    data() {
      return {
        counter: 0
      }
    },
    computed: {
      imgsLen() {
        return this.topImages.length
      }
    },
    methods: {
      swiperImgLoaded() {
        if (++this.counter === this.imgsLen) {
          this.$emit("swiperImgLoaded")
        }
      }
    }
  }
</script>

<style scoped>
  .detail-swiper {
    height: 300px;
    overflow: hidden;
  }
</style>
