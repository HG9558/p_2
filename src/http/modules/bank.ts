import http from '../core';

/**
 * @param params
 * @returns 银行卡列表
 */
export function getBankList(params: ObjectParams = {}) {
  return http.get('tenant/member/bankcard/list', {params});
}

/**
 * @param params
 * @returns 新增银行卡
 */
export function insertBank(params: ObjectParams = {}) {
  return http.post('tenant/member/bankcard/insert', params);
}
/**
 * @param params
 * @returns 银行卡列表
 */
export function getBankType(params: ObjectParams = {}) {
  return http.get('tenant/bank/type/list', {params});
}

/**
 * @param params
 * @returns 新增银行卡
 */
export function insertBankType(params: ObjectParams = {}) {
  return http.post('tenant/bank/type/insert', params);
}

