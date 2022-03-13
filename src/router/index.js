import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/layout/Home.vue';
import Classify from '../views/layout/Classify.vue';
import Shopping from '../views/layout/Shopping.vue';
import Search from '../views/layout/Search.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/home/classify',
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
  },
  {
    path: '/home',
    component: Home,
    children: [{
      path: 'classify',
      name: 'Classify',
      component: Classify,
    }, {
      path: 'shopping',
      name: 'Shopping',
      component: Shopping,
    }],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
