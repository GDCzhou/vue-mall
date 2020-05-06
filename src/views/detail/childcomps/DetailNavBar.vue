<template>
    <div>
        <nav-bar>
            <div slot="left" class="back" @click="backClick">
                <img src="~assets/img/common/back.svg" alt="">
            </div>
            <div slot="center" class="title">
                <div v-for="(item,index) in titles" :key="index" class="title-item" @click="titleClick(index)" :class="{isActive:index === currentIndex}">
                    {{item}}
                </div>
            </div>
        </nav-bar>
    </div>
</template>


<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
    name: 'DetailNavBar',
    components: {
        NavBar,
    },
    data() {
        return {
            titles: ['商品', '参数', '评论', '推荐'],
            currentIndex: 0
        }
    },
    methods: {
        titleClick(index){
            this.currentIndex = index;
            this.$emit('titleClick',index);
        },
        backClick(){
            // this.$router.go(-1)
            this.$router.back()
        }
    }
}
</script>

<style scoped>
 .title {
     display: flex;
 }
 .title-item {
     flex: 1;
     font-size: 12px;

 }
 .isActive {
     color: red;
 }
.back img {
    width: 12px;
    height: 12px;
    margin-top: 5px;
}
</style>