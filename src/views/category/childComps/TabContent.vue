<template>
  <div class="tab-content">
    <div v-for="(item,index) in detailList" :key="index" class="item-content">
      <img :src="item.img" alt="">
      <div class="title-content">
        <div class="title">{{ item.title }}</div>
        <div class="item-detail">
          <span class="price">￥{{ item.price }}&nbsp &nbsp</span> 
          <span class="collect">{{ item.cfav }}</span>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabContent',
  props: {
    detailList: {
      type: Array,
      default: []
    }
  }
}
</script>

<style scoped>
.item-content {
  width: 46%;
  position: relative;
  padding-bottom: 40px;
}
.title-content {
  text-indent: 2px;
  position: absolute;
  overflow: hidden;
  font-size: 12px;
  bottom: 5px;
  left: 0;
  right: 0;
  text-align: center; 
}
.item-content img {
  width: 100%;
  border-radius: 5px;
}
.item-content .title {
  /* width: 46%; */
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

}
.price {
  padding-right: 15px;
  color: red;
}
.collect {
  position: relative;
}
.item-detail .collect::before {
    content: '';
    position: absolute;
    left: -13px;
    top: 1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>