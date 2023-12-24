import http from '../core';
/**
 * @打码列表
 * @param{*}
 */
export function getFlowList(params: ObjectParams) {
  return http.get('tenant/flow/record/list', { params });
}

/**
 * @待审核列表
 * @param{*}
 */
export function getWithdrawWaitreview(params: ObjectParams = {}) {
  return http.post('tenant/withdraw/wait/review', params);
}

/**
 * @风控审核通过
 * @param{*}
 */
export function withdrawReviewpass(params: ObjectParams = {}) {
  return http.post('tenant/withdraw/review/pass', params);
}

/**
 * @风控审核挂起
 * @param{*}
 */
export function withdrawhandup(params: ObjectParams = {}) {
  return http.post('tenant/withdraw/hangup', params);
}

/**
 * @审核挂起列表
 * @param{*}
 */
export function withdHanduplist(params: ObjectParams = {}) {
  return http.post('tenant/withdraw/hangup/list', params);
}

/**
 * @领取
 * @param{*}
 */
export function withdReceive(params: ObjectParams = {}) {
  return http.post('tenant/withdraw/receive', params);
}

/**
 * @历史记录列表
 * @param{*}
 */
export function withdRiskhistory(params: ObjectParams = {}) {
  return http.post('tenant/withdraw/risk/history', params);
}

/**
 * @风控审核待领取 merchant/finance/withdraw/cardrecord
 * @param{*}
 */
export function withdWaitreceive(params: ObjectParams = {}) {
  return http.post('tenant/withdraw/wait/receive', params);
}
