<template>
  <tab-bar>
    <tab-bar-item path="/home" activeColor="#ff5777">
      <!-- 具名插槽 需要添加对应的插槽名 比如：图片对应图片插槽 文字对应文字插槽 -->
      <template v-slot:item-icon>
        <!-- 通过在webpack.base.config.js文件的resolve中起别名 可以根据别名更改路径 -->
        <!-- 若不是通过import from寻找路径 而是通过属性src寻找路径 前面必须添加~ -->
        <img src="~assets/img/tabbar/home.svg" alt="">
      </template>
      <!-- 活跃状态的插槽 -->
      <template v-slot:item-icon-active>
        <img src="~assets/img/tabbar/home_active.svg" alt="">
      </template>
      <template v-slot:item-text>
        <div>首页</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/category" activeColor="#ff5777">
      <!-- 具名插槽 需要添加对应的插槽名 比如：图片对应图片插槽 文字对应文字插槽 -->
      <template v-slot:item-icon>
        <img src="~assets/img/tabbar/category.svg" alt="">
      </template>
      <template v-slot:item-icon-active>
        <img src="~assets/img/tabbar/category_active.svg" alt="">
      </template>
      <template v-slot:item-text>
        <div>分类</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/cart" activeColor="#ff5777">
      <!-- 具名插槽 需要添加对应的插槽名 比如：图片对应图片插槽 文字对应文字插槽 -->
      <template v-slot:item-icon>
        <img src="~assets/img/tabbar/shopcart.svg" alt="">
      </template>
      <template v-slot:item-icon-active>
        <img src="~assets/img/tabbar/shopcart_active.svg" alt="">
      </template>
      <template v-slot:item-text>
        <div>购物车</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor="#ff5777">
      <!-- 具名插槽 需要添加对应的插槽名 比如：图片对应图片插槽 文字对应文字插槽 -->
      <template v-slot:item-icon>
        <img src="~assets/img/tabbar/profile.svg" alt="">
      </template>
      <template v-slot:item-icon-active>
        <img src="~assets/img/tabbar/profile_active.svg" alt="">
      </template>
      <template v-slot:item-text>
        <div>我的</div>
      </template>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
// 导入tabbar组件
import TabBar from 'components/common/tabbar/TabBar';
// 导入tabbaritem组件
import TabBarItem from "components/common/tabbar/TabBarItem";

export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>

</style>
