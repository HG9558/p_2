import router from '@/router';
import { getCookies, TokenKey } from '@/utils/auth';
import { store } from '@/store';
import type { RouteRecordRaw } from 'vue-router';
import { NotFound } from '@/router/modules/publicRoutes';

const whiteList: string[] = ['/login'];

router.beforeEach(async (to, from, next) => {
  const hasToken = getCookies(TokenKey);
  console.log('rotueresssssss', router.getRoutes());
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      // console.log(to.path, "to为login跳转首页");
      next({ path: '/vip' });
    } else {
      const allows = store.getters['user/getAllows'];
      if (!store.getters['user/getIsLoad']) {
        // 获取可访问路由
        const accessRoutes: RouteRecordRaw[] = await store.dispatch('user/generateRoutes', allows);
        accessRoutes.forEach(item => {
          store.commit('user/addUserRoute', router.addRoute(item));
        });
        store.commit('user/addUserRoute', router.addRoute(NotFound));
        if (to.path == '/') {
          next('/vip');
        }
        next({ ...to, replace: true });
      } else {
        next();
      }
    }
  } else {
    /* has no token*/
    // console.log("token失效，退出");
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      // next(`/login?redirect=${to.path}`);
      next('/login');
    }
  }
});
