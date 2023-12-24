import { ref } from 'vue';
import i18n from '@/locales';
import { vipList } from '@/http/modules/vipconfig';
import { getAccountChangeTypes } from '@/http/modules/viplist';
/**
 * @export 游戏类型 T001
 * @param {boolean} [isAll=false] 是否需要全选，默认不全选
 * @param {string} [allText=''] 全选的值，默认是空字符串
 * @param {boolean} [isClsNum=true] 是否去掉返回的头个数据 默认是去掉
 * @return {*}
 */
export function useGameTypeList(isAll: boolean = false, allText: string = '', isClsNum: boolean = true) {
  const data = ref<any>([
    {
      id: 1,
      level: "001001",
      name: i18n.global.t('global.real_people'),
    },
    {
      id: 2,
      level: "001002",
      name: i18n.global.t('global.fish'),
    },
    {
      id: 3,
      level: "001003",
      name: i18n.global.t('global.electronic')
    },

    {
      id: 4,
      level: "001005",
      name: i18n.global.t('global.sport')
    },

    {
      id: 5,
      level: "001007",
      name: i18n.global.t('global.chess')
    },

    {
      id: 6,
      level: "001009",
      name: i18n.global.t('global.Esport')
    }
  ]);
  let d = data.value.map((item: any) => {
    return {
      label: item.name,
      value: item.id,
      level: item.level
    };
  });
  // 是否需要添加全部
  if (isAll) {
    d.unshift({
      label: i18n.global.t('global.checkall'),
      value: allText
    });
  }
  data.value = d;
  
  // 转文字
  function toText(value: string) {
    const obj = data.value.find((pl: any) => pl.value == value);
    if (obj) {
      return obj.label;
    }
  }

  return {  
    GameTypeListData: data,
    GameTypeListToText: toText
  };
}


/**
 * @export Vip等级 vip[1-9].json
 * @param {boolean} [isAll=false] 是否需要全选，默认不全选
 * @param {string} [allText=''] 全选的值，默认是空字符串
 * @param {boolean} [isClsNum=true] 是否去掉返回的头个数据 默认是不去掉
 * @return {*}
 */
export function useVipLevel(isAll: boolean = false, allText: string = '', isClsNum: boolean = false, isAjax = true) {
  const data = ref<any>([]);
  if (isAjax) {
    vipList().then((res: any) => {
      if (res) {
        let d = res?.data?.d
          .filter((el: any) => el.vip.length !== 3)
          .map((item: any) => {
            return {
              label: item.name,
              value: item.vip,
              level: item.vip
            };
          });
        // 是否需要添加全部
        if (isAll) {
          d.unshift({
            label: i18n.global.t('global.checkall'),
            value: allText
          });
        }
        data.value = d;
      }
    });
  } else {
    let d = [];
    for (let i = 1; i <= 10; i++) {
      d.push({
        label: `VIP${i}`,
        value: i,
        level: i
      });
    }
    data.value = d;
  }

  // 转文字
  function toText(key: string) {
    if (key===undefined||key==='') return '-';
    // tslint:disable-next-line:only-arrow-functions
    const keyList = String(key)
      .split(',')
      .sort(function (a, b) {
        // @ts-ignore
        return a - b;
      });
    const str: any[] = [];
    keyList.forEach((item: any) => {
      const obj = data.value.find((c: any) => c.level == item);
      str.push(obj ? obj.label : '');
    });
    return str.join(',');
    // const obj = data.value.find((item: any) => item.level == key);
    // return obj ? obj.label : '-';
  }

  return {
    toVipText: toText,
    vip_list: data
  };
}
/**
 * @export 系统站内信 功能模块 T024.json
 * @param {boolean} [isAll=false] 是否需要全选，默认不全选
 * @param {string} [allText=''] 全选的值，默认是空字符串
 * @param {boolean} [isClsNum=true] 是否去掉返回的头个数据 默认是去掉
 * @return {*}
 */
export function useSystemMsg(isAll: boolean = false, allText: string = '', isClsNum: boolean = true) {
  const data = ref<any>([
    {
      label: i18n.global.t('global.finance'),
      value: 351
    },
    {
      label: i18n.global.t('global.agency'),
      value: 352
    },
    {
      label: i18n.global.t('global.vip_member'),
      value: 353
    },
    {
      label: i18n.global.t('global.activity_yy'),
      value: 354
    }
  ]);

  if (isAll) {
    data.value.unshift({
      label: i18n.global.t('global.checkall'),
      value: ''
    });
  }
  // 转文字
  function toText(key: string) {
    const obj = data.value.find((item: any) => item.value == key);
    return obj ? obj.label : '-';
  }

  return {
    SystemMsgToText: toText,
    SystemMsgData: data
  };
}
/**
 * @export 会员提款状态 T025.json
 * @param {boolean} [isAll=false] 是否需要全选，默认不全选
 * @param {string} [allText=''] 全选的值，默认是空字符串
 * @param {boolean} [isClsNum=true] 是否去掉返回的头个数据 默认是去掉
 * @return {*}
 */
export function useWithdrawalStatus(isAll: boolean = false, allText: string = '', isClsNum: boolean = true) {
    // 371:审核中 372:审核拒绝 373:出款中 374:提款成功 375:出款失败 376:异常订单 377:代付失败 378：挂起 379：已派单,380:代付三方出款中
    const data = ref<any>([371,372,373,374,375,376,377,378,379,380]);
    let d = data.value.map((item: any) => {
        return {
          label: i18n.global.t(`global.T0025_LIST[${item}]`),
          value: item+''
        };
      });
      // 是否需要添加全部
      if (isAll) {
        d.unshift({
          label: i18n.global.t('global.checkall'),
          value: allText
        });
      }
      data.value = d;

  // 转文字
  function toText(key: string) {
    const obj = data.value.find((item: any) => item.value == key);
    return obj ? obj.label : '-';
  }

  return {
    WithdrawalToText: toText,
    WithdrawalData: data
  };
}

/**
 * @export 代理类型 代理类型 T026.json
 * @param {boolean} [isAll=false] 是否需要全选，默认不全选
 * @param {string} [allText=''] 全选的值，默认是空字符串
 * @param {boolean} [isClsNum=true] 是否去掉返回的头个数据 默认是去掉
 * @return {*}
 */
export function agentType(isAll: boolean = false, allText: string = '', isClsNum: boolean = true) {
  const data = ref<any>([
    {
      label: i18n.global.t('routes.agent.official_agent'),
      value: 391
    },
    {
      label: i18n.global.t('routes.agent.general_agent'),
      value: 392
    }
    // ,
    // {
    //   label: i18n.global.t('routes.report_center_page.straight_off'),
    //   value: 393
    // }
  ]);

  if (isAll) {
    data.value.unshift({
      label: i18n.global.t('global.checkall'),
      value: ''
    });
  }
  // 转文字
  function toText(key: string) {
    const obj = data.value.find((item: any) => item.value == key);
    return obj ? obj.label : '-';
  }

  return {
    agentTypeToText: toText,
    agentTypeData: data
  };
}
/**
 * @export 代理类型 代理类型 T026.json
 * @param {boolean} [isAll=false] 是否需要全选，默认不全选
 * @param {string} [allText=''] 全选的值，默认是空字符串
 * @param {boolean} [isClsNum=true] 是否去掉返回的头个数据 默认是去掉
 * @return {*}
 */
export function useTimeType(isAll: boolean = false, allText: string = '', isClsNum: boolean = true) {
  const data = ref<any>([
    {
      label: i18n.global.t('global.time.bet_time'),
      value: '1'
    },
    {
      label: i18n.global.t('global.time.settle_time'),
      value: '2'
    },
    {
      label: i18n.global.t('global.time.game_time'),
      value:' 3'
    },
  ]);

  if (isAll) {
    data.value.unshift({
      label: i18n.global.t('global.checkall'),
      value: ''
    });
  }
  // 转文字
  function toText(key: string) {
    const obj = data.value.find((item: any) => item.value == key);
    return obj ? obj.label : '-';
  }

  return {
    timeTypeToText: toText,
    timeTypeOptions: data
  };
}
/**
 * @export 账变类型 t002.json
 * @param {boolean} [isAll=false] 是否需要全选，默认不全选
 * @param {string} [allText=''] 全选的值，默认是空字符串
 * @param {boolean} [isClsNum=true] 是否去掉返回的头个数据 默认是不去掉
 * @return {*}
 */
export function useAccountChangeList(isAll: boolean = false, allText: string = '') {
  const data = ref<any>([]);
  const lang = localStorage.getItem('language');
  console.log('lang :', lang);
  getAccountChangeTypes().then((res: any) => {
    if (res) {
      let d = res.data.map((item: any) => {
          return {
            label: lang==='zh-CN'?item.name:item.en_name,
            value: item.id
          };
        });
      // 是否需要添加全部
      if (isAll) {
        d.unshift({
          label: i18n.global.t('global.checkall'),
          value: allText
        });
      }
      data.value = d;
    }
  });

  // 转文字
  function toText(key: string) {
    const obj = data.value.find((item: any) => item.value == key);
    return obj ? obj.label : '-';
  }

  return {
    AccountChangeToText: toText,
    AccountChangeData: data
  };
}
