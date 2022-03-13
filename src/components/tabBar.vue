<template>
    <div class="tab-bar">
        <van-tabbar route fixed>
            <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
            <van-tabbar-item icon="apps-o" to="/home/classify">分类</van-tabbar-item>
            <van-tabbar-item
              :badge="getBadge"
              id="shop-car"
              icon="cart-o"
              to="/home/shopping"
            >购物车</van-tabbar-item>
            <van-tabbar-item icon="user-circle-o" to="/my">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      counterMap: (state) => state.counterMap,
    }),
    getBadge() { // 显示购物车数量小图标
      const count = Object.values(this.counterMap).reduce((prev, next) => prev + next, 0);
      if (count > 99) {
        return '99+';
      }
      return count;
    },
  },
};
</script>

<style>

</style>
