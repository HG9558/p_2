import i18n from '@/locales';
export interface Options {
  label: string;
  value: number | string;
}
export interface AjaxReturnOptions {
  id: string;
  name: string;
  level?: string;
}
/**
 * 提款管理 订单状态
 */
export const withDrawa: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: ''
  },
  {
    label: '提款中',
    value: '1'
  },
  {
    label: '提款成功',
    value: '2'
  },
  {
    label: '提款失败',
    value: '3'
  }
];
