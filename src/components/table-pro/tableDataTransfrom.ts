import dayjs from "dayjs"
import { toFixedNReport } from '@/utils/int';

export const stateList = [{ label: '开启', value: '1' }, { label: '关闭', value: '0' }];
export const betStateList = [{ label: '单', value: '1' }, { label: '双', value: '2' }, { label: '小', value: '3' }, { label: '大', value: '4' }]; // 0无 1单 2 双 3小 4大
export const orderStateList = [{ label: '已中奖', value: '1' }, { label: '未中奖', value: '2' }]; // 0无 1已中奖 2未中奖
export const payStateList = [{ label: '支付成功', value: '1' }, { label: '待确认', value: '2' }]; // 0无 1支付成功 2待确认
export const enableList = [{ label: '启用', value: '1' }, { label: '停用', value: '2' }];  // 0无 1启用 2停用
export function transformState(row: any) {
  const state = stateList.find((item) => item.value === row.state);
  return state ? state.label : '--';
}
export function betStateListFun(row: any) {
  const state = betStateList.find((item) => +item.value === row.bet_content);
  return state ? state.label : '--';
}
export function orderStateListFun(row: any) {
  const state = orderStateList.find((item) => +item.value === row.order_state);
  return state ? state.label : '--';
}
export function payStateListFun(row: any) {
  const state = payStateList.find((item) => +item.value === row.pay_state);
  return state ? state.label : '--';
}
export function enableListFun(row: any) {
  const state = enableList.find((item) => +item.value === row.enable);
  return state ? state.label : '--';
}

export const stateTy = [{ label: '失败', value: '1' }, { label: '成功', value: '0' }];
export function transformStateTy(row: any) {
  const state = stateTy.find((item) => item.value === row.state);
  return state ? state.label : '--';
}

// 时间转换
export function transformTime(row: any, key: string) {
  return row[key] ? (String(row[key]).length > 11 ? dayjs(row[key]).format('YYYY-MM-DD HH:mm:ss') : dayjs(row[key] * 1000).format('YYYY-MM-DD HH:mm:ss')) : ''
}

// 金额格式化
export function transformAmount(row: any, key: string) {
  return toFixedNReport(+row[key]);
}

// 转换-总方法
export function transformAll(row: any, type:string) {
  if (['profit_amount']?.includes(type)) { // 百分比（*100 保留2位小数）
    return `${toFixedNReport(row[type] * 100, 2)}%`;
  } else if (type.includes('count')) { // 人数

  } else if (type === 'level') { // VIP
    return `VIP${row.level}`
  } else if (type.includes('amount') || ['company_revenue', 'cg_rebate', 'balance']?.includes(type)) { // 金额格式化（千分位）
    return transformAmount(row, type);
  } else if (type.includes('at')) { // 时间转换
    return transformTime(row, type);
  }
}

// 状态：1待支付 2已完成 3代付失败 4代付处理中 5重新代付中
export const payState = [
  { label: '待支付', value: '1' },
  { label: '已完成', value: '2' },
  { label: '代付失败', value: '3' },
  { label: '代付处理中', value: '4' },
  { label: '重新代付中', value: '5' },
];
export function payStateFun(row: any) {
  const state = payState.find((item) => +item.value === +row.state);
  return state ? state.label : '--';
}

// 支付类型：0无 1中奖 2返利
export const zfState = [
  { label: '中奖', value: '1' },
  { label: '返利', value: '2' },
];
export function zfStateFun(row: any) {
  const state = zfState.find((item) => +item.value === +row.pay_type);
  return state ? state.label : '--';
}

// 1系统处理 2人工处理
export const clfsState = [
  { label: '系统处理', value: '1' },
  { label: '人工处理', value: '2' },
];
export function clfsStateFun(row: any) {
  const state = clfsState.find((item) => +item.value === +row.automatic);
  return state ? state.label : '--';
}

// 回调状态 1未回调 2回调成功 3回调失败 4回调超时
export const hdState = [
  { label: '未回调', value: '1' },
  { label: '回调成功', value: '2' },
  { label: '回调失败', value: '3' },
  { label: '回调超时', value: '4' },
];
export function hdStateFun(row: any) {
  const state = hdState.find((item) => +item.value === +row.callback_state);
  return state ? state.label : '--';
}

/**
 * 渠道:1, //活动周期 1=在指定时间内有效 2=永久有效
 */
export const l_x = [
  {
    label: '代收',
    value: '1'
  },
  {
    label: '代付',
    value: '2'
  },
  {
    label: '未分配',
    value: '3'
  }
];
export function LXStateFun(row: any) {
  const state = l_x.find((item) => +item.value === +row.ty);
  return state ? state.label : '--';
}

/**
 * 活动，时间类型"period":1, //活动周期 1=在指定时间内有效 2=永久有效
 */
export const selectTimeType = [
  {
    label: '在线',
    value: 1
  },
  {
    label: '离线',
    value: 2
  },
  {
    label: '中止',
    value: 3
  },
];
export function robotStateFun(row: any) {
  const state = selectTimeType.find((item) => +item.value === +row.state);
  return state ? state.label : '--';
}