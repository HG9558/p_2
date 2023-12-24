/**
 * 转换ip
 * @param long number | string
 * @returns
 */
export default function long2ip(long: number | string, isTransfer?: any) {
  // 如果 isTransfer 不存在， 不转换 long 的值， 直接返回 long
  // if (!isTransfer) {
  //   return long;
  // }
  if (typeof long === 'string' && long.includes(':')) {
    return long;
  }
  if (typeof long === 'string' && long.includes('.')) {
    return long;
  } else {
    if (!long) return '';
    const MAX_IP_IN_LONG = 4294967295; // 255.255.255.255
    const MIN_IP_IN_LONG = 0; // 0.0.0.0

    if (typeof long !== 'number' || long > MAX_IP_IN_LONG || long < MIN_IP_IN_LONG) {
      return false;
    }

    const ip = [long >>> 24, (long >>> 16) & 0xff, (long >>> 8) & 0xff, long & 0xff].join('.');

    return ip;
  }
}
