import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api/request';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sideList: [],
    isLoading: false,
    goodsList: [],
    type: '',
    size: 5,
    counterMap: {},
  },
  mutations: {
    getSideList(state, list) {
      state.sideList = list;
    },
    setLoadingState(state, bool) {
      state.isLoading = bool;
    },
    getGoodsList(state, list) {
      state.goodsList = [...state.goodsList, ...list];
    },
    resetGoodsList(state) {
      state.goodsList = [];
    },
    setGoodsType(state, type) {
      if (type) {
        state.type = type;
      }
    },
    setCounterMap(state, map) {
      state.counterMap = map;
    },
    changeStorage(state, { id, value }) {
      if (state.counterMap[id]) {
        if ((value === -1 && state.counterMap[id] === 1) || value === -Infinity) {
          Vue.delete(state.counterMap, id);
        } else {
          Vue.set(state.counterMap, id, state.counterMap[id] + value);
        }
      } else {
        Vue.set(state.counterMap, id, 1);
      }
      localStorage.setItem('goods', JSON.stringify(state.counterMap)); // 本地化存储页面初始化时用于购物数据还原
    },
  },
  actions: {
    async getSideList({ commit, dispatch }, type) {
      commit('setLoadingState', true);
      const request = await api.getSideBar(type);
      commit('getSideList', request);
      commit('resetGoodsList');
      dispatch('getGoodsList', { type: request[0], page: 1, sort: 'all' });
      commit('setLoadingState', false);
    },
    async getGoodsList({ state, commit }, params) {
      const { page, sort } = params;
      const type = params.type || state.type;
      const request = await api.getGoodsList({
        type, page, size: state.size, sort,
      });
      commit('setGoodsType', type);
      commit('getGoodsList', request.list);
      if (request.total > state.goodsList.length) {
        return true;
      }
      return false;
    },
  },
  modules: {
  },
});
