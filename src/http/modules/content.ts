import http from '../core';


/**
 * @param params
 * @returns 系统公告 公告添加
 */
export function postinsert(params: ObjectParams = {}) {
  return http.post('tenant/notice/insert', params);
}
/**
 * @param params
 * @returns 系统公告 公告编辑
 */
export function postupdate(params: ObjectParams = {}) {
  return http.post('tenant/notice/update', params);
}
/**
 * @param params
 * @returns 系统公告 公告列表
 */
export function postTenantNoticeList(params: ObjectParams = {}) {
  return http.get('tenant/notice/list', {params});
}
/**
 * @param params
 * @returns 系统公告 停用启用
 */
export function poststate(params: ObjectParams = {}) {
  return http.get('tenant/notice/update/state', {params});
}
/**
 * @param params
 * @returns 系统公告 公告删除
 */
export function getdelete(params: ObjectParams = {}) {
  return http.get('tenant/notice/delete', {params});
}