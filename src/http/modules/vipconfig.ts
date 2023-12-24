import http from '../core';


/**
 * @param params
 * @returns 会员等级修改
 */
export function vipUpdate(params: ObjectParams = {}) {
  return http.post('tenant/member/vip/update', params);
}
/**
 * @param params
 * @returns vip列表
 */
export function vipList(params: ObjectParams = {}) {
  return http.get('tenant/member/vip/list', { params });
}

/**
 * @param params
 * @returns 添加vip
 */
export function vipInsert(params: ObjectParams = {}) {
  return http.post('tenant/member/vip/insert', params);
}
/**
 * @param params
 * @returns 修改vip
 */
// export function svipUpdate(params: ObjectParams = {}) {
//   return http.post('tenant/member/vip/update', params);
// }
/**
 * @param params
 * @returns 删除vip
 */
export function vipDelete(params: ObjectParams = {}) {
  return http.post('tenant/member/vip/delete', params);
}
/**
 * @param params
 * @returns vip会员列表
 */
export function vipMember(params: ObjectParams = {}) {
  return http.get('merchant/svip/members', { params });
}
/**
 * @param params
 * @returns 打码配置列表
 */
export function turnoverList(params: ObjectParams = {}) {
  return http.get('tenant/flow/config/list', { params });
}

/**
 * @param params
 * @returns 打码配置更新
 */
export function turnoverUpdate(params: ObjectParams = {}) {
  return http.post('tenant/flow/config/update', params);
}