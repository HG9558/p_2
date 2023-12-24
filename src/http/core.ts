import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';
import { store } from '../store';
import httpFilterConfig from './httpFilterConfig';
import { showFullScreenLoading, tryHideFullScreenLoading } from '@/utils/loading';
import { removeObjArray } from '@/utils';
import { getServiceUrl, setPlatHeader } from './config';
import i18n from '@/locales';
import getDeviceInfo from '@/utils/getDeviceInfo';
import _ from 'lodash';
import Local from '@/utils/storage';
import router from '@/router';
import {empty} from '@/components/serch-form/empty'
import { getServerTime, setXxetaConfig, cborDecrypt, cborEncrypt } from 'cg-utils';
console.log('ENVI=======>', ENVI)
axios.defaults.timeout = 15000;
axios.defaults.responseType = 'arraybuffer'
axios.defaults.headers['d'] = 23
axios.defaults.headers['t'] = '';
/* eslint-disable no-undef */
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/dev' : '/';

// 获取服务器时间
let systemTime: any = 0;
let deviceNo = '';
getDeviceInfo().then(res => {
  console.log('getDeviceInfo===>', res);
  deviceNo = res.webrtcid;
});
setInterval(async () => {
  systemTime = await getServerTime(ENVI === 'prod'? window.location.origin+'/date'+`?_t=${performance.now()}`: getServiceUrl('date'))
}, 15000);
export let lang = new Map([
  ['zh-CN', 'zh-CN'],
  ['en-US', 'en-US']
]);
export function isDateStr(timers: any) {
  if (timers && typeof timers == 'string') {
    if (timers.includes(',') || timers.includes('.') || /[a-zA-Z]/.test(timers)) {
      return false;
    }
  }
  if (!isNaN(Date.parse(timers)) && isNaN(timers)) {
    return true;
  }
  return false;
}
axios.interceptors.request.use(
  async (request: AxiosRequestConfig) => {
    /**
      isDateStr 判断是否是date
    */
    let isUpload =request.url?.includes('import')
    let reqObj: any = request.data || request.params 
    if (!httpFilterConfig[request.url || '']) {
      showFullScreenLoading();
    }
    if (systemTime < 0) systemTime = await getServerTime(ENVI === 'prod'? window.location.origin+'/date'+`?_t=${performance.now()}`: getServiceUrl('date'))

    if (reqObj && !isUpload) {
      Object.keys(reqObj).forEach((v: any) => {
        const val = reqObj[v];
        // 如果是时间格式
        if (isDateStr(val) && !['tenant/report/user'].includes(request.url || '')  ) {
          if (!reqObj[v].split(' ')[1]) {
            if (v.toString().includes('start')) {
              reqObj[v] = reqObj[v] + ' 00:00:00';
            } else if (v.toString().includes('end')) {
              reqObj[v] = reqObj[v] + ' 23:59:59';
            }
          }
          // reqObj[v] = new Date(val).toUTCString();
        }
        if(typeof val ==='string'){
          // 如果包含英文半角符则不处理,否则后端会报错
          const Reg =  /[\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F]/
          if(!Reg.test(val)){
            reqObj[v] = encodeURIComponent(val);
          }
        }
      });
    }
    
    console.log('请求参数：======>', { ...reqObj });
    if(isUpload){
      request.headers['Content-Type'] = 'multipart/form-data'
    }else{
      request.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      request[request.data ? 'data' : 'params'] = { ...reqObj };
      
    }
    request.headers.t = store.getters['user/getToken'] || null;
    request.headers.no = deviceNo;
    request.headers.lang = lang.get(localStorage.getItem('language') || 'zh-CN');

    // setXxetaConfig(request as any, {
    //   'd': 23,
    //   'value': ENVI === 'prod' ? '7165518947' : '3693378124',
    //   'X-Ca-Timestamp': systemTime,
    //   murmurhash_key: 24
    // })

    // 13
    setPlatHeader(request);
    if (request.responseType) request.headers.responseType = request.responseType;
    console.log(request.data);
    
    if (request.method === 'post' && !isUpload) {
      request.data = cborEncrypt(request.data)
    }

    return request;
  },
  error => {
    tryHideFullScreenLoading();
    return Promise.reject(error);
  }
);

// 创建一个没有权限的节流函数
export const permissionTips = _.throttle(
  () => {
    ElMessage.error(i18n.global.t('global.permission'));
  },
  2000,
  {
    trailing: false
  }
);
axios.interceptors.response.use(
  async (req: AxiosResponse) => {
    const response = req;
    tryHideFullScreenLoading();
    if(response.data){
      response.data=cborDecrypt(response.data);
      // response.data = handleStringCallBack(response.data)
    }
    console.log(req.config.url,'response.data :', response.data);
    if (response.data) {
      if (+response.data?.data?.code === 403) {
        localStorage.clear();
        sessionStorage.clear();
        router.replace(`/login?redirect=${router.currentRoute.value.path}`);
        return ElMessage.error(i18n?.global.t('global.ip_xz'));
      }
      const config = httpFilterConfig[(response.config && response.config.url) || ''];
      const noErrTip = config && config.noErrTip === true;
      const defaultErrTipTxt = (config && config.errTxt) || '';
      if (!noErrTip && response.data.status === false && response.data.data && response.config?.params?.noErrTip !== true) {
        if (response.data.data === 'token') {
          // store.dispatch('user/logout').then((res: any) => {
          //   router.replace(`/login?redirect=${router.currentRoute.value.path}`);
          //   console.log(res);
          // });
          store.dispatch('user/logout', 2);
          // router.replace(`/login?redirect=${router.currentRoute.value.path}`);
        } else {
          if (response.data.data === 'otp') {
            ElMessage.error(i18n?.global.t('global.otp'));
          } else if (response.data.data === 'permission denied') {
            permissionTips();
          } else {
            const errorLangInfo  = await import(`./error-msg/${lang.get(localStorage.getItem('language') || 'zh-CN')}.json`)
            ElMessage.error(errorLangInfo?.[response.data.data] || errorLangInfo.data?.[response.data.data] || response.data.data || defaultErrTipTxt);
          }
        }
      }
      if (response.headers['content-type'] == 'application/octet-stream') {
        return response;
      }
      // console.error('response.data :', response.data);
      return removeObjArray(response.data);
    } else {
      return Promise.reject(response);
    }
  },
  err => {
    tryHideFullScreenLoading();
    return Promise.reject(err);
  },
);

export default axios;
