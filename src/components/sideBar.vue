<template>
    <div class="side-bar-container" ref="sideContainer">
        <div class="item-wrapper"
        v-for="(item, i) in sideList"
        :key="item"
        :class="{ active: index === i }"
        @touchend="scrollTo(i, $event)"
        @touchstart="move=false"
        @touchmove="move=true"
        >
            {{ i === 0 ? '全部' : item }}
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import moveTo from '../utils/moveTo';

export default {
  data() {
    return {
      index: 0,
      move: false,
    };
  },
  computed: {
    ...mapState({
      sideList: (state) => state.sideList,
    }),
  },
  methods: {
    ...mapActions(['getGoodsList']),
    ...mapMutations(['resetGoodsList']),
    scrollTo(i, e) {
      if (this.move) {
        return;
      }
      this.index = i;

      const sideTab = this.$refs.sideContainer;
      const item = e.target;
      const itemTop = item.getBoundingClientRect().top;
      const sideTabTop = sideTab.getBoundingClientRect().top;
      const disY = itemTop - sideTabTop - sideTab.offsetHeight / 2 + item.offsetHeight / 2;
      moveTo(sideTab.scrollTop, disY, sideTab, 'scrollTop'); // 点击商品让其缓慢移向侧边导航栏中间
      this.resetGoodsList();
      this.getGoodsList({
        type: this.sideList[i],
        page: 1,
        sort: 'all',
      });
    },
  },
};
</script>

<style lang="less" scoped>
.side-bar-container {
    width: 79px;
    position: fixed;
    top: 135px;
    left: 0;
    bottom: 50px;
    background-color: #f8f8f8;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 0;
      background-color: none;
    }

    .item-wrapper {
      text-align: center;
      width: 100%;
      height: 40px;
      line-height: 40px;
      font-size: 12px;
      position: relative;

      &.active {
        color: #ff1a90;
        font-weight: 800;

        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 6px;
          height: 18px;
          background-color: #ff1a90;
        }
      }
    }
}
</style>
