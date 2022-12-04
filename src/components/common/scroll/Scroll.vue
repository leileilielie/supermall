<template>
  <!-- ref绑定在子组件 获取子组件数据 -->
  <!-- 若ref绑定在组件中 那么通过this.$refs.refname获取到的是一个组件对象 -->
  <!-- 若ref绑定在组件中 那么通过this.$refs.refname获取到的是一个组件对象 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    // 通过传入值来决定是否有probeType侦听属性
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      // mouseWheel: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })

    // 2. 监听滚动位置事件
    this.scroll.on('scroll', (position) => {
      // 将监听的位置发送出去
      // console.log(position)
      this.$emit('scroll', position)
    })

    // 3. 监听滚动到底部 上拉加载事件
    // 只有pullUpLoad属性为true 才需要监听
    if(this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        // console.log('监听到滚动到底部')
        this.$emit('pullingUp')
      })
    }
  },
  methods: {
    // 回到顶部方法
    backScrollTo(x, y, time=300) {
      // scroll属性的scrollTo方法
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
    },
    // 重新计算高度方法
    refreshHeight() {
     this.scroll && this.scroll.refresh && this.scroll.refresh()
    },
    // 上拉加载数据完成后调用
    finishPullUpLoad() {
     this.scroll && this.scroll.finishPullUp()
    },
    // 保存离开首页时的y值
    getScrollY() {
      // 通过三元表达式 判断 是否有滚动的值
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>

</style>
