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
export const modigyUsernameList: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: ''
  },
  {
    label: 'test1',
    value: '1'
  },
  {
    label: 'test2',
    value: '2'
  },
  {
    label: 'test3',
    value: '3'
  }
];
