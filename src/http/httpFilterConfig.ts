interface ConfigItem {
  noErrTip: boolean;
  noLoading: boolean;
  errTxt?: string;
}

interface Config {
  [prop: string]: ConfigItem;
}

/**
 * 对不需要做请求，响应拦截处理的接口进行配置
 * 使用默认拦截处理的，则不需要在这里配置
 *
 * {
 *  noErrTip { Boolean }  是否禁用接口异常拦截
 *  errTxt { String } 接口失败默认提示信息
 * }
 */
const config: Config = {
  // 'member/deposit': { noErrTip: false, noLoading: false, errTxt: '存款失败' },
  'merchant/game/balance': { noErrTip: true, noLoading: true },
  // 'merchant/admin/list': { noErrTip: false, noLoading: true },
  'merchant/finance/withdraw/cardrecord': { noErrTip: false, noLoading: true },
  'merchant/finance/risks/list': { noErrTip: false, noLoading: true },
  'merchant/finance/risks/receives': { noErrTip: false, noLoading: true },
  'merchant/member/full': { noErrTip: false, noLoading: true },
  'merchant/area/view': { noErrTip: false, noLoading: true },
  'merchant/game/evo/detail': { noErrTip: false, noLoading: true }
};

export default config;
