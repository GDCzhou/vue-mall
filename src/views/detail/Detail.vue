<template>
  <div id="detail">
    <div>{{$store.cartList}}</div>
  <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="detailNav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods = "goods"></detail-base-info>
      <detail-shop-info :shop = "shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
      <!-- <slot name="recommend-titil"></slot> -->
      <goods-list :goods="recommendInfo" ref="recommend"></goods-list>
    </scroll>
    <!-- 监听根元素的原生事件，可以使用 .native 修饰符 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <!-- <toast></toast> -->
    <detail-bottom-bar @addCart="addCart"></detail-bottom-bar> 
      
  </div>
</template>


<script>
import DetailNavBar from './childcomps/DetailNavBar'
import DetailSwiper from './childcomps/DetailSwiper'
import DetailBaseInfo from './childcomps/DetailBaseInfo'
import DetailShopInfo from './childcomps/DetailShopInfo'
import DetailGoodsInfo from './childcomps/DetailGoodsInfo'
import DetailParamInfo from './childcomps/DetailParamInfo'
import DetailCommentInfo from './childcomps/DetailCommentInfo'
import DetailBottomBar from './childcomps/DetailBottomBar'
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
import Scroll from 'components/common/scroll/Scroll'

import GoodsList from 'components/content/goods/GoodsList'
// import BackTop from 'components/content/backtop/BackTop'

import {mixin1} from 'common/mixin'

//普通封装toast组件
// import Toast from 'components/common/toast/Toast'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    Scroll,
    DetailBottomBar,
    // BackTop,
    GoodsList,
    // Toast
  },
  //混入对象的使用backtop
  mixins: [mixin1],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendInfo: [],
      themeTopYs: [],
      currentIndex: 0,
      // isShowBackTop: false,
      //普通封装toast组件
      // message: '',
      // isShow: false,
    }
  },
  created() {
      // console.log(this.$route);
      // 获取详情页数据
      this.iid = this.$route.params.iid
      getDetail(this.iid).then((res) => {
          // console.log(res);
          const data = res.result
          //轮播图数据
          this.topImages = data.itemInfo.topImages
          //商品信息
          this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
          //店铺数据
          this.shop = new Shop(data.shopInfo)
          //商品详细数据
          this.detailInfo = data.detailInfo
          //商品尺寸数据
          this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
          if (data.rate.list) {
            this.commentInfo = data.rate.list[0];
          }
          this.$nextTick(() => {
            //根据最新的数据，对应的DOM是已经被渲染出来
            //但是图片依然是没有加载完(获得的offsetTop是不包括图片的)
            //offsetTop值不对的原因，大部分是图片的原因
            // this.themeTopYs = [];
            // this.themeTopYs.push(0);
            // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
            // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
            // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
            // console.log(this.themeTopYs);
          })
      }),
      getRecommend().then((res) => {
        // console.log(res)
        this.recommendInfo = res.data.list
      })
  },
  methods: {
    addCart(){
      // 获取购物车信息
      const product = {}
      product.image = this.topImages[0],
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      // 添加到购物车
      this.$store.dispatch('addCart',product).then(res => {
        //1.普通封装toast组件
        // this.isShow = true,
        // this.message = '嘎嘎嘎'
        // setTimeout(() => {
        //   this.isShow = false,
        //   this.message = ''
        // },1500)
        // 2.插件的方式封装
        // console.log(this.$toast)
        this.$toast.show(res)
      }
      )
      
    },
      //   backClick(){
      //   // console.log('backclick')
      //   console.log(this.$refs.scroll.message)
      //   // scrollTo最后一个参数时间(毫秒)
      //   this.$refs.scroll.scrollTo(0,0,500)
      // },
        titleClick(index){
          console.log(index);
          this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100);
        },
      //解决better-scroll滚动不到位的问题
        imageLoad(){
            //监听图片加载完成，刷新位置
            this.$refs.scroll.refresh()
            this.themeTopYs = [];
            this.themeTopYs.push(0);
            this.themeTopYs.push(this.$refs.params.$el.offsetTop);
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
            // console.log(this.themeTopYs);
        },
        //滚动相应的位置切换到相应的标题
        contentScroll(position){
          // console.log(position);
          this.isShowBackTop = -position.y > 1000
          const positionY = -position.y;
          // for (let i in this.themeTopYs) {
            
          // }
          let tlength = this.themeTopYs.length
          for (let i = 0;i < tlength; i++){
            if (this.currentIndex !== i && ((i < tlength -1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === tlength -1 && positionY >= this.themeTopYs[i]))){
              this.currentIndex = i;
              
              this.$refs.detailNav.currentIndex = this.currentIndex;
              // console.log(this.currentIndex);
            }
          }
        },
        debounce(func,delay){
        let timer = null
        return function (...args){
          if (timer) clearTimeout(timer)
          timer = setTimeout(() => {
            func.apply(this,args)
          },delay)
        }
      },
  },
  mounted(){
      const refresh = this.debounce(this.$refs.scroll.refresh,200)
      this.$bus.$on('detailImageLoad',() => {
        // console.log('+++')
        refresh()
        // console.log('详情页刷新')
      })
  },
  updated() {
          // this.themeTopYs = [];
          // this.themeTopYs.push(0);
          // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
          // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
          // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
          // console.log(this.themeTopYs);
          
  }
}
</script>

<style scoped>
  #detail {
      position: relative;
      z-index: 9;
      background-color: #fff;
      height: 100vh;
  }
  #detail .detail-nav {
      position: relative;
      z-index: 9;
      background-color: #fff;
  }
  .content {
      height: calc(100% - 44px - 58px);
  }
</style>