export default {
  cartLength(state){
    let count = 0;
    if (state.cartList.length == 0){
      return count
    }else if(state.cartList.length > 0){
      for (let i of state.cartList) {
        count += i.count
      }
      return count
    }
  },
  cartList(state) {
    return state.cartList
  },
}