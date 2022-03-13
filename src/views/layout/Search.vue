<template>
  <div class="search-container">
      <div class="search-header">
        <router-link to="/home/classify">
          <van-icon name="arrow-left" class="arrow-left"/>
        </router-link>
        <van-search
          class="search-content"
          v-model="value"
          show-action
          :placeholder="place"
          @search="onSearch(value)"
          @input="onInput(value)"
          @focus="onFocus"
        >
           <template #action v-if="!showSearchList">
             <div @click="onSearch(value)">搜索</div>
           </template>
            <template #action v-else>
              <router-link to="/home/shopping">
                <van-icon
                name="shopping-cart-o"
                id="shop-car"
                class="shop-car"
                :badge="getBadge"
                />
              </router-link>
           </template>
        </van-search>
      </div>
      <div class="like-search" v-if="likeList.length > 0 && !showSearchList">
        <van-list>
           <van-cell
           v-for="item in likeList"
           :key="item"
           @click="onSearch(item)"
          >
             <template>
               <span  v-html="formatHTML(item)"></span>
             </template>
          </van-cell>
        </van-list>
      </div>
      <div class="search-list" v-if="showSearchList">
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                :immediate-check="false"
            >
                <div v-for="item in goodsList" :key="item.id">
                  <Card v-bind="item" :fly="true"/>
                </div>
            </van-list>
      </div>
      <div class="search-history" v-if="showHistory && historyList.length">
        <History :historyList="historyList" @search="onSearch"/>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import api from '@/api/request';
import Card from '@/components/goodsCard.vue';
import History from '@/components/history.vue';

export default {
  components: {
    Card,
    History,
  },
  data() {
    return {
      place: '酒',
      value: this.place,
      likeList: [],
      timer: null,
      goodsList: [],
      loading: false,
      finished: false,
      page: 1,
      showSearchList: false,
      showHistory: true,
      historyList: [],
    };
  },
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
  methods: {
    async onLoad() {
      const request = await api.getSearch({ type: this.value, page: this.page, size: 7 });
      this.goodsList = [...this.goodsList, ...request.list];
      if (request.total > this.goodsList.length) {
        this.page += 1;
        this.onLoad();
      } else {
        this.finished = true;
      }
    },
    async onSearch(value) {
      if (!value) {
        this.value = this.place;
      } else {
        this.value = value;
      }
      // 判断historyList中是否有当前次搜索的记录， 如果有那么为再次搜索让这个记录提前
      const request = this.historyList.find((item) => item.value === this.value);
      if (request) {
        request.time = new Date().getTime();
        this.historyList.sort((a, b) => b.time - a.time);
      } else {
        this.historyList.unshift({ value: this.value, time: new Date().getTime });
      }
      localStorage.setItem('historyList', JSON.stringify(this.historyList));
      this.showSearchList = true;
      this.showHistory = false;
      this.page = 1;
      this.likeList = [];
      this.goodsList = [];
      this.onLoad();
    },
    onInput(value) {
      if (!value) {
        this.likeList = [];
        return;
      }
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }

      this.timer = setTimeout(async () => {
        const request = await api.getLikeValue(value);
        this.likeList = request.result;
        this.showHistory = false;
      }, 600);
    },
    onFocus() {
      this.likeList = [];
      this.showSearchList = false;
      this.showHistory = true;
    },
    formatHTML(item) { // 将匹配的关键字进行高亮处理
      const reg = new RegExp(this.value, 'g');
      return item.replace(reg, this.value.fontcolor('red'));
    },
  },
  created() {
    this.historyList = JSON.parse(localStorage.getItem('historyList')) || [];
  },
};
</script>

<style lang="less" scoped>
.search-container {
    width: 100%;
    height: 100vh;
    position:relative;
    z-index: 100;
    background-color: #fff;

    .search-header {
      width: 345px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      margin: 0 auto;
      position: fixed;
      top:0;
      left: 15px;
      z-index: 22;
      background-color: #fff;

      .arrow-left {
        font-size: 25px;
      }

      .search-content {
        flex: 1;

        .shop-car {
            font-size: 25px;
            vertical-align: middle;
        }
      }
    }

    .like-search {
      position: relative;
      top:50px;
      box-sizing: border-box;
      padding-left: 35px;
    }

    .search-list {
      position: relative;
      width: 345px;
      margin: 48px auto 0;
    }
}
</style>
