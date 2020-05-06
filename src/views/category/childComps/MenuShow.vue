<template>
    <div class="menu-show">
      <div class="show-item" v-for="(item,index) in showList.list" :key="index">
        <img :src="item.image" alt="">
        <div class="title">{{ showList.title }}</div>
      </div>
    </div>
</template>

<script>

export default {
  name: "MenuShow",
  components: {
  },
  props: {
    showList: {
      type: Object,
      default: {}
    }
  },
  methods: {

    
  }
}
</script>

<style scoped>
  #show {
    height: 100vh;
  }
  .content {
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }
  .menu-show {
    display: flex;
    flex-wrap: wrap;
  }
  .menu-show img {
    height: 70px;
    width: 70px;
  }
</style>