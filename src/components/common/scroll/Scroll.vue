<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
    props: {
      probeType: {
        type: Number,
        default: 0,
            },
      pullUpLoad: {
        type: Boolean,
        default: false
            }
    }, 
    data(){
        return {
            scroll: null,
            message: '回到顶部',
        }
      },
    methods:{
        scrollTo(x,y,time=300){
            // this.scroll.scrollTo(x,y,time)
            //严谨写法
            this.scroll && this.scroll.scrollTo(x,y,time)
        },
        finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      refresh(){
        // console.log('+++')
        this.scroll && this.scroll.refresh()
      },
      getScrollY(){
        return this.scroll ? this.scroll.y : 0
      }
      

    },
    mounted() {
        this.scroll = new BScroll(this.$refs.wrapper,{
            click: true,
            //proBeType,0,1不监测实时位置，
            // 2：再手指滚动的过程中监测，手指离开后的惯性滚动过程中不监测
            // 3：只要是滚动就监测
            probeType: this.probeType,
            // 监听上拉事件
            pullUpLoad: this.pullUpLoad
        }),
        // 实时监听滚动条的位置
        this.scroll.on('scroll',(position) => {
          // console.log(position)
        this.$emit('scroll',position)
        })
        this.scroll.on('pullingUp',() => {
          this.$emit('pullingUp')
        })
        // console.log(this.scroll.on)

    }
}
</script>