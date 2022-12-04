<template>
  <div id="tab-bar">
    <!-- 使用插槽显示tabbaritem子元素 -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar"
}
</script>

<style scoped>
  #tab-bar {
    display: flex;
    background-color: #f6f6f6;

    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    /* 盒子阴影 x轴为0 y轴向上偏移出阴影 所以为负值 模糊程度 颜色 */
    box-shadow: 0px -2px 5px rgba(100, 100, 100, 0.2);
  }

</style>
