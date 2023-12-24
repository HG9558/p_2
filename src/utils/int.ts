import numeral from 'numeral';
import { getMoneyUnit } from './index';
import i18n from '@/locales';
/**
 * @param {number} num
 * @param {number} [precision=12]
 * @return {*}
 */
export function strip(num: number, l: number = 4) {
  // if (!num && num !== 0) return;
  // return (+parseFloat(num.toPrecision(precision))).toFixed(2);
  return toFixedN2(num, l);
}

// @数字精度问题
export function stripNum(num: number, l: number = 4) {
  if (!num) {
    return strip(0, l);
  }
  if (Number.isNaN(Number(num))) {
    return strip(0, l);
  }
  return (+parseFloat(Number(num).toPrecision(20))).toFixed(l);
}

/**
 *  计算百分比(针对浮点数问题)
 *  l 小数点位数
 * */
export function toPercentage(value: number, l: number = 2) {
  if (!value) return '-';
  const str = (value * 100).toString().split('.');
  const str1 = str[1] ? str[1].substr(0, l).padEnd(l, '0') : ''.padEnd(2, '0');

  return str[0] + '.' + str1 + '%';
}

/**
 *  精确小数点
 *  l 小数点位数
 * */
export function toFixedN(value: number, l: number = 4) {
  return stripNum(value, l);
}

/**
 *  精确小数点-----报表使用
 *  l 小数点位数
 * */
export function toFixedNReport(value: number, l: number = 4) {
  if (l == 2) {
    return strip(value, 2);
  }
  if (site === 'bb8') {
    return numeral(numeral(stripNum(value, l)).value() || 0).format('0,0.0[00000000]');
  }
  return numeral((numeral(stripNum(value, l)).value() || 0)).format('0,0.0');
}

/**
 *  精确小数点-----综合报表使用
 *  l 小数点位数
 * */
export function toFixedNReportZH(value: number, l: number = 0) {
  if (site === 'bb8') {
    return numeral(numeral(stripNum(value, l)).value() || 0).format('0,0[00000000]');
  }
  return numeral((numeral(stripNum(value, l)).value() || 0)).format('0,0');
}

export function appendBRL(val: any, isKvnd = true) {
  if (!val) {
    return `0.0${getMoneyUnit()}`;
  }
  return `${val.toString()}${getMoneyUnit(isKvnd)}`;
}

/**
 *  精确小数点
 *  l 小数点位数
 * */
export function toFixedN2(value: number, l: number = 4) {
  if (!value) {
    return `0.${''.padEnd(l, '0')}`;
  }
  const str = value.toString().split('.');
  const str1 = str[1] ? str[1].substr(0, l).padEnd(l, '0') : ''.padEnd(l, '0');

  return str[0] + '.' + str1;
}
// 秒级时间戳转换
export function functiontoHHMMSS(secs: any) {
  const sec_num = parseInt(secs, 10);
  const hours = Math.floor(sec_num / 3600) % 24;
  const minutes = Math.floor(sec_num / 60) % 60;
  const seconds = sec_num % 60;
  return [hours, minutes, seconds].map(v => (v < 10 ? '0' + v : v)).join(':');
}
// 转换成分秒
export function functionToFM(secs: any) {
  const sec_num = parseInt(secs, 10);
  const hours = Math.floor(sec_num / 3600) % 24;
  const minutes = Math.floor(sec_num / 60) % 60;
  const seconds = sec_num % 60;
  let str = [minutes, seconds].map(v => (v < 10 ? '0' + v : v)).join(i18n.global.t('routes.tips.fen'));
  return str + i18n.global.t('routes.tips.miao')
}
