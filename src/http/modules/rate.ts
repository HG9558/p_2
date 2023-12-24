import http from '../core';


/**
 * @手续费列表
 * @param {*}
 */
export function rateList(data: ObjectParams = {}) {
    return http.post('/tenant/rate/list', data);
  }
  /**
 * @手续费编辑
 * @param {*}
 */
export function rateUpdate(data: ObjectParams = {}) {
    return http.post('/tenant/rate/update', data);
  }