<template>
    <div class="list-container">
        <div class="list-header van-hairline--top-bottom">
            <div :class="{active: type === 'all'}" @touchend="changeType('all')">综合</div>
            <div :class="{active: type === 'sale'}" @touchend="changeType('sale')">销量</div>
            <div
            class="price"
            :class="{
            'price-up': type === 'price-up',
            'price-down': type === 'price-down'}"
            @touchend="changeType('price')">价格</div>
        </div>
        <div class="list-content">
           <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                :immediate-check="false"
            >
                <Card v-for="(item, i) in goodsList" v-bind="item" :fly="true" :key="i"/>
            </van-list>
            </van-pull-refresh>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import Card from './goodsCard.vue';

export default {
  data() {
    return {
      type: 'all',
      finished: false,
      isLoading: false, // 用于下拉刷新表示是否为loading状态 默认false
      loading: false,
      page: 1,
    };
  },
  components: {
    Card,
  },
  computed: {
    ...mapState({
      goodsList: (state) => state.goodsList,
      sideType: (state) => state.type,
    }),
  },
  methods: {
    ...mapActions(['getGoodsList']),
    ...mapMutations(['resetGoodsList']),
    onRefresh() {
      this.isLoading = true;
      this.loading = false;
      this.page = 1;
      this.resetGoodsList();
      this.getGoodsList({ page: this.page, sort: this.type });
      this.isLoading = false;
    },
    async onLoad() {
      this.page += 1;
      const request = await this.getGoodsList({ page: this.page, sort: this.type });
      if (request) {
        // 当滚动条下滑触发load且请求到数据并且还有剩余数据的时候设为false让其重新加载
        this.loading = false;
      } else {
        this.finished = true;
      }
    },
    changeType(type) {
      if (type === 'all') {
        this.type = 'all';
      } else if (type === 'sale') {
        this.type = 'sale';
      } else if (this.type === 'price-up') {
        this.type = 'price-down';
      } else {
        this.type = 'price-up';
      }
      this.onRefresh();
    },
  },
  watch: {
    sideType() { // type变化的时候重新运行下load
      // this.finished = false;
      // this.page = 1;
      // this.onLoad();
    },
  },
};
</script>

<style lang="less" scoped>
.list-container {
    position: fixed;
    top: 135px;
    right: 0;
    bottom: 50px;
    width: 296px;
    overflow-y: auto;
    overflow-x: hidden;
}

.list-content {
  position: absolute;
  left: 0;
  top: 25px;
  width: 100%;
}

.list-header {
    width: 296px;
    height: 25px;
    display: flex;
    justify-content: flex-end;
    padding: 0 8px;
    box-sizing: border-box;
    background-color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;

    >div {
        width: 50px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        color: #aaa;
    }

    .active, .price-up, .price-down {
        color: #ff1a90;
        font-weight: bold;
    }

    .price {
        position: relative;
        &::before, &::after {
            content: "";
            position: absolute;
            border: 4px solid transparent;
        }

        &::before {
            top: 4px;
            right: 0;
            border-bottom-color: #aaa;
        }

        &::after {
            bottom: 4px;
            right: 0;
            border-top-color: #aaa;
        }
    }

    .price-up::before {
        border-bottom-color: #ff1a90;
    }

    .price-down::after {
        border-top-color: #ff1a90;
    }
}

.van-pull-refresh {
    overflow: unset !important;
}
</style>
