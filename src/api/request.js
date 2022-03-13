import axios from './index';

export default {
  getSideBar(type) {
    return axios.get('/getsidebar', { params: { type } });
  },
  getGoodsList(params) {
    return axios.get('/getGoodsList', { params });
  },
  getLikeValue(likeValue) { // params: 模糊搜索值
    return axios.get('/likeSearch', { params: { likeValue } });
  },
  getSearch(params) { // params: { type, page, size }
    return axios.get('/search', { params });
  },
  getValue(value) { // params:  { value: id }
    return axios.get('/getGoodsByIds', { params: { value } });
  },
};
