<template>
  <swiper>
    <!-- 使用v-for遍历banner进行插槽 -->
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
// 导入轮播图
import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
  name: "HomeSwiper",
  // 传入父组件数据
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      // 是否加载完成
      isLoad: false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    // 监听图片加载是否完成
    imageLoad() {
      // console.log('轮播图图片加载完成')
      // 若没有加载 则加载一次
      if(!this.isLoad) {
        this.$emit('swiperImageLoad')
        // 加载过 isLoad改为true 则不会再加载剩余的次数
        this.isLoad = true
      }
    }
  }
}
</script>

<style scoped>

</style>
