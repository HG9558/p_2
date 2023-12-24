import type { RouteRecordRaw } from 'vue-router';
import { authRoutes } from '@/router/modules/authRoutes';

/**
 * 获取符合条件的路由
 * @param tool
 */
export const getPermissionsLoggedRoutes = (tool?: any): RouteRecordRaw[] => {
  return authRoutes;
  if (localStorage.getItem('aaa') === 'admin@gmail.com') {
    return authRoutes;
  } else {
    console.log([authRoutes[0], authRoutes[1]]);
    return [authRoutes[0]];
  }
};
