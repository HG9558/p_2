import { ref } from 'vue';
import { APIs } from '@/http';
import i18n from '@/locales';

/**
 * @export 开放渠道列表 t013
 * @param {boolean} [isAll=false] 是否需要全选，默认不全选
 * @param {string} [allText=''] 全选的值，默认是空字符串
 * @param {boolean} [isClsNum=true] 是否去掉返回的头个数据 默认是不去掉
 * @return {*}
 */
export function useCate(isAll: boolean = false, allText: string = '', isClsNum: boolean = false) {
  function getData() {
    APIs.fin
      .list({
        all: 1
      })
      .then(res => {
        if (res.status) {
          if (res.data) {
            let d = res.data.map((item: any) => {
              return {
                label: item.name,
                value: item.id,
                state: item.state
              };
            });
            // 是否需要删除第一个
            if (isClsNum) {
              d.shift();
            }
            // 是否需要添加全部
            if (isAll) {
              d.unshift({
                label: i18n.global.t('global.checkall'),
                value: allText
              });
            }
            data.value = d;
          }
        }
      });
  }
  const data = ref<any>([]);

  // getData();
  // 转文字
  function toText(key: string) {
    const obj = data.value.find((item: any) => item.value == key);
    return obj ? obj.label : '-';
  }

  function reload() {
    getData();
  }

  return {
    CateToText: toText,
    CateData: data,
    reload
  };
}

/**
 * @export 通道列表 t013
 * @param {boolean} [isAll=false] 是否需要全选，默认不全选
 * @param {string} [allText=''] 全选的值，默认是空字符串
 * @param {boolean} [isClsNum=true] 是否去掉返回的头个数据 默认是不去掉
 * @return {*}
 */
export function useChannel(isAll: boolean = false, allText: string = '', isClsNum: boolean = false) {
  const data = ref<any>([]);
  function getData() {
    APIs.fin.getTenantFactoryList().then(res => {
      if (res.status) {
        if (res.data) {
          let d = res.data?.d?.map((item: any) => {
            return {
              label: item.name,
              value: item.fid
            };
          });
          // 是否需要删除第一个
          if (isClsNum) {
            d.shift();
          }
          // 是否需要添加全部
          if (isAll) {
            d.unshift({
              label: i18n.global.t('global.checkall'),
              value: allText
            });
          }
          data.value = d;
        }
      }
    });
  }
  getData();
  function channelReload() {
    getData();
  }
  // 转文字
  function toText(key: string) {
    const obj = data.value.find((item: any) => item.value == key);
    return obj ? obj.label : '-';
  }

  return {
    ChannelToText: toText,
    ChannelData: data,
    channelReload
  };
}

/**
 * @export 获取可用的提款渠道
 * @param {boolean} [isAll=false] 是否需要全选，默认不全选
 * @param {string} [allText=''] 全选的值，默认是空字符串
 * @param {boolean} [isClsNum=true] 是否去掉返回的头个数据 默认是不去掉
 * @return {*}
 */
export function useWithdrawAll(isAll: boolean = false, allText: string = '', isClsNum: boolean = false) {
  function getData() {
    APIs.fin.financeCateWithdraw({ a: 1 }).then(res => {
      if (res.status) {
        if (res.data) {
          let d = res.data.map((item: any) => {
            return {
              label: item.name,
              value: item.id,
              state: item.state
            };
          });
          // 是否需要删除第一个
          if (isClsNum) {
            d.shift();
          }
          // 是否需要添加全部
          if (isAll) {
            d.unshift({
              label: i18n.global.t('global.checkall'),
              value: allText
            });
          }
          data.value = d;
        }
      }
    });
  }
  const data = ref<any>([]);

  getData();
  // 转文字
  function toText(key: string) {
    const obj = data.value.find((item: any) => item.value == key);
    return obj ? obj.label : '-';
  }

  function reload() {
    getData();
  }

  return {
    WithdrawToText: toText,
    WithdrawData: data,
    reload
  };
}
