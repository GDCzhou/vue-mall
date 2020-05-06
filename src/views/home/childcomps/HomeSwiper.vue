<template>
    <swiper>
      <swiper-item v-for="item,index in banners" :key="index" >
        <a :href="item.link">
          <img :src="item.image" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
  name: 'HomeSwiper',
  props: {
    banners: {
      type: Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      // 只发送一次事件
      isload: false
    }
  },
  components:{
    Swiper,
    SwiperItem
  },
  methods: {
    imageLoad(){

      if (!this.isload){
        this.$emit('swiperImageLoad')
        this.isload = true
      }
    }
  }
}
</script>