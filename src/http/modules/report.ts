import http from '../core';

/**
 * @游戏报表|(场馆)
 * @param{*}
 */
export function getGameReport(params: ObjectParams) {
  return http.get('tenant/report/game', { params });
}

/**
 * @平台报表
 * @param{*}
 */
export function getReportPlatform(params: ObjectParams) {
  return http.get('tenant/report/platform', {params});
}

/**
 * @平台统计数据
 * @param{*}
 */
export function getStatisticalData(params: ObjectParams) {
  return http.get('tenant/report/overview', {params});
}

