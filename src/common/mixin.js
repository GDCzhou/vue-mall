import BackTop from 'components/content/backtop/BackTop'

export const mixin1 = {
  components: {
    BackTop
  },
  data(){
    return {
      isShowBackTop: false,
    } 
  },
  methods: {
    backClick() {
      // console.log('backclick')
      console.log(this.$refs.scroll.message)
      // scrollTo最后一个参数时间(毫秒)
      this.$refs.scroll.scrollTo(0,0,500)
    },
  }
}