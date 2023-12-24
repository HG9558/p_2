import http from '../core';

/**
 * @param params
 * @returns App闪屏广告列表
 */
export function advertisingList(params: ObjectParams = {}) {
  return http.get('tenant/banner/list', {params});
}

/**
 * @param params
 * @returns 广告状态
 */
export function operationState(params: ObjectParams = {}) {
  return http.get('tenant/banner/update/state', {params});
}

/**
 * @param params
 * @returns 新增广告
 */
export function insertAdvertising(params: ObjectParams = {}) {
  return http.post('tenant/banner/insert', params);
}

/**
 * @param params
 * @returns 广告删除
 */
export function operationDelete(params: ObjectParams = {}) {
  return http.get('tenant/banner/delete', { params });
}

/**
 * @param params
 * @returns 广告编辑
 */
export function operationUpdate(params: ObjectParams = {}) {
  return http.post('tenant/banner/update', params);
}

