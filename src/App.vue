<template>
  <div id="app">
      <transition :name="transitionName" mode="in-out">
         <router-view class="view"></router-view>
      </transition>
  </div>
</template>

<script>
export default {
  created() {
    const goods = JSON.parse(localStorage.getItem('goods')) || {};
    this.$store.commit('setCounterMap', goods);
  },
  data() {
    return {
      transitionName: 'left',
    };
  },
  watch: {
    $route(to, from) {
      if (to.name === 'Search' && from.name === 'Classify') {
        this.transitionName = 'left';
      } else {
        this.transitionName = 'right';
      }
    },
  },
};
</script>

<style lang="less" scoped>
  .view {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    transition: transform .3s linear;
  }

  .left-enter { // 起始点为屏幕宽度 从右边进入
    transform: translate(100%, 0);
  }

  .right-leave-to { // 离开点为屏幕宽度 从左至右
    transform: translate(100%, 0);
  }
</style>
