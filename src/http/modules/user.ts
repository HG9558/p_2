import http from '../core';

export function login(data: any) {
  return http({
    url: 'tenant/admin/login',
    method: 'post',
    data
  });
}

/**
 * @param params
 * @returns 退出
 */
export function logout(params: ObjectParams = {}) {
  return http.get('tenant/admin/logout', { params });
}
