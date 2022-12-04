<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>购物街</template>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControlCv"
      class="cv-tab-control"
      v-show="isTabFixed"></tab-control>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <!-- 给子组件传入数据 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!-- 修饰符 .native 监听组件根元素的原生事件 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
// 公共组件
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backTop/BackTop";

// 子组件
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

// 没有使用default导出 所以使用{}导入
// 导入首页请求的数据
import {getHomeMultidata , getHomeGoods} from "@/network/home";
import {debounce} from "@/common/utils";

import BScroll from "better-scroll";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      // 轮播图数据
      banners: [],
      recommends: [],
      goods: {
        'pop': {
          // 当前tab栏对应的页数
          page: 0,
          // 当前tab栏加载的数据
          list: []
        },
        'new': {
          page: 0,
          list: []
        },
        'sell': {
          page: 0,
          list: []
        }
      },
      currentType: 'pop',
      isShowBackTop: false,
      // tabControl到顶部的值
      tabOffsetTop: 0,
      // 是否吸顶
      isTabFixed: false,
      saveY: 0
    }
  },
  // 使用生命周期函数展示
  created() {
    // 1. 请求多个数据
    this.getHomeMultidata()

    // 2. 请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
    // 获取防抖动的数据
    const refresh = debounce(this.$refs.scroll.refreshHeight, 500)

    // 1. 监听图片是否加载完成
    // 需要在页面创建完成就开始监听
    // 注意$bus 为空 vue里面并没有此方法 所以需要用prototype添加该
    this.$bus.$on('itemImageLoad', () => {
      // console.log('图片加载已完成')
      // 利用scroll.refresh()函数刷新 重新计算需要滚动区域的高度 从而解决滑动卡住的bug
     // this.$refs.scroll && this.$refs.scroll.refreshHeight()
      refresh()
    })
  },
  destroyed() {
    // 会调用destroyed销毁home
    // 使用keep-alive
    console.log('home')
  },
  activated() {
    // console.log('home activated')
    this.$refs.scroll.backScrollTo(0, this.saveY, 1)
    // 刷新
    this.$refs.scroll.refreshHeight()
  },
  deactivated() {
    // console.log('home deactivated')
    // this.saveY = this.$refs.scroll.scroll.y
    this.saveY = this.$refs.scroll.getScrollY()
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    /**
     * 事件监听相关方法
     */
    // tab栏点击切换
    tabClick(index) {
      // console.log(index)
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break;
        case 1:
          this.currentType = 'new'
          break;
        case 2:
          this.currentType = 'sell'
      }
      // this.currentType = Object.keys(this.goods)[index];

      // 让两个tab-control的index同步
      this.$refs.tabControl.currentIndex = index
      this.$refs.tabControlCv.currentIndex = index
    },
    // 返回顶部点击事件
    backClick() {
      // 通过ref获取scroll组件的scroll属性的数据
      // scrollTo(x, y, time) 直接回到某处位置
      // this.$refs.scroll.scroll.scrollTo(0, 0, 500)
      // 通过简单封装 直接调用scroll组件的backScrollTo方法
      this.$refs.scroll.backScrollTo(0, 0, 500)
    },
    // 监听位置事件
    contentScroll(position) {
      // 1. 判断backTop是否显示
      // console.log(position)
      // 滑动位置小于1000 不显示 为false
      this.isShowBackTop = -(position.y) > 1000

      // 2. 决定tabControl是否吸顶
      this.isTabFixed = -(position.y) > this.tabOffsetTop
      // 动态绑定样式
    },
    // 下拉加载更多事件
    loadMore() {
      // console.log('上拉加载更多')
      // 传入currentType选择加载的tab栏
      this.getHomeGoods(this.currentType)

      // 完成上拉加载
      // 重新计算需要滚动的区域高度
      this.$refs.scroll.finishPullUpLoad()
    },
    // 监听图片是否加载完成
    swiperImageLoad() {
      // 获取tabControl的offsetTop
      // $el: 获取对应组件的内部元素
      // 但此时offsetTop值并不准确 因为图片加载是异步的 必须等图片加载完成才能获取准确值
      // console.log(this.$refs.tabControl.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
    },
    /**
     * 网络请求相关方法
     */
    // 请求多个数据封装函数
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // 异步操作
        // console.log(res)
        // 保存数据
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    // 请求商品数据
    getHomeGoods(type) {
      // 动态获取下一页页数
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        // console.log(res)
        // 保存数据 利用展开运算符 将数组解析成单个元素 再push添加进去
        this.goods[type].list.push(...res.data.list)
        // 页码加 +1 因为原来的一页的数据已经请求到了 需要请求下一页
        this.goods[type].page += 1

        // this.$refs.scroll.finishPullUpLoad()
      })
    }
  }
}

</script>

<style scoped>
  /* 通过直接绑定class 可以动态更改颜色 */
  #home {
    /*padding-top: 44px;*/
    /* vh : viewport height 视口高度 100vh 为100%视口 */
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    /*粘性固定*/
    position: sticky;
    top: 44px;
  }

  /* 定位方式 */
  .content {
    position: absolute;
    top: 44px;
    bottom: 44px;
    right: 0;
    left: 0;
  }

  /* 计算高度方式 */
  /*.content {*/
  /*  height: calc(100% - 88px);*/
  /*  !*overflow: hidden;*!*/
  /*  margin-top: 44px;*/
  /*}*/

  .cv-tab-control {
    position: relative;
  }
</style>
