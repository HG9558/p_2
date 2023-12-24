import dayjs from 'dayjs';
import { dateFormat, getOffsetTime } from '@/utils/date';

/**
 * @时间戳转换
 *
 * @export
 * @param {*} value
 * @param {boolean} [isMir=true] false 就是秒， true 就是毫秒
 * @param {string} [format='YYYY-MM-DD HH:mm:ss']
 * @return {*}
 */
export function format(value: any, isMir: boolean = true, format: string = 'YYYY-MM-DD HH:mm:ss') {
  if (!value || value === '0') {
    return '';
  }
  if (isMir) {
    // return dayjs(value + getOffsetTime()).format(format);
    return dayjs(value).format(format);
  } else {
    // return dayjs(value * 1000 + getOffsetTime()).format(format);
    return dayjs(value * 1000).format(format);
  }
}
