<template>
<div>
    <!-- <div class="recommend-titil" v-if="Object.keys(goods).length == 0">
        <slot name="recommend-titil"><div> | 推荐更多</div></slot>
    </div> -->
    <div class="goods">
        <!-- 将item的数据传给子组件 -->
        <goods-list-item v-for="(item,index) in goods" :key="index" :goods-item="item"></goods-list-item>
        <!-- <div>{{goods}}</div> -->
    </div>
</div>
    
</template>



<script>
import GoodsListItem from './GoodsListItem'

export default {
    name: "GoodsList",
    components: {
        GoodsListItem,
    },
    props: {
        goods: {
            type: Array,
            default(){
                return []
            }
        },
    },
}
</script>

<style>
    .goods {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    /* .recommend-titil {
        height: 20px;
        line-height: 20px;
        font-size: 13px;
        color: red;
        border-bottom: solid 1px #ccc;
        margin: 2px;
    } */
</style>