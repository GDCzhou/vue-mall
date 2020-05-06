<template>
    <div class="tab-control">
        <div v-for="(item,index) in titles" :key="index" class="tab-item" :class="{active:index===currentIndex}" @click="itemClick(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>


<script>
export default {
    name: 'TabControl',
    props: {
        titles:{
            type: Array,
            default(){
                []
            }
        }
    },
    data(){
        return {
            currentIndex: 0
        }
    },
    methods:{
        itemClick(index){
            this.currentIndex=index
            this.$emit('tabClick',index)
            console.log('发送事件',index)
        }
    }
}
</script>

<style>
    .tab-control {
        display: flex;
        text-align: center;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
    }
    .tab-control .tab-item {
        flex: 1;
    }
    .active {
        color: var(--color-tint);
        
        /* color: red; */
    }
    .tab-control span {
        padding: 5px;
    }
    .active span {
        border-bottom: 2px solid red;
    }
</style>