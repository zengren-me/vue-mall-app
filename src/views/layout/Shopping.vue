<template>
    <div class="shopping-container">
        <div class="shopping-header">
            <van-nav-bar
              title="购物车"
              right-text="删除"
              @click-right="delGoods"
            />
        </div>
        <div class="shopping-content">
            <van-checkbox-group v-model="result" ref="checkboxGroup">
               <div class="card-box"  v-for="(item, i) in shopList" :key="i">
                  <van-checkbox class="check" :name="item.id"></van-checkbox>
                  <GoodsCard v-bind="item" :fly="false"/>
               </div>
            </van-checkbox-group>
        </div>
        <van-submit-bar
           :price="totalPrices"
           :button-text="`去结算(${totalNum})`"
        >
            <van-checkbox v-model="isCheckAll" @click="checkAll">全选</van-checkbox>
        </van-submit-bar>
        <div class="card-none" v-if="!shopList.length">
            <img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/shopping_bg.jpg" alt="xxxx">
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { Dialog, Toast } from 'vant';
import api from '@/api/request';
import GoodsCard from '@/components/goodsCard.vue';

export default {
  components: {
    GoodsCard,
  },
  data() {
    return {
      shopList: [],
      result: [],
      isCheckAll: true,
    };
  },
  created() {
    const request = Object.keys(this.counterMap);
    this.result = request.map((item) => +item);
    api.getValue(request.join()).then((res) => {
      this.shopList = res.list;
    });
  },
  computed: {
    ...mapState({
      counterMap: (state) => state.counterMap,
    }),
    totalNum() { // 获取所选中商品的总数
      const resultArr = this.shopList.filter((item) => this.result.includes(item.id));
      const res = resultArr.reduce((prev, next) => prev + this.counterMap[next.id] || 0, 0);
      return res;
    },
    totalPrices() { // 获取选中商品的总价格
      const resultArr = this.shopList.filter((item) => this.result.includes(item.id));
      return resultArr.reduce((prev, next) => {
        const num = this.counterMap[next.id] || 0;
        return prev + Math.round(num * next.price * 100);
      }, 0);
    },
  },
  methods: {
    ...mapMutations(['changeStorage']),
    delGoods() {
      if (this.result.length === 0) {
        Toast('您还没有选中商品');
      }
      Dialog.confirm({
        message: '您是否要删除已选中商品',
        confirmButtonColor: '#1989fa',
      }).then(() => {
        this.result.forEach((id) => {
          this.changeStorage({ id, value: -Infinity });
        });
        this.shopList = this.shopList.filter((item) => !this.result.includes(item.id));
      }).catch(() => {
        Toast('用户已点击取消');
      });
    },
    checkAll() {
      if (this.isCheckAll) {
        if (this.shopList.length === 0) {
          Toast('购物车没有任何有效商品');
        }
        this.$refs.checkboxGroup.toggleAll(true);
      } else {
        this.$refs.checkboxGroup.toggleAll(false);
      }
    },
  },
  watch: {
    result(newValue) {
      if (newValue.length < this.shopList.length || newValue.length === 0) {
        this.isCheckAll = false;
      } else {
        this.isCheckAll = true;
      }
    },
    shopList(newValue) {
      if (newValue.length === 0) {
        this.isCheckAll = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
  .shopping-container {
    min-height: 100vh;
    background-color: #fff;

    .shopping-header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 10;
    }

    .shopping-content {
      position: absolute;
      top: 45px;
      bottom: 80px;
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
      overflow: auto;

      .card-box {
        display: flex;
        align-items: center;

        .check {
          margin-right: 10px;
          flex-shrink: 0;
        }
      }
   }

   .van-submit-bar {
     bottom: 50px;
   }

   .card-none {
     position: fixed;
     top: 45px;
     left: 0;
     width: 100%;
     height: 50vh;

     img {
       width: 100%;
       height: 100%;
     }
   }
  }
</style>
