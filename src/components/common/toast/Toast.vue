<template>
    <div class="toast" v-show="isShow">
        <div class="toast-content">{{message}}</div>
    </div>
</template>

<script>
export default {
    name: 'Toast',
    // props: {
    //     message: {
    //         type: String,
    //         default: ''
    //     },
    //     isShow: {
    //         type: Boolean,
    //         default: false
    //     }
    // }
    data() {
        return {
        message: '',
        isShow: false
        }  
    },
    methods: {
        show(message) {
            this.message = message,
            this.isShow = true,
            setTimeout(() => {
                this.message = '',
                this.isShow = false
            },1200)
        }
    }
}
</script>
<style scoped>
 .toast {
     position: fixed;
     top: 50%;
     left: 50%;
     color: #fff;
     border-radius: 5px;
     /* height: 30px; */
     line-height: 30px;
     transform: translate(-50%,-50%);
     background-color: rgba(0,0,0,0.5);
     z-index: 999;
 }
 .toast-content {
     padding: 5px;
     font-size: 14px;
 }
</style>
