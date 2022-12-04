<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles"
         class="tab-control-item"
         :class="{active: index === currentIndex}"
          @click="tabControlClick(index)">
      <span> {{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    tabControlClick(index) {
      this.currentIndex = index;
      // 将点击事件传出
      this.$emit('tabClick', index)
    }
  }
}
</script>

<style scoped>
  .tab-control {
    display: flex;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-size: 16px;
    background-color: #fff;
    z-index: 10;
  }

  .tab-control-item {
    flex: 1;
  }

  .tab-control-item span {
    padding: 5px;
  }

  .active span {
    color: var(--color-high-text);
    border-bottom: 3px solid var(--color-high-text);
  }
</style>
