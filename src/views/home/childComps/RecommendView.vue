<template>
  <div class="recommend">
    <div v-for="item in recommends">
      <a :href="item.link">
        <img :src="item.image" />
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RecommendView',
    props: {
      recommends: {
        type: Array,
        default () {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .recommend {
    display: flex;
    padding: 8px 0 15px;
    text-align: center;
    font-size: 12px;
    border-bottom: 8px solid #eee;
  }

  .recommend > div {
    flex: 1;
  }

  .recommend img {
    width: 75px;
    height: 75px;
    margin-bottom: 8px;
  }
</style>
