import http from '../core';

/**
 * @新增签到活动
 * @param{*}
 */
export function signInsert(params: ObjectParams) {
  return http.post('tenant/sign/config/insert',  params );
}

/**
 * @签到活动列表
 * @param{*}
 */
export function signList(params: ObjectParams) {
  return http.get('tenant/sign/config/list', { params });
}

/**
 * @更新签到活动状态
 */
export function signUpdate(params: ObjectParams) {
  return http.post('tenant/sign/config/update',  params );
}

/**
 * @签到活动记录
 * @param{*}
 */
export function signRecordList(params: ObjectParams = {}) {
  return http.get('tenant/sign/record/list', { params });
}


/**
 * @新增宝箱活动
 * @param{*}
 */
export function treasureInsert(params: ObjectParams) {
  return http.post('tenant/treasure/config/insert',  params );
}

/**
 * @签到宝箱活动列表
 * @param{*}
 */
export function treasureList(params: ObjectParams) {
  return http.get('tenant/treasure/config/list', { params });
}

/**
 * @更新签到活动状态
 */
export function treasureUpdate(params: ObjectParams) {
  return http.post('tenant/treasure/config/update',  params );
}

/**
 * @签到活动记录
 * @param{*}
 */
export function treasureRecordList(params: ObjectParams = {}) {
  return http.get('tenant/treasure/record/list', { params });
}
/**
 * @签到活动申请记录
 * @param{*}
 */
export function treasureRecordReward(params: ObjectParams = {}) {
  return http.get('tenant/sign/reward/record/list', { params });
}


/**
 * @获取存款活动列表
 * @param{*}
 */
export function getDepositActivity(params: ObjectParams) {
  return http.get('tenant/deposit/config/list',  {params} );
}

/**
 * @新增存款活动
 * @param{*}
 */
export function insertDeposit(data: ObjectParams) {
  return http.post('tenant/deposit/config/insert',  data);
}

/**
 * @更新签到活动状态
 */
export function updateDeposit(data: ObjectParams) {
  return http.post('tenant/deposit/config/update',  data);
}

/**
 * @获取周投注活动列表
 * @param{*}
 */
export function getWeeksActivity(params: ObjectParams) {
  return http.get('tenant/weekly/config/list',  {params} );
}
/**
 * @获取周投注活动记录
 * @param{*}
 */
export function getWeeksRecord(params: ObjectParams) {
  return http.get('tenant/weekly/record/list',  {params} );
}
/**
 * @新增周投注活动
 * @param{*}
 */
export function insertWeeksActivity(data: ObjectParams) {
  return http.post('tenant/weekly/config/insert',  data);
}

/**
 * @更新周投注活动
 */
export function updateWeeksActivity(data: ObjectParams) {
  return http.post('tenant/weekly/config/update',  data);
}



