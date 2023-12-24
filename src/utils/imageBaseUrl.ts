import { parseUrl } from 'xe-utils';
import Local from '@/utils/storage';
const url = Local.get('domain');

// 测试环境静态地址
// const ASSET_SITE_URL = {
//   p3: url
// };

// @ts-ignore
export let SERVICE_HOST = ENVI === 'prod' ? 'https://brazil-banner-test.s3.ap-east-1.amazonaws.com':'https://brazil-banner-test.s3.ap-east-1.amazonaws.com';

// 测试服，本地图片地址
export const devImgBaseUrl = SERVICE_HOST;

export function get_img_base_url() {
  return SERVICE_HOST;
  // if (ENVI === 'prod') {
  //   // 正式服图片地址
  //   return parseUrl(APP_ASSETS_URL).origin;
  // } else {
  //   return devImgBaseUrl;
  // }
}

export let envBase = get_img_base_url();

export function removeEnvBase(str: string | any[]) {
  let val: any = '';
  if (Array.isArray(str)) {
    val = [];
    str.forEach(item => {
      val.push(item.replace(envBase, ''));
    });
    return val;
  } else {
    return str.replace(envBase, '');
  }
}

export function addEnvBase(str: string | any[]) {
  let val: any = '';
  if (Array.isArray(str)) {
    val = [];
    str.forEach(item => {
      if (/^http|https:/g.test(item)) {
        val.push(`${item}`);
      } else {
        val.push(`${envBase}${item}`);
      }
    });
    return val;
  } else {
    if (/^http|https:/g.test(str)) {
      return str;
    } else {
      return `${envBase}${str}`;
    }
  }
}
