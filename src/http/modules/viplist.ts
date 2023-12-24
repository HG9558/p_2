import http from '../core';

/**
 * @获取账变记录
 *
 * @export
 * @param {ObjectParams} [params={}]
 * @return {*}
 */
export function getRecordTransaction(params: ObjectParams = {}) {
  return http.post('tenant/member/balance/transaction', {}, {params} );
}
/**
 * @获取账变类型
 * @param {*}
 */
export function getAccountChangeTypes(params: ObjectParams = {}) {
  return http.get('tenant/trans/types', { params });
}


/**
 * @会员列表接口
 * @export
 * @param {ObjectParams} [params={}]
 * @return {*}
 */
export function getMemberList(params: ObjectParams = {}) {
  return http.post('tenant/member/list', params);
}


/**
 * @新增测试账号接口
 * @export
 * @param {ObjectParams} [params={}]
 * @return {*}
 */
export function addTesterMember(params: ObjectParams = {}) {
  return http.post('tenant/member/insert', params);
}
/**
 * @上下分申请
 * @export
 * @param {ObjectParams} [params={}]
 * @return {*}
 */
export function upOrDownPoints(params: ObjectParams = {}) {
  return http.post('tenant/member/adjust/apply', params);
}

/**
 * @上下分记录
 * @export
 * @param {ObjectParams} [params={}]
 * @return {*}
 */
export function getUpOrDownList(params: ObjectParams = {}) {
  return http.get('tenant/member/adjust/list', {params});
}

/**
 * @上下分审核
 * @export
 * @param {ObjectParams} [params={}]
 * @return {*}
 */
export function auditUpOrDown(params: ObjectParams = {}) {
  return http.post('tenant/member/adjust/review', params);
}

/**
 * @禁用启用奖励
 * @export
 * @param {ObjectParams} [params={}]
 * @return {*}
 */
export function updateBonus(params: ObjectParams = {}) {
  return http.post('tenant/member/update/bonus', params);
}
/**
 * @禁用启用返现
 * @export
 * @param {ObjectParams} [params={}]
 * @return {*}
 */
export function updateRebate(params: ObjectParams = {}) {
  return http.post('tenant/member/update/rebate', params);
}

/**
 * 设置出款失败
 */
export function automaticFailed(params: ObjectParams = {}) {
  return http.post('tenant/withdraw/automatic/failed', params);
}

/**
 * 设置用户状态
 */
export function updateMemberStatus(params: ObjectParams = {}) {
  return http.post('tenant/member/update/state', params);
}


/**
 * 绑定代理渠道
 */
export function updateAgentChannel(params: ObjectParams = {}) {
  return http.post('tenant/member/update/agent/channel', params);
}


