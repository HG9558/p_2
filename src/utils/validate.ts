import { useI18n } from 'vue-i18n';
import i18n from '@/locales';
import { vip } from "./expressions"
/**
  简单的统一校验方法
 */
export const validator = (validator: RegExp, msg: string) => {
  return (rule: any, value: any, callback: any) => {
    if (!value) {
      return callback(new Error(i18n.global.t('global.enter_item')));
    }
    if (validator.test(value) == false) {
      callback(new Error(msg));
    } else {
      callback();
    }
  }
}
/**
 * 判断是否是是url
 * @export
 * @param {boolean} required
 * @param {'blur' | 'change'} trigger
 * @param {string} message
 * @return {
 *    required: boolean,
 *    trigger:'blur' | 'change',
 *    validator:function,   
 * }  {el-rules-item}
 */
export const useValidateUrl = (required: boolean = true, trigger?: 'blur' | 'change', message: string = i18n.global.t('routes.tips.enter_url')
) => {
  return {
    required,
    trigger,
    validator: validator(/^(http|https):\/\/([\w.]+\/?)\S*/, message)
  }
}

/**
 * 判断是否是外部链接
 * @export
 * @param {string} path
 * @return {*}  {boolean}
 */
export function isExternal(path: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(path);
}
