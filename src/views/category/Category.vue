<template>
  <div class="category">
    <nav-bar class="category-nav">
      <div slot="center">分类</div>
    </nav-bar>
    <div class="category-content">
      <tab-menu :categories = "categories" @selectItem="selectItem">
      </tab-menu>
      <div class="detail-content">
        <scroll class="content">
          <menu-show :showList="showList"></menu-show>
          <tab-control ref="tabcontrol2"
                      :titles="['综合', '新品', '销量']" 
                      @tabClick="tabClick"
                      >
          </tab-control>
          <tab-content :detailList="detailList"></tab-content>
        </scroll>
      </div>
      
    </div>
    
  </div>
</template>

<script>

import NavBar from 'components/common/navbar/NavBar'
import TabMenu from './childComps/TabMenu'
import MenuShow from './childComps/MenuShow'
import TabControl from 'components/content/tabcontrol/TabControl'
import Scroll from 'components/common/scroll/Scroll'
import TabContent from './childComps/TabContent'
import { getCategory,getSubCategory,getDetailCategory } from 'network/category'

  export default {
    name: "Category",
    data() {
      return {
        categories: [],
        maitKey: "3627",
        miniWallkey:"10062603",
        showList: {},

        cureentType: 'pop',
        detailList: [],
        goods: {
          'pop': [],
          'new': [],
          'sell': []
        }
      }
    },
    components: {
      TabMenu,
      NavBar,
      MenuShow,
      TabControl,
      TabContent,
      Scroll
    },
    methods: {
      _getCategroy() {
        getCategory().then(res => {
          // 获取分类的数据
          // console.log(res)
          this.categories = res.data.category.list
          
        })
      },
      _getSubCategory() {
          getSubCategory(this.maitKey).then(res => {
          this.showList = res.data
          })
      },
      //请求分类详情页数据
      _getDetailCategory(){
        getDetailCategory(this.miniWallkey,this.cureentType).then(res => {
          console.log(res)
          this.detailList.push(...res)
        })
      },
      selectItem(index){
        console.log('***')
        this.maitKey = this.categories[index].maitKey
        this.miniWallkey = this.categories[index].miniWallkey
        this._getSubCategory()
        this._getDetailCategory()
      },
      tabClick(index){
        switch(index){
          case 0: 
            this.cureentType = 'pop';
            break;
          case 1:
            this.cureentType = 'new';
            break;
          case 2:
            this.cureentType = 'sell'
        }
        //让两个tabcontrol保持一致
        // this.$refs.tabcontrol1.currentIndex = index;
        // this.$refs.tabcontrol2.currentIndex = index;
      },
    },
    created() {
      this._getCategroy();
      this._getSubCategory();
      this._getDetailCategory()
      
      // console.log(this.category);
      
    }
  }
</script>

<style scoped>
.category-nav {
  background-color: red;
  color: #fff;
}
.category-content {
  display: flex;

}
.detail-content {
  /* display: flex; */
  flex: 1;
  /* flex-direction: column; */
  height: 100vh;

}
.content {
  height: calc(100% - 93px);
  overflow: hidden;
}
</style>
