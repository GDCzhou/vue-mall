<template>
<div>
  <div class="nav">
    <nav-bar>
      <!-- <div slot="center">购物车({{$store.state.cartList.length}})</div>
       -->
       <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
  </div>
  <cart-list></cart-list>
</div>
  
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childcomps/CartList'
import { mapGetters } from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
    },
    computed: {
      // cartLength(){
        // return this.$store.getters.cartLength
      // }
      ...mapGetters([
          'cartLength'
        ])
    }
  }
</script>

<style scoped>
  .nav {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
</style>
