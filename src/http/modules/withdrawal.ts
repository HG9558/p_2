import http from '../core';

/**
 * @param params
 * @returns 提款管理列表-拒绝
 */
export function withdrawReject(params: ObjectParams = {}) {
  return http.post('tenant/withdraw/reject', params);
}
/**
 * @param params
 * @returns 提款管理列表-财务审核（手动代付， 手动出款）
 */
export function withdrawReview(params: ObjectParams = {}) {
  return http.post('tenant/withdraw/review', params);
}
/**
 * @param params
 * @returns 提款管理列表-强制退款
 */
export function withdrawRefund(params: ObjectParams = {}) {
  return http.post('tenant/withdraw/refund', params);
}

/**
 * @param params
 * @returns 财务 提款列表
 */
export function financeList(params: ObjectParams = {}) {
  return http.post('tenant/withdraw/finance/list', params);
}
/**
 * @param params
 * @returns 财务 历史列表
 */
export function historyList(params: ObjectParams = {}) {
  return http.post('tenant/withdraw/history/list', params);
}
