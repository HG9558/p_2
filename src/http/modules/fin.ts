import http from '../core';
/**
 * @param params
 * @returns 入款订单和入款审核订单的接口
 */
export function getDepositList(params: ObjectParams = {}) {
  return http.post('tenant/deposit/list', params );
}
/**
 * @param params
 * @returns 订单历史及日志
 */
export function depositHistory(params: ObjectParams = {}) {
  return http.post('tenant/deposit/history',  params );
}
/* 🇧🇷🇧🇷🇧🇷🇧🇷🇧🇷 */
// 通道列表
export function getTenantFactoryList(params: ObjectParams = {}) {
  return http.get('tenant/factory/list', { params })
}
// 通道修改
export function editTenantFactoryList(params: ObjectParams = {}) {
  return http.post('tenant/factory/update', params)
}
// 指定提现
export function updateDesignPay(params: ObjectParams = {}) {
  return http.post('tenant/factory/updateDesignPay', params)
}

// 手动出款
export function withdrawPayee(params: ObjectParams = {}) {
  return http.post('tenant/withdraw/payee', params)
}
// 手动出款记录
export function queryWithdrawPayeeList(params: ObjectParams = {}) {
  return http.post('tenant/withdraw/payee/list', params)
}

// 手动出款设置密码
export function setWithdrawPayeePassword(params: ObjectParams = {}) {
  return http.post('tenant/withdraw/payee/password', params)
}
