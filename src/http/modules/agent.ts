import http from '../core';

/**
 * @param params
 * @returns 邀请设置
 */
export function getAgentInvitations(params: ObjectParams = {}) {
  return http.get('tenant/bonus/config/list', {params});
}
/**
 * @param params
 * @returns 更新邀请设置
 */
export function updateAgentInvitations(data: ObjectParams = {}) {
  return http.post('tenant/bonus/config/update',  data );
}

/**
 * @param params
 * @returns 邀请列表
 */
export function getInvitationList(params: ObjectParams = {}) {
  return http.get('tenant/report/user', {params});
}
/**
 * @param params
 * @returns 邀请列表-取消代理
 */
export function memberAgentCancel(params: ObjectParams = {}) {
  return http.post('tenant/member/update/agent/cancel', params);
}


/**
 * @param params
 * @returns 代理渠道列表
 */
export function channelList(params: ObjectParams = {}) {
  return http.get('tenant/agent/channel/config/list', {params});
}

/**
 * @param params
 * @returns 代理渠道新增
 */
export function channelInsert(params: ObjectParams = {}) {
  return http.post('tenant/agent/channel/config/insert', params);
}
/**
 * @param params
 * @returns 代理渠道更新
 */
export function channelUpdate(params: ObjectParams = {}) {
  return http.post('tenant/agent/channel/config/update', params);
}


/**
 * @description 渠道代理列表
 * @param params
 * @returns
 */
export function bonusList(params: ObjectParams = {}) {
  return http.get('tenant/agent/bonus/config/list', {params});
}

/**
 * @description 渠道代理更新
 * @param params
 * @returns
 */
export function bonusUpdate(params: ObjectParams = {}) {
  return http.post('tenant/agent/bonus/config/update', params);
}

