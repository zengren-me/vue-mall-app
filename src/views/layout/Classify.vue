<template>
  <div class="classify-container">
      <div class="search-btn" @touchend="handleTouch">
          <van-icon name="search" />
          <div>荔枝水果9.99</div>
      </div>
      <OneTab />
      <template v-if="!isLoading">
         <SideBar />
         <GoodsList />
      </template>
      <van-loading size="1rem" vertical v-else/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import OneTab from '@/components/oneTab.vue';
import SideBar from '@/components/sideBar.vue';
import GoodsList from '@/components/goodsList.vue';

export default {
  components: {
    OneTab,
    SideBar,
    GoodsList,
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.isLoading,
    }),
  },
  methods: {
    handleTouch() {
      this.$router.push('/search');
    },
  },
};
</script>

<style lang="less" scoped>
.classify-container{
    width: 375px;
  .search-btn {
    width: 355px;
    height: 33px;
    background-color: #eee;
    font-size: 14px;
    border-radius: 10px;
    margin: 11px auto 0;
    text-align: center;
    line-height: 33px;
    color: #a1a1a1;

    >*{
      display: inline-block;
      vertical-align: middle;
    }
  }
}
</style>
