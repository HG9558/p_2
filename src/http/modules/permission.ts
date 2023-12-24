import http from '../core';

/**
 * @权限模块列表
 * @param {*}
 */
export function getPrivList(params: ObjectParams = {}) {
  return http.get('tenant/priv/list', { params });
}

/**
 * @添加权限模块
 * @param {*}
 */
export function privInsert(data: ObjectParams = {}) {
  return http.post('tenant/priv/insert', data);
}

/**
 * @更新权限模块
 * @param {*}
 */
export function privUpdate(data: ObjectParams = {}) {
  return http.post('tenant/priv/update', data);
}

/**
 * @删除权限模块
 * @param {*}
 */
export function privDelete(params: ObjectParams = {}) {
  return http.get('tenant/priv/delete', { params });
}

/**
 * @用户组列表
 * @param {*}
 */
export function getGroupList(params: ObjectParams = {}) {
  return http.get('tenant/group/list', { params });
}

/**
 * @添加用户组
 * @param {*}
 */
export function groupInsert(data: ObjectParams = {}) {
  return http.post('tenant/group/insert', data);
}

/**
 * @用户组更新
 * @param {*}
 */
export function groupUpdate(data: ObjectParams = {}) {
  return http.post('tenant/group/update', data);
}

/**
 * @添加系统账号
 * @param {*}
 */
export function addSystemAccount(data: ObjectParams = {}) {
  return http.post('tenant/admin/insert', data);
}

/**
 * @编辑系统账号
 * @param {*}
 */
export function editSystemAccount(data: ObjectParams = {}) {
  return http.post('tenant/admin/update', data);
}

/**
 * @获取系统账号列表
 * @param {*}
 */
export function getSystemAccountList(params: ObjectParams = {}) {
  return http.get('tenant/admin/list', { params });
}

/**
 * @修改系统账号状态
 * @param {*}
 */
export function updateSystemAccountState(params: ObjectParams = {}) {
  return http.get('tenant/admin/updatestate', { params });
}
/**
 * @日志管理系统日志
 * @param {*}
 */
export function getSystemList(data: ObjectParams = {}) {
  return http.post('tenant/sys/log/system/list', data);
}
/**
 * @银行卡校验信息日志
 * @param {*}
 */
export function merchantLogBankcardList(params: ObjectParams = {}) {
  return http.get('tenant/bankcard/log/list', { params });
}
/**
 * @银行卡校验信息日志 开启状态
 * @param {*}
 */
export function merchantbankcardCheckState(params: ObjectParams = {}) {
  return http.get('tenant/bankcard/check/state', { params });
}
/**
 * @银行卡校验信息日志 设置状态
 * @param {*}
 */
export function merchantbankcardCheckUpdate(params: ObjectParams = {}) {
  return http.get('tenant/bankcard/check/update', { params });
}
/**
 * @系统管理-日志管理-系统日志
 * @param {*}
 */
export function merchantSysLogSystemList(params: ObjectParams = {}) {
  return http.post('tenant/sys/log/system/list', params);
}
/**
 * @代理域名查询
 * @param {*}
 */
export function tenantAgencyList(params: ObjectParams = {}) {
  return http.get('tenant/agency/list', {params});
}
/**
 * @添加代理域名
 * @param {*}
 */
export function agencyInsert(params: ObjectParams = {}) {
  return http.post('/tenant/agency/insert', params);
}
/**
 * @修改代理域名
 * @param {*}
 */
export function agencyUpdate(params: ObjectParams = {}) {
  return http.post('/tenant/agency/update', params);
}
/**
 * @删除代理域名
 * @param {*}
 */
export function agencyDelete(params: ObjectParams = {}) {
  return http.get('/tenant/agency/delete', {params});
}
/**
 * @导入代理域名
 * @param {*}
 */
export function agencyImport(params: ObjectParams = {}) {
  return http.post('/tenant/agency/import', params);
}
export default {};
