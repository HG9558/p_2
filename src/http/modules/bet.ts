import http from '../core';

/**
 * @param params
 * @returns 投注管理列表ty=2  会员游戏记录详情ty=3
 */
export function betRecordList(params: ObjectParams = {}) {
  return http.post('tenant/game/record', params);
}