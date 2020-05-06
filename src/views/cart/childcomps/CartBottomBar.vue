<template>
    <div class="bottom-bar">
        <div class="check-content">
            <!-- 只有一个不选中，就不勾选， -->
            <check-button class="check-button" :isChecked="isSelectAll" @click.native="checkClick"></check-button>
            <span>全选</span>
        </div>
        <div class="count">
            <span>合计:{{totalPrice}}</span>
        </div>
        <div @click="payClick" class="calculate">去计算({{cartLength}})</div>
    </div>
</template>

<script>
import CheckButton from './CheckButton'
import { mapGetters } from 'vuex'

export default {
    name: 'CartBottomBar',
    components: {
        CheckButton
    },
    computed: {
        totalPrice() {
            return this.$store.state.cartList.filter(item => {
                return item.checked
            }).reduce((pre,cur) => {
                return pre + cur.price * cur.count 
            },0).toFixed(2)
        },
        ...mapGetters([
            'cartLength',
            'cartList'
        ]),
        isSelectAll(){
            // arr = this.$store.state.cartList.filter(item => {
            //     return !item.checked
            // })
            // for (let i of arr) {
            //     i.checked = !i.checked
            // }
            if (this.cartList.length === 0) return false
            return !(this.cartList.filter(item => !item.checked).length)
            // return !this.cartList.find(item => !item.checked)
            

        }
    },
    methods: {
        checkClick(){
            if (this.isSelectAll) {
                this.cartList.forEach(item => {
                    item.checked = false
                });
            }else {
                this.cartList.forEach(item => {
                    item.checked = true
                })
            }
        },
        payClick() {
        console.log(this.$store.state.cartList.length)
        if (this.$store.state.cartList.length == 0){
          this.$toast.show('购物车为空')
        }else if(this.$store.state.cartList.length > 0) {
          this.$toast.show('正在为你跳转到结算界面...')
        }
      }
    }
}
</script>

<style scoped>
.bottom-bar {
    height: 40px;
    background-color: #eee;
    position: relative;
    /* bottom: 40px; */
    display: flex;
    align-items: center;
    font-size: 13px;
    width: 100%;
    text-align: center;
}
.check-button {
    width: 20px;
    height: 20px;

}
.check-content {
    display: flex;
    align-items: center;
    padding-left: 5px;
    width: 60px;
}
.count {
    /* padding-left: 50px; */
    flex: 1;
}
.calculate {
    width: 100px;
    background-color: pink;
    height: 40px;
    text-align: center;
    line-height: 40px;
}
</style>