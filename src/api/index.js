import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mallapi.duyiedu.com/goods/',
  params: {
    appkey: 'zr_1642140324783',
  },
});

instance.interceptors.response.use((resp) => resp.data);

export default instance;
