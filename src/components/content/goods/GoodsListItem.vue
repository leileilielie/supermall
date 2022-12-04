<template>
  <div class="goods-item">
    <img :src="goodsItem.show.img" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <div class="goods-msg">
        <span class="price"><i>￥</i>{{goodsItem.price}}</span>
        <span class="collect">{{goodsItem.cfav}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    // 监听每一天图片是否加载完成
    imageLoad() {
      // console.log('imageLoad')
      // 若要做到 将GoodsListItem的消息（图片加载是否完成）传递给Scroll
      // 可以通过Home来做连接
      // 如何连接GoodsListItem和Home 需要使用事件总线 EventBus 来完成
      // 通过 孙子组件发送 Home接收
      this.$bus.$emit('itemImageLoad')
    }
  }
}
</script>

<style scoped>
  .goods-item {
    position: relative;
    width: 48%;
    padding-bottom: 10px;
  }

  .goods-item img {
    width: 100%;
    height: 98%;
    border-radius: 10px;
  }

  .goods-info {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 13px;
    font-size: 14px;
    /*text-align: center;*/
    padding-left: 5px;
    overflow: hidden;
    background-color: #fff;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  .goods-msg {
    height: 20px;
    margin-top: 10px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-top: 5px;
    margin-bottom: 5px;
  }

  .goods-info .price {
    color: var(--color-high-text);
  }

  .goods-info .price i {
    font-size: 12px;
    font-style: normal;
  }

  .goods-info .collect {
    position: relative;
    margin-left: 70px;
  }

  .goods-info .collect::after {
    content: '';
    position: absolute;
    left: -20px;
    top: -1px;
    width: 15px;
    height: 15px;
    background: url("~assets/img/common/collect.svg") 0 0/15px 15px no-repeat;
  }
</style>
