<template>
    <div>
        <swiper class="swiper-img">
            <swiper-item v-for="item in topImages">
                <img :src="item" alt="">
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
    name: 'DetailSwiper',
    components: {
        Swiper,
        SwiperItem,
    },
    props: {
        topImages:{
            type: Array,
            default: []
        }
    }

}
</script>
<style scoped>
    .swiper-img {
        height: 300px;
        overflow: hidden;
    }
</style>