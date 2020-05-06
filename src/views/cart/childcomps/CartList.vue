<template>
<div class="cart-list">
    <scroll class="content" ref="scroll">
        <cart-list-item v-for="item in cartList" :key="item.iid" :item-info="item"></cart-list-item>
    </scroll>
    <cart-bottom-bar></cart-bottom-bar>

</div>
  
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'
  import CartBottomBar from './CartBottomBar'
  import CartListItem from './CartListItem'
  import { mapGetters } from 'vuex'

	export default {
		name: "CartList",
    components: {
      Scroll,
      CartListItem,
      CartBottomBar
    },
    computed: {
      ...mapGetters([
        'cartList'
      ])
    },
    
    activated() {
      console.log('cart actived');
      
      this.$refs.scroll.refresh()
    }
	}
</script>

<style scoped>
  .cart-list {
    height: 100vh;
  }
  .content {
    height: calc(100% - 93px - 40px);
    overflow: hidden;
  }
</style>
