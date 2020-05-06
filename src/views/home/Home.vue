<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div> 
    </nav-bar>
    <tab-control class="tab-control"
                  ref="tabcontrol1"
                  :titles="['流行', '新款', '精选']"
                  @tabClick="tabClick" v-show="isTabFixed">
      </tab-control>
    <!-- 设置高度content用于滚动 -->
    <scroll class="content" 
    ref="scroll" 
    :probeType="3" 
    :pullUpLoad="true"
    @scroll="contentScroll"
    @pullingUp="loadMore"
    >
      <home-swiper :banners='banners' @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends='recommends'></recommend-view>
      <feature></feature>
      <!-- 自定义事件@tabclick -->
      <tab-control ref="tabcontrol2"
                  :titles="['流行', '新款', '精选']" 
                  @tabClick="tabClick">
      </tab-control>
      <goods-list :goods="showGoods" ></goods-list>
    </scroll>
    <!-- .native监听组件的原生点击事件 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>

import NavBar from 'components/common/navbar/NavBar'
import {getHomeMultidata,getHomeGoods} from 'network/home'
import HomeSwiper from './childcomps/HomeSwiper'
import RecommendView from './childcomps/RecommendView'
import Feature from './childcomps/Feature'
import TabControl from 'components/content/tabcontrol/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backtop/BackTop'

  export default {
    name: "Home",
    data(){
      return {
        banners: [],
        recommends: [],
        cureentType: 'pop',
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        isShowBackTop: false,
        tabOffsetTop: {
          type: Number,
          default: 0
        },
        isTabFixed: false,
        saveY: 0
      }
    },
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      Feature,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,
    },
    created() {
      this.getHomeMultidata()
      this.getHomeGoods('new')
      this.getHomeGoods('pop')
      this.getHomeGoods('sell')
      //监听时有可能scroll对象还没有初始化，所以不能再created中监听
      // this.$bus.$on('homeImageLoad',() => {
      //   console.log('+++')
      //   this.$refs.scroll.refresh()
      // })
    },
    mounted(){
      const refresh = this.debounce(this.$refs.scroll.refresh,200)
      this.$bus.$on('homeImageLoad',() => {
        // console.log('+++')
        refresh()
        // console.log('home刷新')
      })
      //吸顶效果功能
      //$el：获取组件中的元素
      // console.log(this.$refs.tabcontrol.$el.offsetTop)
    },
    destroyed(){
      // console.log('---home 离开');
      
      },
    activated(){
        this.$refs.scroll.scrollTo(0,this.saveY,0)
        // console.log('activated',this.saveY)
        //刷新位置
        this.$refs.scroll.refresh()
        // console.log('activated')
      },
    deactivated(){
        // console.log('untivated');
        this.saveY = this.$refs.scroll.getScrollY()
        // console.log('deactivated',this.saveY);
    },
    methods:{
      //吸顶效果
      swiperImageLoad(){
        this.tabOffsetTop = this.$refs.tabcontrol2.$el.offsetTop
        // console.log(this.$refs.tabcontrol.$el.offsetTop);
        
      },
      // 网络请求
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          // console.log(res)
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
      })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          this.$refs.scroll.finishPullUp()
          // console.log(res.data.list)
      })

      },
      // 事件监听相关方法
      //防抖函数
      debounce(func,delay){
        let timer = null
        return function (...args){
          if (timer) clearTimeout(timer)
          timer = setTimeout(() => {
            func.apply(this,args)
          },delay)
        }
      },
      tabClick(index){
        switch(index){
          case 0: 
            this.cureentType = 'pop';
            break;
          case 1:
            this.cureentType = 'new';
            break;
          case 2:
            this.cureentType = 'sell'
        }
        //让两个tabcontrol保持一致
        this.$refs.tabcontrol1.currentIndex = index;
        this.$refs.tabcontrol2.currentIndex = index;
      },
      backClick(){
        // console.log('backclick')
        console.log(this.$refs.scroll.message)
        // scrollTo最后一个参数时间(毫秒)
        this.$refs.scroll.scrollTo(0,0,500)
      },
      contentScroll(position){
        // console.log(position)
        this.isShowBackTop = -position.y > 1000
        //吸顶效果
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      // 上拉加载更多
      loadMore(){
        this.getHomeGoods(this.cureentType)
        console.log('正在加载')
        }
    },

    computed:{
      showGoods(){
        return this.goods[this.cureentType].list
      },
      
    },
  }
</script>

<style scoped>
  .tab-control {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  #home {
    /* padding-top: 44px; */
    padding-bottom: 49px;
    /* 可视窗口 */
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  /* .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  } */

/* 用定位的方式解决滚动窗口的问题 */
  .content {

    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  /* .content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */
</style>
