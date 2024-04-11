import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'live-sass',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LiveSass.vue'),
  },
  // {
  //   path: '/default',
  //   name: 'default',
  //   component: () => import(/* webpackChunkName: "defaultView" */ '../views/HomeView.vue'),
  // },
];

const router = new VueRouter({
  routes,
});

export default router;
