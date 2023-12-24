import http from '../core';

/**
 * @param params
 * @returns  运营管理-验证码查询-短信验证码列表
 */
export function verify(params: ObjectParams = {}) {
  return http.get('tenant/member/sms/list', { params });
}
/**
 * @param params
 * @returns  运营管理-验证码查询-邮箱验证码列表
 */
 export function mailList(params: ObjectParams = {}) {
  return http.get('tenant/member/mail/list', { params });
}