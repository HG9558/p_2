import { AxiosRequestConfig } from 'axios';

export const SERVICE_HOST = isProd ? APP_CDN_URL.replace('/yiy-admin/statics', '') : APP_CDN_URL;

export function getServiceUrl(path: string) {
  return SERVICE_HOST + '/' + path + (path.includes('?') ? '&' : '?') + `_t=${performance.now()}`;
}

export function setPlatHeader(request: AxiosRequestConfig) {
  // 场馆登录（后台没有场馆登录）， 场馆转账  场馆获取余额
  // 这几个接口 请求   加个请求头  p
  // 如果是 IM电竞 IM体育   p=1
  // 其他场馆  p=0
  // merchant/game/transfer 场馆转账接口 | merchant/game/balance 获取场馆余额
  // merchant/game/adjust/review
  // merchant/game/member/balancereset
  let im1 = '5864536520308659696';
  let im2 = '1846182857231915191';
  if (request.url === 'merchant/game/balance') {
    // 如果是 IM电竞，IM体育，添加请求头 p = 1
    if (request.params?.pid == im1 || request.params?.pid == im2) {
      request.headers.p = 1;
    } else {
      request.headers.p = 0;
    }
  }
  if (request.url === 'merchant/game/transfer' || request.url === 'merchant/game/transferout') {
    if (request.params?.pid == im1 || request.params?.pid == im2) {
      request.headers.p = 1;
    } else {
      request.headers.p = 0;
    }
  }

  if (request.url === 'merchant/game/adjust/review') {
    if (request.data?.pid == im1 || request.data?.pid == im2) {
      request.headers.p = 1;
    } else {
      request.headers.p = 0;
    }
  }

  if (request.url === 'merchant/game/member/balancereset') {
    if (request.params?.pids.indexOf(im1) || request.params?.pids.indexOf(im2)) {
      request.headers.p = 1;
    } else {
      request.headers.p = 0;
    }
  }
}
