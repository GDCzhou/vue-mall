import { Add_COUNTER, ADD_TO_CART } from './mutation-types'


export default {
  addCart(context,payload){
    return new Promise((resolve,reject) => {
    
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
    //2.判断oldProduct是否有重复的商品，有就不添加，数量+1
    if (oldProduct) {
        // oldProduct.count += 1
        context.commit('ADD_COUNTER',oldProduct)
        // console.log('+1');
        
        resolve('当前商品数量+1')
    //否者就将商品添加到cartList中
    }else {
        payload.count =1
        context.commit('ADD_TO_CART',payload)
        // console.log('添加')
        resolve('添加新的商品')
        // state.cartList.push(payload)
    }
    })  
  }
}



  // state.cartList.push(payload)
    // console.log(payload)
    // 1.查找之前的数组中是否有该商品
    // console.log(context.cartList instanceof Array)
    // console.log(payload instanceof Object)
    // console.log(context)