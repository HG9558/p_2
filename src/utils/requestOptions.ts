import { ref, computed } from 'vue';
import { store } from '@/store';
import { APIs } from '@/http';
import { AjaxReturnOptions } from '@/utils/selectOptions';
import i18n from '@/locales/index';
/**
 * @生成label和value
 */
function generate(res: any[] = []) {
  return res.map((item: AjaxReturnOptions) => {
    return {
      label: item.name,
      value: item.id,
      level: item.id
    };
  });
}

// 账号类型
export function accountType(type: string) {
  const g = String(type);
  if (g === '0') {
    return i18n.global.t('global.test_account');
  } else if (g === '1') {
    return i18n.global.t('global.official_account');
  } 
}
/**
 * @获取场馆对应json数据
 * @returns
 */
export function usePlatform(isAll: boolean = false) {
  const list: any = ref<any>([]);
  APIs.options.platformOptions().then((res: any) => {
    const d: any[] = generate(res ? res : []);
    if (isAll) {
      d.unshift({
        label: i18n.global.t('global.checkall'),
        value: ''
      });
    }
    list.value = d;
  });
  function toText(key: string) {
    if (key) {
      if (Number(key) === 1) {
        return i18n.global.t('routes.operation_manage_page.center_wallent');
      }
    }
    const obj = list.value.find((item: any) => item.value == key);
    return obj ? obj.label : '-';
  }
  const platform_list = ref();
  return {
    toPlatformText: toText,
    list
  };
}

/**
 * @性别字段转内容
 * @param gender 性别
 * @returns
 */
export function useGender(gender: string) {
  const g = String(gender);
  if (g === '0') {
    return i18n.global.t('routes.operation_manage_page.dotknow');
  } else if (g === '1') {
    return i18n.global.t('routes.vip_list_page.boy');
  } else if (g === '2') {
    return i18n.global.t('routes.vip_list_page.girl');
  } else {
    return i18n.global.t('routes.operation_manage_page.dotknow');
  }
}

/**
 * @获取场馆名称列表
 * @return {*}
 */
export function getPlatformOptions(isAll: boolean = false) {
  return new Promise(resolve => {
    store.dispatch('app/setTransferArrayAction').then(res => {
      let d = [...res];
      if (isAll) {
        d.unshift({
          label: i18n.global.t('global.checkall'),
          value: ''
        });
      }
      resolve(d);
    });
  });
}

/**
 * @获取场馆名称列表:platform_id
 * @return {*}
 */
export function getPlatformId(isAll: boolean = false) {
  return new Promise(resolve => {
    store.dispatch('app/setPlatformId').then(res => {
      let d = [...res];
      if (isAll) {
        d.unshift({
          label: i18n.global.t('global.checkall'),
          value: ''
        });
      }
      resolve(d);
    });
  });
}

/**
 * @获取t004
 * @return {*}
 */
export function getBankList() {
  return new Promise(resolve => {
    store.dispatch('app/setBankList').then(res => {
      resolve(res);
    });
  });
}
