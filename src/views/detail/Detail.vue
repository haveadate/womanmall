<template>
  <div id="detail">
    <detail-nav-bar />
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar.vue'

  export default {
    name: "Detail",
    data() {
      return {

      }
    },
    computed: {
      iid() {
        return this.$route.params.iid
      }
    },
    components: {
      DetailNavBar
    }
  }
</script>

<style scoped>
</style>
