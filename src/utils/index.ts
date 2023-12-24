import _ from 'lodash';
import { envBase } from '@/utils/imageBaseUrl';
/**
 * 移除对象数组中的nbsp和编码错误
 * @param arr
 */
export function removeObjArray(arr: any[]) {
  try {
    return JSON.parse(decodeURIComponent(escape2Html(JSON.stringify(arr).replace(/%/g, '%25'))));
  } catch (e: any) {
    return JSON.parse(JSON.stringify(arr).replace(/&nbsp;/g, ' '));
  }
}
type ObjData={
  [key:string]:any
}
export const diffObject=(oldObj:ObjData,newObj:ObjData):ObjData=>{
  const keys=Object.keys(oldObj)
  const keys2=Object.keys(newObj)
  if (oldObj===newObj) return {}

  const diffObj:ObjData={}
  for (let i = 0; i < keys2.length; i++) {
    const key = keys2[i];
    const value=newObj[key]
    const oldValue=oldObj[key]
    if (!oldValue&&value) {
        diffObj[key]=value
        continue
    }
    if (oldValue&&!value) {
      diffObj[key]=''
    }
    if (value!==oldValue&&value) {
      diffObj[key]=value
      continue
    }
  }
  for (let i = 0; i < keys.length; i++) {
    const key = keys2[i];
    const value :any=oldObj[key]
    const newValue=newObj[key]
    if (!newValue&&value) {
        diffObj[key]=''
        continue
    }
    if (newValue&&!value) {
      diffObj[key]=newValue
    }
    if (value!==newValue&&newValue) {
      diffObj[key]=newValue
      continue
    }
  }
  return diffObj
}
/**
 * @获取改变后的obj的属性值
 * @export
 * @param {*} obj
 */
export function useChangeObject(obj: any) {
  // 保存最开始的对象
  const o = _.cloneDeep(obj);
  // 返回一个获取最新对象的函数 || 也接受一个参数,用于和传入的obj做对比
  function getChangeObject(changeObj: any) {
    const changeObjClone = _.cloneDeep(changeObj);
    if (_.isEqual(obj, changeObj)) {
      // 没有改变，返回false
      return false;
    } else {
      // 用于返回的新对象
      const cloneObj: any = {};
      // 循环obj对象，判断和changeObj的值是否相等
      // item 是 对象的key
      for (let item in changeObjClone) {
        if (o[item] != changeObjClone[item]) {
          // 将改变后的值添加到要返回的对象中
          cloneObj[item] = changeObjClone[item];
        }
      }
      return cloneObj;
    }
  }
  return {
    getChangeObject
  };
}

export function escape2Html(str: string): string {
  const arrEntities: { [prop: string]: string } = { lt: '<', gt: '>', nbsp: ' ', amp: '&', iexcl: '?', quot: '\\"' };
  return str.replace(/&(lt|gt|nbsp|amp|nbsp|iexcl|quot);/gi, (all, t: string): string => {
    return arrEntities[t];
  });
}

// 移除数据中的域名
export function deleteDataOrigin(obj: any) {
  const reg = new RegExp(`${envBase}`, 'gi');
  return JSON.parse(JSON.stringify(obj).replace(reg, ''));
}

// 给带有/images/的字符串添加域名前缀
export function addContentImageOrigin(str: string) {
  return str.replace(/\/images\//g, $0 => {
    return `${envBase}${$0}`;
  });
}
/*
 * 获取平台名称
 */
export function getPlatformName() {
  if (site === 'bb8') {
    return 'LB888';
  } else if (site === 'lucky') {
    return 'LUCKY188';
  } else {
    return site.toLocaleUpperCase();
  }
}
/*
 * 返回几位小数
 */
export function getNumberLength() {
  if (site === 'bb8') {
    return '4';
  }
  if (site === 'vp9') {
    return '2';
  }
  if (site === 'ww8') {
    return '4';
  }
  return '4';
}
/*
 * 获取平台使用金钱单位
 * bb8
 * vp9
 */
export function getMoneyUnit(Real: boolean = false) {
  return Real? 'BRL' : 'BRL';
}

export function isFormData(val:{
  [key:string]:any
}) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}