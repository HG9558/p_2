import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
  NavigationGuardNext
} from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { publicRoutes } from './modules/publicRoutes';
import { authRoutes } from './modules/authRoutes';
import { getPermissionsLoggedRoutes } from '@/utils/route';
import { store } from '@/store/index';

export const _routers: RouteRecordRaw[] = [...publicRoutes, ...authRoutes];
// console.log(_routers);
const router = createRouter({
  history: createWebHistory(),
  routes: _routers
});

router.beforeEach(
  (to: RouteLocationNormalized, from, next: NavigationGuardNext) => {
    if (to.name && to.meta) {
      if (to.meta.parent) {
        store.commit('app/setCacheView', to.meta.parent);
      }
      store.commit('app/setCacheView', to.name);
    }
    next();
  }
);

export default router;
