<template>
  <div id="app">
    <!-- keep-alive让组件不重新创建 -->
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    
    <Main-tab-bar></Main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from './components/content/mainTabbar/MainTabBar'

export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
@import './assets/css/base.css';
</style>
