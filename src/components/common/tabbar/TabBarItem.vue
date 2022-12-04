<template>
  <!-- 组件内部监听点击事件 -->
  <div class="tab-bar-item" @click="itemClick">
    <!-- 此时所有的item都展示同一内容 若想要动态展示则使用插槽 -->
    <!-- <img src="../../assets/img/tabbar/home.svg" alt="">-->
    <!-- <div>首页</div>-->
    <!-- 使用插槽动态放置图片 -->
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <!-- 当界面处于活跃状态时 有另一种图片 这是需要一个新的插槽 否则之前的插槽会被覆盖 -->
    <div v-else><slot name="item-icon-active"></slot></div>
    <!-- 当文字跟随活跃状态变化时 使用插槽会将<template v-slot:item-text><div>首页</div></template> 直接覆盖插槽位置 -->
    <!-- 而此时的div里面并没有active类名 不能使文字变色 -->
    <!-- 所以可以使用一个div 在div动态绑定设置active属性改变字体颜色 -->
    <!-- <div :class="{active: isActive}"><slot name="item-text"></slot></div>-->
    <!-- 若想要改变字体的其他颜色 可以通过动态绑定属性 -->
    <div :style="activeStyle"><slot name="item-text"></slot></div>

  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  // 传递跳转的页面地址
  props: {
    // 地址为字符串类型
    path: String,
    activeColor: {
      type: String,
      default: 'hotpink'
    }
  },
  data() {
    return {
      // isActive: true
    }
  },
  computed: {
    isActive() {
      // 判断当前的状态
      // this.$route.path 为当前活跃的页面地址
      // 判断 当前活跃的地址 是否包含 item里的path 一样的地址则为true
      // /home -> item1(/home) = true
      // /home -> item1(/category) = false
      // /home -> item1(/cart) = true
      // /home -> item1(/profile) = true
      // indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置 如果没有找到匹配的字符串则返回 -1
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
      // 若处于活跃状态 就将颜色更改 若没有则返回空
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick() {
      console.log('itemClick')
      // 点击组件 跳转对应页面
      this.$router.push(this.path)
    }
  }
}
</script>

<style scoped>
  .tab-bar-item {
    /* 均等分 */
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
    vertical-align: middle;
    margin-bottom: 2px;
  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 5px;
  }

  /*.active {*/
  /*  color: hotpink;*/
  /*}*/
</style>
