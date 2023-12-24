import type { RouteRecordRaw } from 'vue-router';

export const publicRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    meta: {
      name: '登录'
    },
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/login/index.vue')
  },
];

export const NotFound: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: 'not-found',
  meta: {
    name: '找不到此页面'
  },
  component: () =>
    import(/* webpackChunkName: "login" */ '@/views/notFound/index.vue')
};
