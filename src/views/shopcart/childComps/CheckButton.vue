<template>
  <div class="check-button" :class="{'selected': selected}">
    <img src="~assets/img/shopcart/tick.svg">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      selected: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .check-button {
    width: 18px;
    height: 18px;
    border: 2px solid #ccc;
    border-radius: 50%;
    cursor: pointer;
    overflow: hidden;
  }

  .selected {
    background-color: var(--color-tint);
    border-color: var(--color-tint);
  }

  .check-button img {
    position: relative;
    top: -1px;
    left: -1px;
  }
</style>
