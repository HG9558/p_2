import http from '../core';

/**
 * @param params
 * @returns app配置列表
 */
export function appList(params: ObjectParams = {}) {
  return http.get('tenant/app/list ',  params);
}
/**
 * @param params
 * @returns 版本更新
 */
export function appUpdate(params: ObjectParams = {}) {
  return http.post('tenant/app/update', params);
}
/**
 * @param params
 * @returns 站点管理-ip白名单-列表
 */
export function tenantWhitelistList(params: ObjectParams = {}) {
  return http.get('tenant/whitelist/list', { params });
}
/**
 * @param params
 * @returns 站点管理-ip白名单-新增
 */
export function tenantWhitelistInsert(params: ObjectParams = {}) {
  return http.post('tenant/whitelist/insert', params );
}
/**
 * @param params
 * @returns 站点管理-ip白名单-删除
 */
export function tenantWhitelistDelete(params: ObjectParams = {}) {
  return http.get('tenant/whitelist/delete', {params});
}
