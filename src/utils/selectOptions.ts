import i18n from '@/locales';
import { timerChange } from '@/components/serch-form/useShortcuts';
export interface Options {
  label: string;
  value: number | string;
}
export interface AjaxReturnOptions {
  id: string;
  name: string;
  level?: string;
}
// 设备
export const DeviceOptions = [
  {
    label: 'PC',
    value: 1
  },
  {
    label: 'H5',
    value: 2
  },
  {
    label: 'App',
    value: 4
  }
];
// 账号类型 1正式0测试2全部
export const AccountType = [
  {
    label: '全部',
    value: '2'
  },
  {
    label: '正式账号',
    value: '1'
  },
  {
    label: '测试账号',
    value: '0'
  }
];
// 流水类型
export const flowType = [
  {
    label: i18n.global.t('routes.risk.flow_type.0'),
    value: '0'
  },
  {
    label: i18n.global.t('routes.risk.flow_type.1'),
    value: '1'
  },
  {
    label: i18n.global.t('routes.risk.flow_type.2'),
    value: '2'
  },
  {
    label: i18n.global.t('routes.risk.flow_type.3'),
    value: '3'
  },
  {
    label: i18n.global.t('routes.risk.flow_type.4'),
    value: '4'
  },
  {
    label: i18n.global.t('routes.risk.flow_type.5'),
    value: '5'
  },
  {
    label: i18n.global.t('routes.risk.flow_type.6'),
    value: '6'
  },
  {
    label: i18n.global.t('routes.risk.flow_type.7'),
    value: '7'
  },
];

export const accountTypeToText = (text: any) => {
  const obj = AccountType.find((pl: any) => pl.value == text);
  if (obj) {
    return obj.label;
  } else {
    ('-');
  }
};
// 彩票投注记录 1正式0测试 全部为空
export const lotteryAccountType = [
  {
    label: '全部',
    value: ''
  },
  {
    label: '正式账号',
    value: '1'
  },
  {
    label: '测试账号',
    value: '0'
  },
];

// 注册来源
export const RegOriginOptions = [
  {
    label: 'PC',
    value: 1
  },
  {
    label: 'H5',
    value: 2
  },
  {
    label: 'IOS',
    value: 3
  },
  {
    label: 'Android',
    value: 4
  }
];
export const regOriginOptionsToText = (text: any) => {
  const obj = RegOriginOptions.find((pl: any) => pl.value == text);
  if (obj) {
    return obj.label;
  } else {
    ('-');
  }
};
// i18n.global.t('global.')
/**
 * @账变记录Options
 */
export const ChangesOptions: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: ''
  },
  // {
  //   label: '转入',
  //   value: '0'
  // },
  // {
  //   label: '转出',
  //   value: '1'
  // },
  {
    label: i18n.global.t('global.transfer'),
    value: '0,1'
  },
  {
    label: i18n.global.t('routes.tips.trans_in_failed_compensate'),
    value: '2'
  },
  {
    label: i18n.global.t('routes.tips.trans_out_failed_deduct'),
    value: '3'
  },
  {
    label: i18n.global.t('global.deposit'),
    value: '4'
  },
  {
    label: i18n.global.t('global.withdraw'),
    value: '5'
  },
  // {
  //   label: '后台上分',
  //   value: '6'
  // },
  // {
  //   label: '后台下分',
  //   value: '7'
  // },
  {
    label: i18n.global.t('global.back_up_down_score'),
    value: '6,7'
  },
  {
    label: i18n.global.t('global.back_down_score_back'),
    value: '8'
  },
  {
    label: i18n.global.t('global.bonus_distribute'),
    value: '9'
  },
  {
    label: i18n.global.t('global.return_water'),
    value: '161'
  }
];

/**
 * @状态
 */
export const StateOptions: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: ''
  },
  {
    label: i18n.global.t('global.filed'),
    value: '0'
  },
  {
    label: i18n.global.t('global.success'),
    value: '1'
  },
  {
    label: i18n.global.t('global.being_processed'),
    value: '2'
  },
  // {
  //   label: '脚本确认中',
  //   value: '3'
  // },
  {
    label: i18n.global.t('global.being_human_confirm'),
    value: '4'
  }
];
/**
 * @类型
 */
export const TarnsferOptions: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: ''
  },
  {
    label: i18n.global.t('global.trans_in_game'),
    value: '0'
  },
  {
    label: i18n.global.t('global.trans_out_game'),
    value: '1'
  },
  {
    label: i18n.global.t('global.trans_faild_back'),
    value: '2'
  }
];

// 状态(结算状态 0:下注确认(未结算) 1:结算 2:会员取消 3:无效)
export const WinningType: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: ''
  },
  {
    label: i18n.global.t('routes.operation_manage_page.nosettle'),
    value: '0'
  },
  {
    label: i18n.global.t('routes.vip_list_page.already_settle'),
    value: '1'
  },
  {
    label: i18n.global.t('global.cancel'),
    value: '2'
  },
  {
    label: i18n.global.t('routes.tips.foption4'),
    value: '3'
  }
];

export const AuditStateType: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: ''
  },
  {
    label: i18n.global.t('global.dreview'),
    value: '1'
  },
  {
    label: i18n.global.t('global.review_pass'),
    value: '2'
  },
  {
    label: i18n.global.t('global.review_nopass'),
    value: '3'
  }
];


export const TpvCellDrawingType: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: ''
  },
  {
    label: i18n.global.t('global.being_audit'),
    value: '1'
  },
  {
    label: i18n.global.t('global.being_out_money'),
    value: '2'
  },
  {
    label: i18n.global.t('global.withdraw_succ'),
    value: '3'
  },
  {
    label: i18n.global.t('global.audit_denied'),
    value: '4'
  },
  {
    label: i18n.global.t('global.withdraw_faild'),
    value: '5'
  },
  {
    label: i18n.global.t('global.exception_order'),
    value: '6'
  }
];

export const TpvCellDrawingCaiwuType: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: ''
  },
  {
    label: i18n.global.t('global.user_withdraw'),
    value: '1'
  }
];

export const groundwaterType: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: ''
  },
  {
    label: i18n.global.t('global.filed'),
    value: '1'
  },
  {
    label: i18n.global.t('global.success'),
    value: '2'
  },
  {
    label: i18n.global.t('global.wait_distribute'),
    value: '3'
  }
];

export const groundwaterStyleType: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: ''
  },
  {
    label: 'VIP',
    value: '1'
  },
  {
    label: i18n.global.t('routes.vip_list_page.groundwater_type1'),
    value: '2'
  },
  {
    label: i18n.global.t('routes.vip_list_page.groundwater_type2'),
    value: '3'
  }
];

/**
 * 标签管理>搜索标签类型
 */
export const labelType: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: ''
  },
  {
    label: i18n.global.t('global.agency_label'),
    value: 1
  },
  {
    label: i18n.global.t('global.general_label'),
    value: 2
  },
  {
    label: i18n.global.t('global.risk_label'),
    value: 3
  },
  {
    label: i18n.global.t('global.fin_label'),
    value: 4
  },
  {
    label: i18n.global.t('global.e_custoemr_service_label'),
    value: 5
  },
  {
    label: i18n.global.t('global.other_tag'),
    value: 6
  }
];
/**
 * 标签管理>添加标签类型
 */
export const labelAddType: Options[] = [
  {
    label: i18n.global.t('global.agency_label'),
    value: 1
  },
  {
    label: i18n.global.t('global.general_label'),
    value: 2
  },
  {
    label: i18n.global.t('global.risk_label'),
    value: 3
  },
  {
    label: i18n.global.t('global.fin_label'),
    value: 4
  },
  {
    label: i18n.global.t('global.e_custoemr_service_label'),
    value: 5
  },
  {
    label: i18n.global.t('global.other_tag'),
    value: 6
  }
];

// 标签管理>添加标签类型转文字
export function labelAddTypeToText(value: string) {
  const obj = labelAddType.find((pl: any) => pl.value == value);
  if (obj) {
    return obj.label;
  }
}
/**
 * 访问授权>添加方式
 */
export const addType: Options[] = [
  {
    label: i18n.global.t('routes.system.sigle_ip'),
    value: 1
  },
  {
    label: i18n.global.t('routes.system.ip_segment'),
    value: 2
  }
];

/**
 * 新增客户端限制类型
 */
export const clientLimitType: Options[] = [
  {
    label: i18n.global.t('global.fin_label'),
    value: 1
  },
  {
    label: i18n.global.t('global.distrust'),
    value: 2
  }
];

/**
 * 客户端限制新增客户端
 */
export const addClientType: Options[] = [
  {
    label: 'PC',
    value: 1
  },
  {
    label: 'H5',
    value: 2
  },
  {
    label: i18n.global.t('global.quanzhan_android'),
    value: 3
  },
  {
    label: i18n.global.t('global.quanzhan_ios'),
    value: 4
  },
  {
    label: i18n.global.t('global.sport_ios'),
    value: 5
  },
  {
    label: '安卓棋牌APP',
    value: 6
  },
  {
    label: 'IOS棋牌APP',
    value: 7
  },
  {
    label: '安卓代理',
    value: 8
  },
  {
    label: 'IOS代理',
    value: 9
  },
  {
    label: '代理WEB',
    value: 10
  }
];

/**
 * 广告管理，展示状态
 */
export const opperationType: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: ''
  },
  {
    label: i18n.global.t('routes.tips.dpush'),
    value: '1'
  },
  {
    label: i18n.global.t('routes.tips.start'),
    value: '2'
  },
  {
    label: i18n.global.t('routes.tips.stop'),
    value: '3'
  }
];

/**
 * 广告管理，展示状态
 */
export const promoListType: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: '0'
  },
  {
    label: i18n.global.t('routes.tips.stop_already'),
    value: '1'
  },
  {
    label: i18n.global.t('global.not_started'),
    value: '2'
  },
  {
    label: i18n.global.t('routes.operation_manage_page.ing'),
    value: '3'
  },
  {
    label: i18n.global.t('global.over'),
    value: '4'
  }
];

/**
 * 广告管理，展示状态
 */
export const stageType: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: 'app,sport'
  },
  {
    label: i18n.global.t('routes.tips.all_station'),
    value: 'app'
  },
  {
    label: i18n.global.t('routes.tips.sport'),
    value: 'sport'
  }
];
export const stageAddType: Options[] = [
  {
    label: i18n.global.t('routes.tips.limit_time_ad_pos'),
    value: 1
  }
];

/**
 * 广告管理，链接类型
 */
export const operationLinkType: Options[] = [
  {
    label: i18n.global.t('global.site_in'),
    value: '1'
  },
  {
    label: i18n.global.t('global.site_out'),
    value: '2'
  },
  {
    label: i18n.global.t('global.no_line'),
    value: '0'
  }
];

/**
 * 广告管理，时间类型"period":1, //活动周期 1=永久有效 2=在指定时间内有效
 */
export const operationTimeType: Options[] = [
  {
    label: i18n.global.t('global.valid_ever'),
    value: 1
  },
  {
    label: i18n.global.t('routes.operation_manage_page.specifie_t'),
    value: 2
  }
];
// 客服设置
export const operationServiceType: Options[] = [
  {
    label: i18n.global.t('global.valid_ever'),
    value: 1
  }
];
/**
 * 渠道:1, //活动周期 1=在指定时间内有效 2=永久有效
 */
export const qudaoType: Options[] = [
  {
    label: '全部',
    value: '0'
  },
  {
    label: i18n.global.t('routes.tips.zc'),
    value: '1'
  },
  {
    label: i18n.global.t('routes.tips.wjmm'),
    value: '2'
  },
  {
    label: i18n.global.t('routes.tips.xgmm'),
    value: '3'
  },
  {
    label: i18n.global.t('routes.tips.tx'),
    value: '4'
  },
  {
    label: i18n.global.t('routes.tips.xgsjh'),
    value: '5'
  }
];

/**
 * 活动，时间类型"period":1, //活动周期 1=在指定时间内有效 2=永久有效
 */
export const selectTimeType: Options[] = [
  {
    label: i18n.global.t('global.valid_ever'),
    value: 2
  },
  {
    label: i18n.global.t('routes.operation_manage_page.specifie_t'),
    value: 1
  }
];

// 活动的类型
export const operationTimeType2: Options[] = [
  {
    label: i18n.global.t('global.valid_ever'),
    value: 1
  },
  {
    label: i18n.global.t('routes.operation_manage_page.specifie_t'),
    value: 0
  }
];

/**
 * 轮播图广告，跳转类型
 */
export const carouselLinkType: Options[] = [
  {
    label: i18n.global.t('routes.operation_manage_page.specify_link'),
    value: '1'
  },
  {
    label: i18n.global.t('routes.operation_manage_page.platform_active'),
    value: '2'
  },
  {
    label: i18n.global.t('routes.operation_manage_page.specify_page'),
    value: '3'
  }
];
/**
 * web体育场馆广告 链接类型
 */
export const webLinkType: Options[] = [
  {
    label: i18n.global.t('routes.operation_manage_page.specify_link'),
    value: 1
  },
  {
    label: i18n.global.t('routes.operation_manage_page.platform_active'),
    value: 2
  }
];
/**
 * web体育场馆广告 活动类型
 */
export const webActiveType: Options[] = [
  {
    label: i18n.global.t('routes.tips.unselect_activity'),
    value: 1
  },
  {
    label: i18n.global.t('routes.tips.list'),
    value: 2
  }
];

/**
 * 站点广告位展示设备
 */
export const siteType: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: 'apph5,sport'
  },
  {
    label: i18n.global.t('routes.tips.all_apph5'),
    value: 'apph5'
  },
  {
    label: i18n.global.t('routes.tips.sport_app'),
    value: 'sport'
  }
];
/**
 * 黑名单银行卡类型筛选
 */
export const cardStatusType: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: ''
  },
  {
    label: i18n.global.t('routes.tips.member_del'),
    value: '1'
  },
  {
    label: i18n.global.t('routes.tips.back_add'),
    value: '2'
  }
];

/**
 * 活动管理 活动类型
 */
export const activityTypeForm: Options[] = [
  {
    label: i18n.global.t('routes.operation_manage_page.activity_one'),
    value: 'first'
  },
  {
    label: i18n.global.t('routes.operation_manage_page.activity_two'),
    value: 'pure-display'
  },
  // {
  //   label: i18n.global.t('routes.operation_manage_page.activity_invite'),
  //   value: 'invite'
  // },
  // {
  //   label: '竞猜活动',
  //   value: '4'
  // }
  {
    label: i18n.global.t('global.T006_LIST.45'),
    value: 'first-deposit'
  }
];

/**
 * 活动管理 活动类型
 */
export const activityType: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: ''
  },
  ...activityTypeForm
];

/**
 * 活动管理 活动分类
 */
export const activiType: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: '0'
  },
  {
    label: i18n.global.t('routes.tips.sport_promo'),
    value: '1'
  },
  {
    label: i18n.global.t('routes.tips.real_people_promo'),
    value: '2'
  },
  {
    label: i18n.global.t('routes.tips.esport_promo'),
    value: '3'
  },
  {
    label: i18n.global.t('routes.tips.lottery_promo'),
    value: '4'
  },
  {
    label: i18n.global.t('routes.tips.chess_promo'),
    value: '5'
  },
  {
    label: i18n.global.t('routes.tips.egame_promo'),
    value: '6'
  }
];
export const depositTypeForm: Options[] = [
  {
    label: i18n.global.t('global.no'),
    value: 1
  },
  {
    label: i18n.global.t('routes.tips.yes_need_human_audit'),
    value: 2
  }
];
/**
 * 活动管理 赠送形式
 */
export const depositType: Options[] = [
  {
    label: i18n.global.t('routes.operation_manage_page.money_proportion'),
    value: 86
  }
  // {
  //   label: '固定金额',
  //   value: 87
  // }
];
/**
 * 活动管理 赠送形式
 */
export const depositTypes: Options[] = [
  {
    label: i18n.global.t('routes.operation_manage_page.money_proportion'),
    value: 2
  },
  {
    label: i18n.global.t('routes.operation_manage_page.gd_money'),
    value: 1
  }
];
/**
 * 活动管理 存款起始时间
 */
export const depositTimes: Options[] = [
  {
    label: i18n.global.t('routes.tips.ssck'),
    value: 86
  },
  {
    label: i18n.global.t('routes.tips.ks'),
    value: 87
  }
];
/**
 * 活动管理 内容形式
 */
export const depositContentType: Options[] = [
  // {
  //   label: '弹窗',
  //   value: 422
  // },
  {
    label: i18n.global.t('routes.operation_manage_page.conventional'),
    value: 421
  }
];
/**
 * 邀请好友 派奖状态
 */
export const inviteType: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: ''
  },
  {
    label: i18n.global.t('routes.operation_manage_page.no_desipot'),
    value: '1'
  },
  {
    label: i18n.global.t('routes.operation_manage_page.no_fh'),
    value: '2'
  },
  {
    label: i18n.global.t('routes.operation_manage_page.fh_nosend'),
    value: '3'
  },
  {
    label: i18n.global.t('routes.operation_manage_page.already_send'),
    value: '4'
  },
  {
    label: i18n.global.t('routes.operation_manage_page.nosettle'),
    value: '5'
  },
  {
    label: i18n.global.t('routes.operation_manage_page.nodb'),
    value: '6'
  }
];
/**
 * 返水状态
 */
export const rebateType: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: ''
  },
  {
    label: i18n.global.t('global.review_pass'),
    value: '1'
  },
  {
    label: i18n.global.t('global.audit_no_pass'),
    value: '2'
  },
  {
    label: i18n.global.t('global.being_audit'),
    value: '0'
  }
];
/**
 * 每日签到，是否补签
 */
export const signType: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: '-1'
  },
  {
    label: i18n.global.t('global.normal'),
    value: '0'
  },
  {
    label: i18n.global.t('routes.operation_manage_page.b_sign'),
    value: '1'
  },
  {
    label: i18n.global.t('routes.operation_manage_page.d_sign'),
    value: '2'
  }
];
// 每日签到，是否补签转文字
export function signTypeToText(text: string) {
  const obj = signType.find((pl: any) => pl.value == text);
  if (obj) {
    return obj.label;
  }
}
/**
 * 每日签到，派奖状态
 */
export const signStatusType: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: '0'
  },
  {
    label: i18n.global.t('routes.tips.distriute_prize_succ'),
    value: '703'
  },
  {
    label: i18n.global.t('routes.tips.distriute_prize_failed'),
    value: '704'
  },
  {
    label: i18n.global.t('routes.operation_manage_page.nodb'),
    value: '701'
  },
  {
    label: i18n.global.t('routes.tips.invalid'),
    value: '705'
  },
  {
    label: i18n.global.t('routes.operation_manage_page.lq'),
    value: '706'
  },
  {
    label: i18n.global.t('routes.operation_manage_page.wait_gift'),
    value: '702'
  }
];
// 每日签到，派奖状态转文字
export function signStatusTypeTotext(value: number) {
  const obj = signStatusType.find((pl: any) => pl.value == value);
  if (obj) {
    return obj.label;
  }
}
/**
 * 每日签到，签到天数
 */
export const signDaysType: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: '0'
  },
  {
    label: '1',
    value: '1'
  },
  {
    label: '2',
    value: '2'
  },
  {
    label: '3',
    value: '3'
  },
  {
    label: '4',
    value: '4'
  },
  {
    label: '5',
    value: '5'
  },
  {
    label: '6',
    value: '6'
  },
  {
    label: '7',
    value: '7'
  }
];
/**
 * 每日签到，风控备注
 */
export const signRecType: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: ''
  },
  {
    label: i18n.global.t('routes.tips.same_device'),
    value: '1'
  }
];
/**
 * 签到奖励，审核状态
 */
export const reviewStatusType: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: '0'
  },
  {
    label: i18n.global.t('global.pass'),
    value: '402'
  },
  {
    label: i18n.global.t('global.no_pass'),
    value: '403'
  },
  {
    label: i18n.global.t('global.dreview'),
    value: '401'
  }
];
// 签到奖励，审核状态转文字
export function reviewStatusTypeTotext(value: number) {
  const obj = reviewStatusType.find((pl: any) => pl.value == value);
  if (obj) {
    return obj.label;
  }
}
/**
 * 签到规则，派奖方式
 */
export const ruleStyle: Options[] = [
  {
    label: i18n.global.t('routes.tips.front_manual_get'),
    value: 1
  },
  {
    label: i18n.global.t('routes.operation_manage_page.review_send'),
    value: 2
  }
];
/**
 * 签到规则，补签方式
 */
export const ruleWays: Options[] = [
  {
    label: i18n.global.t('routes.tips.auto_sign'),
    value: 1
  },
  {
    label: i18n.global.t('routes.tips.manual_sign'),
    value: 2
  }
];
/**
 * 渠道规则
 */
export const ruleWay: Options[] = [
  {
    label: i18n.global.t('routes.tips.wzdx'),
    value: 1
  },
  {
    label: i18n.global.t('routes.tips.yydx'),
    value: 2
  }
];
/**
 * 渠道规则
 */
export const jczt: Options[] = [
  {
    label: i18n.global.t('routes.tips.wcls_tg'),
    value: 2
  },
  {
    label: i18n.global.t('routes.tips.sdql'),
    value: 3
  }
];
export const rulesSpecial: Options[] = [
  {
    label: i18n.global.t('global.yes'),
    value: 1
  },
  {
    label: i18n.global.t('global.no'),
    value: 2
  }
];
/**
 * 发放红利
 */
export const bonusaOptions: Options[] = [
  {
    label: i18n.global.t('routes.operation_manage_page.center_wallent'),
    value: '1'
  },
  {
    label: i18n.global.t('routes.vip_list_page.plat_wallent'),
    value: '2'
  }
];
export const bonusaAllOptions: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: ''
  },
  ...bonusaOptions
];
export const bonuscOptions: Options[] = [
  {
    label: i18n.global.t('routes.tips.platform_bonus'),
    value: 1
  },
  {
    label: i18n.global.t('routes.tips.upgrade_bonus'),
    value: 2
  }
];
export const bonusfOptions: Options[] = [
  {
    label: i18n.global.t('routes.operation_manage_page.no_limit_water'),
    value: '1'
  },
  {
    label: i18n.global.t('routes.vip_list_page.water_tips3'),
    value: '2'
  },
  {
    label: i18n.global.t('routes.vip_list_page.water_tips2'),
    value: '3'
  }
];
export const bonushOptions: Options[] = [
  {
    label: i18n.global.t('global.yes'),
    value: '1'
  },
  {
    label: i18n.global.t('global.no'),
    value: '0'
  }
];
export const tempAllOptions: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: ''
  },
  ...bonushOptions
];
// 站内信通知 1 否 2 是
export const sysNotify: Options[] = [
  {
    label: i18n.global.t('global.yes'),
    value: '2'
  },
  {
    label: i18n.global.t('global.no'),
    value: '1'
  }
];
export const sysNotifyOptions: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: ''
  },
  ...sysNotify
];

export const bonusbjOptions: Options[] = [
  {
    label: i18n.global.t('routes.tips.venue_balance_limit'),
    value: 1
  },
  {
    label: i18n.global.t('routes.tips.unlimited_venue_balance'),
    value: 2
  }
];
/**
 * 系统站内信管理 功能模块
 */
export const systemManager: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: ''
  },
  {
    label: i18n.global.t('global.finance'),
    value: '2'
  },
  {
    label: i18n.global.t('global.activity_yy'),
    value: '3'
  },
  {
    label: i18n.global.t('global.vip_member'),
    value: '4'
  },
  {
    label: i18n.global.t('global.agency'),
    value: '5'
  }
];
export const contentBTemp: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: '0'
  },
  {
    label: i18n.global.t('routes.tips.other'),
    value: '1'
  }
];
/**
 * 站内消息
 */
export const stationdOptions: Options[] = [
  {
    label: i18n.global.t('global.has_link'),
    value: 1
  },
  {
    label: i18n.global.t('global.no_line'),
    value: 2
  }
];
export const stationaOptions: Options[] = [
  {
    label: '站内消息',
    value: 1
  },
  {
    label: '活动消息',
    value: 2
  }
];
export const vipNum: any = [
  { label: 'VIP1', value: 1 },
  { label: 'VIP2', value: 2 },
  { label: 'VIP3', value: 3 },
  { label: 'VIP4', value: 4 },
  { label: 'VIP5', value: 5 },
  { label: 'VIP6', value: 6 },
  { label: 'VIP7', value: 7 },
  { label: 'VIP8', value: 8 },
  { label: 'VIP9', value: 9 },
  { label: 'VIP10', value: 10 }
];
export const stationeOptions: Options[] = [
  {
    label: i18n.global.t('routes.tips.specified_member'),
    value: 2
  },
  {
    label: i18n.global.t('routes.tips.all_member'),
    value: 1
  }
];
export const otherOptions: Options[] = [
  {
    label: i18n.global.t('routes.tips.specified_member'),
    value: 0
  },
  {
    label: i18n.global.t('routes.tips.vipznx'),
    value: 1
  },
  {
    label: i18n.global.t('routes.agent.zs_xj'),
    value: 2
  },
  {
    label: i18n.global.t('routes.agent.sy_xj'),
    value: 3
  }
];
export const stationiOptions: Options[] = [
  {
    label: i18n.global.t('routes.tips.default_device'),
    value: 1
  },
  {
    label: i18n.global.t('routes.tips.zd_name'),
    value: 2
  }
];
export const stationjOptions: Options[] = [
  {
    label: i18n.global.t('routes.tips.no_ts'),
    value: 0
  },
  {
    label: i18n.global.t('routes.operation_manage_page.have_push'),
    value: 1
  }
];

export const systemeOptions: Options[] = [
  {
    label: i18n.global.t('global.yes'),
    value: '1'
  },
  {
    label: i18n.global.t('global.no'),
    value: '0'
  }
];
// 公告是否跳转转文字

export function systemTypeToText(value: string) {
  const obj = systemeOptions.find((pl: any) => pl.value == value);
  if (obj) {
    return obj.label;
  }
}
export const systemkOptions: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: '0'
  },
  {
    label: 'Android',
    value: '1'
  },
  {
    label: 'IOS',
    value: '2'
  }
];
/**
 * 竞猜， 竞猜主题
 */
export const quzioptinsA: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: ''
  },
  {
    label: i18n.global.t('routes.tips.football'),
    value: '1'
  },
  {
    label: i18n.global.t('routes.tips.basketball'),
    value: '2'
  },
  {
    label: i18n.global.t('routes.tips.esport'),
    value: '3'
  }
];

/**
 * 系统调整
 */
export const tzType: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: ''
  },
  {
    label: i18n.global.t('routes.vip_list_page.system_adjust'),
    value: '1'
  },
  {
    label: i18n.global.t('routes.vip_list_page.sy_adjust'),
    value: '2'
  },
  {
    label: i18n.global.t('routes.vip_list_page.sy_adjust2'),
    value: '3'
  }
];
export const tzMethod: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: ''
  },
  {
    label: i18n.global.t('routes.vip_list_page.up'),
    value: '251'
  },
  {
    label: i18n.global.t('routes.vip_list_page.down'),
    value: '252'
  }
];
export const statusAccound: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: ''
  },
  {
    label: i18n.global.t('global.success'),
    value: '1'
  },
  {
    label: i18n.global.t('global.no_pass'),
    value: '2'
  }
];
export const bonusAccound: Options[] = [
  {
    // 261 失败 262成功 263场馆上分处理中
    label: i18n.global.t('global.checkall'),
    value: ''
  },
  {
    label: i18n.global.t('routes.tips.distribute_failed'),
    value: '261'
  },
  {
    label: i18n.global.t('routes.tips.distribute_succ'),
    value: '262'
  },
  {
    label: i18n.global.t('routes.tips.being_up_score_venue'),
    value: '263'
  }
];
export const loginLogType: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: ''
  },
  {
    label: i18n.global.t('routes.tips.login_blacklist_ip'),
    value: '1'
  },
  {
    label: i18n.global.t('routes.tips.login_blacklist_device'),
    value: '2'
  },
  {
    label: i18n.global.t('routes.tips.login_normal'),
    value: '3'
  }
];

export const addflashType: Options[] = [
  {
    label: i18n.global.t('routes.tips.all_station'),
    value: 'sport,app'
  },
  {
    label: i18n.global.t('routes.tips.sport'),
    value: 'sport'
  }
];

/**
 * app轮播平台
 */
export const flashType: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: ''
  },
  ...addflashType
];
/**
 * 系统公告设备
 */
export const systemNotificationType: Options[] = [
  {
    label: i18n.global.t('global.quanzhan_ios'),
    value: '26'
  },
  {
    label: i18n.global.t('global.quanzhan_android'),
    value: '27'
  },
  {
    label: 'Web',
    value: '24'
  },
  {
    label: 'H5',
    value: '25'
  }
];

export function getsystemNotificationTypeText(device: string) {
  if (!device) return '-';
  const arr = device.split(',');
  if (device && arr.length <= 5) {
    const deviceArr = device.split(',').filter(it => it);
    let str: any = [];
    deviceArr.forEach((item: any) => {
      const obj: any = systemNotificationType.find((pl: any) => pl.value == item) || {};
      str.push(obj.label);
    });
    return str.join(',');
  } else {
    return device || '-';
  }
}
/**
 * 轮播图，轮播设备
 */
export const carouseType: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: ''
  },
  {
    label: 'WEB',
    value: 'web'
  },
  {
    label: i18n.global.t('routes.tips.all_apph5'),
    value: 'apph5'
  },
  {
    label: i18n.global.t('routes.tips.sport_app'),
    value: 'sport'
  },
  {
    label: i18n.global.t('routes.tips.agent_app'),
    value: 'agent'
  }
];
export const carouseAddType: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: 'carousel'
  },
  {
    label: 'WEB',
    value: 'web'
  },
  {
    label: i18n.global.t('routes.tips.all_apph5'),
    value: 'apph5'
  },
  {
    label: i18n.global.t('routes.tips.sport_app'),
    value: 'sport'
  },
  {
    label: i18n.global.t('routes.tips.agent_app'),
    value: 'agent'
  }
];
export const diveceTo: Options[] = [
  {
    label: 'WEB',
    value: 'web'
  },
  {
    label: i18n.global.t('routes.tips.all_apph5'),
    value: 'apph5'
  },
  {
    label: i18n.global.t('routes.tips.sport_app'),
    value: 'sport'
  },
  {
    label: i18n.global.t('routes.tips.agent_app'),
    value: 'agent'
  }
];
// 设备转文字
export function deviceToText(text: string) {
  const obj = carouseAddType.find((pl: any) => pl.value == text);
  if (obj) {
    return obj.label;
  }
}
export function deviceFlashToText(text: string) {
  const obj = addflashType.find((pl: any) => pl.value == text);
  if (obj) {
    return obj.label;
  }
}
/**
 * 站点广告 轮播设备
 */
export const siteCarouseType: Options[] = [
  {
    label: i18n.global.t('routes.tips.all_apph5'),
    value: 'apph5'
  },
  {
    label: i18n.global.t('routes.tips.sport_app'),
    value: 'sport'
  }
];
// 站点广告转文字
export function siteCarouseTypeToText(text: string) {
  const textArr = text.split(',');
  let t: any = [];
  textArr.forEach((item: any) => {
    const obj = siteCarouseType.find((pl: any) => pl.value == item);
    if (obj) {
      t.push(obj.label);
    }
  });
  return t.join('/');
}
export const siteCarouseAllType: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: ''
  },
  ...siteCarouseType
];
/**
 * 红利管理，审核状态
 */
export const redReviewType: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: '0'
  },
  {
    label: i18n.global.t('global.being_audit'),
    value: '1'
  },
  {
    label: i18n.global.t('global.review_pass'),
    value: '2'
  },
  {
    label: i18n.global.t('global.audit_no_pass'),
    value: '3'
  }
];
export const vipRedReviewType: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: '0'
  },
  {
    label: i18n.global.t('global.being_processed'),
    value: '1'
  },
  {
    label: i18n.global.t('routes.tips.distribute_succ'),
    value: '2'
  },
  {
    label: i18n.global.t('routes.tips.distribute_failed'),
    value: '3'
  }
];
/**
 * 红利管理，红利类型
 */
export const redFormType: Options[] = [
  {
    label: i18n.global.t('routes.tips.platform_bonus'),
    value: '1'
  },
  {
    label: i18n.global.t('routes.tips.upgrade_bonus'),
    value: '2'
  },
  {
    label: i18n.global.t('routes.tips.birth_bonus'),
    value: '3'
  },
  {
    label: i18n.global.t('routes.tips.monthly_bonus'),
    value: '4'
  },
  {
    label: i18n.global.t('routes.tips.red_envelop_bonus'),
    value: '5'
  },
  {
    label: i18n.global.t('routes.tips.maintain_compensate'),
    value: '6'
  },
  {
    label: i18n.global.t('routes.operation_manage_page.save_money'),
    value: '7'
  },
  {
    label: i18n.global.t('routes.tips.active_bonus'),
    value: '8'
  },
  {
    label: i18n.global.t('routes.tips.recommend_bonus'),
    value: '9'
  },
  {
    label: i18n.global.t('routes.tips.bonus_adjust'),
    value: '10'
  },
  {
    label: i18n.global.t('routes.tips.clean_negative'),
    value: '11'
  }
];
/**
 * 记录管理，账户调整状态
 */
export const accountState: Options[] = [
  {
    // 状态:256=审核中,257=审核通过,258=审核未通过
    label: i18n.global.t('global.checkall'),
    value: ''
  },
  {
    label: i18n.global.t('global.review_pass'),
    value: '257'
  },
  {
    label: i18n.global.t('global.review_nopass'),
    value: '258'
  }
];
export const contentTempType: Options[] = [
  {
    label: i18n.global.t('routes.tips.system_notice'),
    value: 1
  },
  {
    label: i18n.global.t('routes.tips.messages_station'),
    value: 2
  },
  {
    label: i18n.global.t('routes.tips.agency_announcement'),
    value: 3
  },
  {
    label: i18n.global.t('routes.tips.broker_message'),
    value: 4
  }
];
export const tempContentAllType: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: ''
  },
  ...contentTempType
];
// 模板类型转文字
export function contentTypeToText(value: string) {
  const obj = contentTempType.find((pl: any) => pl.value == value);
  if (obj) {
    return obj.label;
  }
}

// 会员等级记录转文字
export const vipRecord: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: ''
  },
  {
    label: i18n.global.t('routes.tips.upgrade_level'),
    value: '201'
  },
  {
    label: i18n.global.t('routes.tips.keep_level'),
    value: '202'
  },
  {
    label: i18n.global.t('routes.tips.downgrade_leve'),
    value: '203'
  }
];
// 流水限制转文字
export function WaterLimitTotext(value: number) {
  if (value && !isNaN(Number(value))) {
    if (Number(value) === 1) {
      return i18n.global.t('routes.tips.no_flow_limit');
    } else if (Number(value) === 2) {
      return i18n.global.t('routes.tips.need_flow_limit');
    } else {
      return '-';
    }
  }
}

// 发放类型转文字
export function BatchTotext(value: number) {
  if (value && !isNaN(Number(value))) {
    if (Number(value) === 1) {
      return i18n.global.t('routes.tips.distribute_single_member');
    } else if (Number(value) === 2) {
      return i18n.global.t('routes.tips.distribute_patch_members');
    } else {
      return '-';
    }
  }
}

// 状态转文字
export function StateTotext(value: number) {
  if (value && !isNaN(Number(value))) {
    if (Number(value) === 0) {
      return i18n.global.t('global.checkall');
    } else if (Number(value) === 1) {
      return i18n.global.t('global.being_processed') + '  ';
    } else if (Number(value) === 2) {
      return i18n.global.t('routes.tips.distribute_succ');
    } else if (Number(value) === 3) {
      return i18n.global.t('routes.tips.distribute_failed');
    } else {
      return '-';
    }
  }
}
export const appUpdate: Options[] = [
  {
    label: 'ios',
    value: 'ios'
  }
];
export const appUpdateAndroid: Options[] = [
  {
    label: '安卓',
    value: 'android'
  }
];
export const isForce: Options[] = [
  {
    label: i18n.global.t('global.yes'),
    value: 1
  },
  {
    label: i18n.global.t('global.no'),
    value: 0
  }
];
export const auditType: Options[] = [
  {
    label: 'asdfas',
    value: 1
  },
  {
    label: 'asdafd',
    value: 0
  }
];
export const reviewFalseType: Options[] = [
  {
    label: i18n.global.t('routes.tips.bank_account_not_same_user'),
    value: '1'
  },
  {
    label: i18n.global.t('routes.tips.flow_inconformity'),
    value: '2'
  },
  {
    label: i18n.global.t('routes.tips.backwater_flow_inconformity'),
    value: '3'
  },
  {
    label: i18n.global.t('routes.tips.malignity_gen_flow'),
    value: '4'
  },
  {
    label: i18n.global.t('routes.tips.other'),
    value: '4'
  }
];
export const replayType: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: '1'
  },
  {
    label: i18n.global.t('routes.tips.bankcard_transer'),
    value: '2'
  },
  {
    label: i18n.global.t('routes.tips.wechat_transer'),
    value: '3'
  }
];
// 状态转文字
export function replayTypeTotext(value: number) {
  const obj = replayType.find((pl: any) => pl.value == value);
  if (obj) {
    return obj.label;
  }
}
export const openorderType: Options[] = [
  {
    label: i18n.global.t('global.being_processed'),
    value: '1'
  },
  {
    label: i18n.global.t('routes.finance_manage_page.bding'),
    value: '2'
  },
  {
    label: i18n.global.t('routes.finance_manage_page.bd_suc'),
    value: '3'
  },
  {
    label: i18n.global.t('routes.finance_manage_page.desipot_error'),
    value: '4'
  }
];
export const lockingType: Options[] = [
  {
    label: i18n.global.t('global.enable'),
    value: 2
  },
  {
    label: i18n.global.t('global.close_use'),
    value: 3
  }
];
export const qdtype: Options[] = [
  {
    label: i18n.global.t('routes.tips.channel_list'),
    value: '1'
  },
  {
    label: '渠道1',
    value: '2'
  }
];
export const withdrawalOption: Options[] = [
  {
    label: i18n.global.t('routes.tips.pay_for_another_manual'),
    value: '1'
  },
  {
    label: i18n.global.t('routes.finance_manage_page.people_payer'),
    value: '2'
  }
];

export const prizeTypeData: Options[] = [
  {
    // 45首存豪礼、46有效投注豪礼、47人工录单
    label: i18n.global.t('routes.operation_manage_page.first_gift'),
    value: '45'
  },
  {
    label: i18n.global.t('routes.operation_manage_page.valid_type'),
    value: '46'
  },
  {
    label: i18n.global.t('routes.operation_manage_page.personal_order'),
    value: '47'
  }
];
export const prizeTypeOptions: Options[] = [
  {
    // 1实物奖品 2虚拟奖品
    label: i18n.global.t('routes.operation_manage_page.sw_gift'),
    value: '1'
  },
  {
    label: i18n.global.t('routes.operation_manage_page.xn_gift'),
    value: '2'
  }
];
export const sTypeOptions: Options[] = [
  {
    // 1实物奖品 2虚拟奖品
    label: i18n.global.t('routes.operation_manage_page.active_list'),
    value: '1'
  }
];
export const prizeName: Options[] = [
  {
    label: i18n.global.t('routes.tips.activity_prize'),
    value: '1'
  },
  {
    label: i18n.global.t('routes.tips.customize'),
    value: '2'
  }
];
export const prizeListData: Options[] = [
  {
    label: i18n.global.t('routes.tips.activity_prize_list'),
    value: '1'
  },
  {
    label: i18n.global.t('routes.tips.activity_prize_list'),
    value: '2'
  }
];
export const vipWidthType: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: ''
  },
  {
    // 156用户提款 165代客提款 167代理提款
    label: i18n.global.t('global.user_withdraw'),
    value: '156'
  },
  {
    label: i18n.global.t('routes.tips.withdraw_for_customer'),
    value: '165'
  },
  {
    label: i18n.global.t('routes.tips.widtdraw_for_agent'),
    value: '167'
  }
];
// 状态转文字
export function vipWidthTypeTotext(value: number) {
  const obj = vipWidthType.find((pl: any) => pl.value == value);
  if (obj) {
    return obj.label;
  }
}

export const pendingType: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: ''
  },
  {
    // 12345
    label: i18n.global.t('routes.risk.rio_no'),
    value: '1'
  },
  {
    label: i18n.global.t('routes.risk.tl_username'),
    value: '2'
  },
  {
    label: i18n.global.t('routes.risk.more_count'),
    value: '3'
  },
  {
    label: i18n.global.t('routes.risk.bankcard_no'),
    value: '4'
  },
  {
    label: i18n.global.t('routes.tips.other'),
    value: '5'
  }
];
// 挂起原因转文字
export function pendingTypeTotext(value: number) {
  const obj = pendingType.find((pl: any) => pl.value == value);
  if (obj) {
    return obj.label;
  }
}
export const agentType: Options[] = [
  {
    label: i18n.global.t('routes.agent.official_agent'),
    value: 391
  },
  {
    label: i18n.global.t('routes.agent.general_agent'),
    value: 392
  },
  {
    label: i18n.global.t('routes.report_center_page.straight_off'),
    value: 393
  }
];
export const agentTypeSearch: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: ''
  },
  ...agentType
];
export const h5_option: Options[] = [
  {
    label: i18n.global.t('routes.tips.register_h5'),
    value: '2'
  },
  {
    label: i18n.global.t('routes.tips.download_qz_app'),
    value: '1'
  },
  {
    label: '无',
    value: '0'
  }
];
// h5_option转文字
export function h5_optionTotext(value: number) {
  const obj = h5_option.find((pl: any) => pl.value == value);
  if (obj) {
    return obj.label;
  }
}
export const web_option: Options[] = [
  {
    label: i18n.global.t('routes.tips.register_web'),
    value: '2'
  },
  {
    label: i18n.global.t('routes.tips.download_qz_sport_app'),
    value: '1'
  },
  {
    label: '无',
    value: '0'
  }
];
// web_option转文字
export function web_optionTotext(value: number) {
  const obj = web_option.find((pl: any) => pl.value == value);
  if (obj) {
    return obj.label;
  }
}
// 代理状态
export const agentStateType: Options[] = [
  {
    label: i18n.global.t('routes.agent.enable'),
    value: '1'
  },
  {
    label: i18n.global.t('routes.agent.disable'),
    value: '2'
  }
  // {
  //   label: i18n.global.t('routes.agent.cancel_agentz'),
  //   value: '3'
  // }
];
export const agentStateTypeAll: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: ''
  },
  ...agentStateType
];
// 代理状态转文字
export function agentStateTypeTotext(value: number) {
  const obj = agentStateType.find((pl: any) => pl.value == value);
  if (obj) {
    return obj.label;
  }
}
// 代理提款管理
export const agentReviewState: Options[] = [
  {
    label: i18n.global.t('global.dreview'),
    value: '371'
  },
  {
    label: i18n.global.t('global.being_out_money'),
    value: '373'
  },
  {
    label: i18n.global.t('routes.agent.pay_fail'),
    value: '377'
  }
];
// 代理管理订单状态
export const agentOrderStateType: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: ''
  },
  ...agentReviewState
];
// 代理提款管理状态转文字
export function agentOrderStateTypeTotext(value: number) {
  const obj = agentOrderStateType.find((pl: any) => pl.value == value);
  if (obj) {
    return obj.label;
  }
}
// 热门赛事广告状态
export const hotOperationType: Options[] = [
  {
    label: i18n.global.t('global.stop'),
    value: '0'
  },
  {
    label: i18n.global.t('global.enable'),
    value: '1'
  }
];
export const hotOperationTypeSearch: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: ''
  },
  ...hotOperationType
];
// 热门赛事广告状态转文字
export function hotOperationTotext(value: number) {
  const obj = hotOperationType.find((pl: any) => pl.value == value);
  if (obj) {
    return obj.label;
  }
}
// 推广域名终端1=PC,2=H5,3=ALL
export const promoteType: Options[] = [
  {
    label: 'PC',
    value: '1'
  },
  {
    label: 'H5',
    value: '2'
  },
  {
    label: 'ALL',
    value: '3'
  }
];
// 推广域名终端转文字
export function promoteTypeTotext(value: number) {
  const obj = promoteType.find((pl: any) => pl.value == value);
  if (obj) {
    return obj.label;
  }
}
// 站内信是否常用模板
export const sysTemplate: Options[] = [
  {
    label: i18n.global.t('global.yes'),
    value: '1'
  },
  {
    label: i18n.global.t('global.no'),
    value: '2'
  }
];
// 新增代理
export const addagentType: Options[] = [
  {
    label: i18n.global.t('routes.agent.official_agent'),
    value: 391
  },
  {
    label: i18n.global.t('routes.agent.general_agent'),
    value: 392
  }
];
// 新增代理搜索
export const addagentTypeALL: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: ''
  },
  ...addagentType
];
// 佣金钱包账变类型
export const wallentChangeType: Options[] = [
  {
    label: i18n.global.t('global.change_pay'),
    value: '561'
  },
  {
    label: i18n.global.t('routes.tips.widtdraw_for_agent'),
    value: '562'
  },
  {
    label: i18n.global.t('global.change_fail'),
    value: '563'
  }
];
export const wallentChangeTypeAll: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: ''
  },
  ...wallentChangeType
];
// 佣金钱包账变类型转文字
export function wallentChangeTypeTotext(value: number) {
  const obj = wallentChangeType.find((pl: any) => pl.value == value);
  if (obj) {
    return obj.label;
  }
}
// 日志管理-登录日志-类型
export const loginType: Options[] = [
  {
    label: i18n.global.t('routes.system.login_in'),
    value: '1'
  },
  {
    label: i18n.global.t('routes.system.login_out'),
    value: '2'
  }
];
export const loginTypeAll: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: '0'
  },
  ...loginType
];
export function loginTypeTotext(value: number) {
  const obj = loginType.find((pl: any) => pl.value == value);
  if (obj) {
    return obj.label;
  }
}
// 未投注时长
export const noBetTime: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: '0'
  },
  {
    label: '1',
    value: '1'
  },
  {
    label: '3',
    value: '3'
  },
  {
    label: '7',
    value: '7'
  },
  {
    label: '15',
    value: '15'
  },
  {
    label: '30',
    value: '30'
  },
  {
    label: '60',
    value: '60'
  }
];
//未登录时长
export const noLoginTime: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: '0'
  },
  {
    label: '1',
    value: '1'
  },
  {
    label: '3',
    value: '3'
  },
  {
    label: '7',
    value: '7'
  },
  {
    label: '15',
    value: '15'
  },
  {
    label: '30',
    value: '30'
  },
  {
    label: '60',
    value: '60'
  }
];
//未存款时长
export const noDepositTime: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: ''
  },
  {
    label: '1',
    value: '1'
  },
  {
    label: '3',
    value: '3'
  },
  {
    label: '7',
    value: '7'
  },
  {
    label: '15',
    value: '15'
  },
  {
    label: '30',
    value: '30'
  },
  {
    label: '60',
    value: '60'
  }
];
//返水类型
export const rebate_type: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: ''
  },
  {
    label: i18n.global.t('global.TOO2_lIST.161'),
    value: '161'
  },
  {
    label: i18n.global.t('global.TOO2_lIST.642'),
    value: '642'
  },
  {
    label: i18n.global.t('global.TOO2_lIST.643'),
    value: '643'
  },
  {
    label: i18n.global.t('global.TOO2_lIST.644'),
    value: '644'
  },
  {
    label: i18n.global.t('global.TOO2_lIST.645'),
    value: '645'
  },
  {
    label: i18n.global.t('global.TOO2_lIST.646'),
    value: '646'
  },
  {
    label: i18n.global.t('global.TOO2_lIST.647'),
    value: '647'
  },
  {
    label: i18n.global.t('global.TOO2_lIST.648'),
    value: '648'
  },
  {
    label: i18n.global.t('global.TOO2_lIST.649'),
    value: '649'
  },
  {
    label: i18n.global.t('global.TOO2_lIST.656'),
    value: '656'
  }
];
//返水类型
export const rebate_type1: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: ''
  },
  {
    label: i18n.global.t('global.TOO2_lIST.170'),
    value: '170'
  },
  {
    label: i18n.global.t('global.TOO2_lIST.642'),
    value: '642'
  },
  {
    label: i18n.global.t('global.TOO2_lIST.643'),
    value: '643'
  },
  {
    label: i18n.global.t('global.TOO2_lIST.644'),
    value: '644'
  },
  {
    label: i18n.global.t('global.TOO2_lIST.645'),
    value: '645'
  },
  {
    label: i18n.global.t('global.TOO2_lIST.646'),
    value: '646'
  },
  {
    label: i18n.global.t('global.TOO2_lIST.647'),
    value: '647'
  },
  {
    label: i18n.global.t('global.TOO2_lIST.648'),
    value: '648'
  },
  {
    label: i18n.global.t('global.TOO2_lIST.649'),
    value: '649'
  },
  {
    label: i18n.global.t('global.TOO2_lIST.656'),
    value: '656'
  },
  {
    label: i18n.global.t('global.TOO2_lIST.650'),
    value: '650'
  },
  {
    label: i18n.global.t('global.TOO2_lIST.655'),
    value: '655'
  }
];
//返水类型
export const list: Options[] = [
  {
    label: '全部',
    value: ''
  },
  {
    label: 'CG彩票',
    value: '8840968486572375835'
  },
  {
    label: 'AE SEXY真人',
    value: '75445461569712187'
  },
  {
    label: 'AE SEVEN真人',
    value: '127409505760007'
  },
  {
    label: 'DG真人',
    value: '39636407564188'
  },
  {
    label: 'WM真人',
    value: '1055235995899664907'
  },
  {
    label: 'EVO真人',
    value: '2306856765348772637'
  },
  {
    label: 'SA真人',
    value: '36579683428691'
  },
  // {
  //   label: "AG真人",
  //   value: "2658175169982643138",
  // },
  {
    label: 'SABA体育',
    value: '362857114342923387'
  },
  {
    label: 'SBO体育',
    value: '437956722483179563'
  },
  {
    label: 'IM体育',
    value: '16564048178345'
  },
  // {
  //   label: "FB体育",
  //   value: "16564045359195",
  // },
  {
    label: 'DIGMAAN斗鸡',
    value: '343128988882927'
  },
  {
    label: 'WS168斗鸡',
    value: '16754997519210'
  },
  {
    label: 'KINGMAKER棋牌',
    value: '41465988833800'
  },
  {
    label: 'V8棋牌',
    value: '7927534376372523583'
  },
  {
    label: 'PG电子',
    value: '6861705028422769039'
  },
  {
    label: 'AE电子',
    value: '42514964534467'
  },
  {
    label: 'MG电子',
    value: '43495319576432'
  },
  {
    label: 'CQ9电子',
    value: '8318022162827355323'
  },
  {
    label: 'JILI电子',
    value: '16595015200257'
  },
  {
    label: 'JDB电子',
    value: '46814147030478'
  },
  {
    label: 'JILI捕鱼',
    value: '16595015877855'
  },
  {
    label: 'JDB捕鱼',
    value: '44196810703047'
  },
  {
    label: 'CQ9捕鱼',
    value: '7426646715018523638'
  },
  {
    label: 'IM电竞',
    value: '16564048344271'
  },
  {
    label: 'SABA电竞',
    value: '45228933360695'
  },
  {
    label: 'SPRIBE小游戏',
    value: '46814147030678'
  }
  // {
  //   label: "泛亚电竞",
  //   value: "5053897100933741162",
  // }
];
// 彩种设置-类型
export const lotterySetType: Options[] = [
  {
    label: i18n.global.t('routes.agent.gf_cp'),
    value: '1'
  },
  {
    label: i18n.global.t('routes.agent.gp_cp'),
    value: '2'
  }
];
// 彩种设置-类型转文字
export function lotterySetTypeTotext(value: number) {
  const obj = lotterySetType.find((pl: any) => pl.value == value);
  if (obj) {
    return obj.label;
  }
}
// 新增总代类型
export const agencyAddType: Options[] = [
  {
    label: i18n.global.t('routes.agent.td'),
    value: '391'
  },
  {
    label: i18n.global.t('routes.agent.general_agent'),
    value: '393'
  }
];
// 新增总代
export const testerType: Options[] = [
  {
    label: i18n.global.t('routes.agent.zs'),
    value: '1'
  },
  {
    label: i18n.global.t('routes.agent.cs'),
    value: '0'
  }
];
// 彩种设置-类型转文字
export function agencyAddTypeTotext(value: number) {
  const obj = agencyAddType.find((pl: any) => pl.value == value);
  if (obj) {
    return obj.label;
  }
}
// 团队转代-审核状态
// 新增总代类型
export const teamStatus: Options[] = [
  {
    label: i18n.global.t('global.review_pass'),
    value: '2'
  },
  {
    label: i18n.global.t('global.review_resolve'),
    value: '3'
  },
  {
    label: i18n.global.t('global.deletesuc'),
    value: '4'
  },
  {
    label: i18n.global.t('routes.tips.yzx'),
    value: '5'
  }
];
// 彩种设置-类型转文字
export function teamStatusTotext(value: number) {
  const obj = teamStatus.find((pl: any) => pl.value == value);
  if (obj) {
    return obj.label;
  }
}
// 是否置顶
export const isTop: Options[] = [
  {
    label: i18n.global.t('global.yes'),
    value: '1'
  },
  {
    label: i18n.global.t('global.no'),
    value: '0'
  }
];
// 稽查状态
export const sq_zt: Options[] = [
  {
    label: '待领取',
    value: '1'
  },
  {
    label: i18n.global.t(`routes.operation_manage_page.lq`),
    value: '2'
  },
  {
    label: i18n.global.t(`routes.tips.ygq`),
    value: '5'
  }
];
// 稽查状态
export const sqzt: Options[] = [
  {
    label: '待领取',
    value: '1'
  },
  {
    label: i18n.global.t(`routes.operation_manage_page.lq`),
    value: '2'
  },
  {
    label: i18n.global.t(`routes.risk.review_refuse`),
    value: '3'
  },
  {
    label: '已撤销',
    value: '4'
  },
  {
    label: i18n.global.t(`routes.tips.ygq`),
    value: '5'
  }
];

// 系统管理-日志管理-系统日志模块
export const rzmk: Options[] = [
  {
    label: '活动管理',
    value: 'promo'
  },
  {
    label: '财务管理',
    value: 'finance'
  },
  {
    label: '风控管理',
    value: 'risk'
  },
  {
    label: '会员管理',
    value: 'member'
  },
  {
    label: '运营管理',
    value: 'operation'
  },
  {
    label: '站点管理',
    value: 'site'
  },
  {
    label: '代理管理',
    value: 'agency'
  },
  {
    label: '彩票管理',
    value: 'cp'
  },
  {
    label: '系统管理',
    value: 'system'
  },
  {
    label: '场馆管理',
    value: 'plat'
  },
  {
    label: '银行卡管理',
    value: 'bankcard'
  },
  {
    label: '数字钱包管理',
    value: 'wallet'
  },
  {
    label: '账户调整',
    value: 'adjust'
  },
  {
    label: '存款管理',
    value: 'deposit'
  },
  {
    label: '提款管理',
    value: 'withdraw'
  },
  {
    label: 'ip白名单',
    value: 'whitelist'
  },
  {
    label: '登录管理',
    value: 'login'
  },
  {
    label: '通道管理',
    value: 'channel'
  }
];

// krf
//
export const winLoseType: Options[] = [
  {
    label: i18n.global.t(`routes.operation_manage_page.ying`),
    value: '1'
  },
  {
    label: i18n.global.t(`routes.operation_manage_page.shu`),
    value: '2'
  }
];

//
export const pkType: Options[] = [
  {
    label: i18n.global.t(`routes.operation_manage_page.xgp`),
    value: '香港盘'
  },
  {
    label: i18n.global.t(`routes.operation_manage_page.ydp`),
    value: '印尼盘'
  },
  {
    label: i18n.global.t(`routes.operation_manage_page.mlp`),
    value: '马来盘'
  },
  {
    label: i18n.global.t(`routes.operation_manage_page.ozp`),
    value: '欧洲盘'
  },
  {
    label: i18n.global.t(`routes.operation_manage_page.mgp`),
    value: '美国盘'
  },
  {
    label: i18n.global.t(`routes.operation_manage_page.o_p`),
    value: '特殊盘口'
  }
];

//
export const tzwfType: Options[] = [
  {
    label: i18n.global.t(`routes.operation_manage_page.qc`) + '-' + i18n.global.t(`routes.operation_manage_page.dy`),
    value: '全场-独赢'
  },
  {
    label: i18n.global.t(`routes.operation_manage_page.qc`) + '-' + i18n.global.t(`routes.operation_manage_page.bd`),
    value: '全场-波胆'
  },
  {
    label: i18n.global.t(`routes.operation_manage_page.qc`) + '-' + i18n.global.t(`routes.operation_manage_page.dxq`),
    value: '全场-大小球'
  },
  {
    label: i18n.global.t(`routes.operation_manage_page.qc`) + '-' + i18n.global.t(`routes.operation_manage_page.rq`),
    value: '全场-让球'
  },
  {
    label: i18n.global.t(`routes.operation_manage_page.qc`) + '-' + i18n.global.t(`routes.operation_manage_page.dxyf`),
    value: '全场-得下一分'
  },
  {
    label: i18n.global.t(`routes.operation_manage_page.sbc`) + '-' + i18n.global.t(`routes.operation_manage_page.dy`),
    value: '上半场-独赢'
  },
  {
    label: i18n.global.t(`routes.operation_manage_page.sbc`) + '-' + i18n.global.t(`routes.operation_manage_page.bd`),
    value: '上半场-波胆'
  },
  {
    label: i18n.global.t(`routes.operation_manage_page.sbc`) + '-' + i18n.global.t(`routes.operation_manage_page.dxq`),
    value: '上半场-大小球'
  },
  {
    label: i18n.global.t(`routes.operation_manage_page.sbc`) + '-' + i18n.global.t(`routes.operation_manage_page.rq`),
    value: '上半场-让球'
  },
  {
    label: i18n.global.t(`routes.operation_manage_page.sbc`) + '-' + i18n.global.t(`routes.operation_manage_page.dxyf`),
    value: '上半场-得下一分'
  },
  {
    label: i18n.global.t(`routes.operation_manage_page.zpsbc`) + '-' + i18n.global.t(`routes.operation_manage_page.dy`),
    value: '早盘上半场-独赢'
  },
  {
    label: i18n.global.t(`routes.operation_manage_page.zpsbc`) + '-' + i18n.global.t(`routes.operation_manage_page.bd`),
    value: '早盘上半场-波胆'
  },
  {
    label: i18n.global.t(`routes.operation_manage_page.zpsbc`) + '-' + i18n.global.t(`routes.operation_manage_page.dxq`),
    value: '早盘上半场-大小球'
  },
  {
    label: i18n.global.t(`routes.operation_manage_page.zpsbc`) + '-' + i18n.global.t(`routes.operation_manage_page.rq`),
    value: '早盘上半场-让球'
  },
  {
    label: i18n.global.t(`routes.operation_manage_page.zpsbc`) + '-' + i18n.global.t(`routes.operation_manage_page.dxyf`),
    value: '早盘上半场-得下一分'
  },
  {
    label: i18n.global.t(`routes.operation_manage_page.zpqc`) + '-' + i18n.global.t(`routes.operation_manage_page.dy`),
    value: '早盘全场-独赢'
  },
  {
    label: i18n.global.t(`routes.operation_manage_page.zpqc`) + '-' + i18n.global.t(`routes.operation_manage_page.bd`),
    value: '早盘全场-波胆'
  },
  {
    label: i18n.global.t(`routes.operation_manage_page.zpqc`) + '-' + i18n.global.t(`routes.operation_manage_page.dxq`),
    value: '早盘全场-大小球'
  },
  {
    label: i18n.global.t(`routes.operation_manage_page.zpqc`) + '-' + i18n.global.t(`routes.operation_manage_page.rq`),
    value: '早盘全场-让球'
  },
  {
    label: i18n.global.t(`routes.operation_manage_page.zpqc`) + '-' + i18n.global.t(`routes.operation_manage_page.dxyf`),
    value: '早盘全场-得下一分'
  }
];

//
export const zdlx: Options[] = [
  {
    label: i18n.global.t(`routes.tips.tdzy`),
    value: 1
  },
  {
    label: i18n.global.t(`routes.tips.tdhb`),
    value: 2
  }
];

// 活动类型
export const hdlx: Options[] = [
  {
    label: i18n.global.t('routes.tips.ckhd'),
    value: 'deposit'
  },
  {
    label: i18n.global.t('routes.tips.jyjhd'),
    value: 'rescue'
  },
  {
    label: i18n.global.t('routes.tips.jtyhd'),
    value: 'static'
  },
  {
    label: i18n.global.t('routes.deposit.tzhd'),
    value: 'cgcpbet'
  },
  {
    label: i18n.global.t('routes.deposit.djscj'),
    value: 'completion'
  }
];

// 客服设置类型
export const kefuType: Options[] = [
  {
    label: 'TELEGRAM',
    value: '1'
  },
  {
    label: 'CSKH CALL',
    value: '2'
  },
  {
    label: 'CSKH CHAT',
    value: '3'
  },
  {
    label: 'FACEBOOK',
    value: '4'
  },
  {
    label: 'ZALO',
    value: '5'
  }
];

// 禁用原因
export const jyyyOptions: Options[] = [
  {
    label: i18n.global.t(`routes.tips.jyyy1`),
    value: i18n.global.t(`routes.tips.jyyy1`)
  },
  {
    label: i18n.global.t(`routes.tips.jyyy2`),
    value: i18n.global.t(`routes.tips.jyyy2`)
  },
  {
    label: i18n.global.t(`routes.tips.jyyy3`),
    value: i18n.global.t(`routes.tips.jyyy3`)
  }
];
// 风控管理-登录日志登录设备
export const loginDevice: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: ''
  },
  {
    label: 'WEB',
    value: '24'
  },
  {
    label: 'H5',
    value: '25'
  },
  {
    label: 'Android',
    value: '35'
  },
  {
    label: 'IOS',
    value: '36'
  }
];
// 彩种设置-类型转文字
export function loginDeviceTotext(value: number) {
  const obj = loginDevice.find((pl: any) => pl.value == value);
  if (obj) {
    return obj.label;
  }
}
// kfr
/**
 * 2 真人
 3 捕鱼
 4 电子
 5 彩票
 6 体育
 7 棋牌
 8 电竞
 9 斗鸡
 10 小游戏
 */
export const cglx: Options[] = [
  {
    label: i18n.global.t("global.TOO1_lIST.2"),
    value: '2'
  },
  {
    label: i18n.global.t("global.TOO1_lIST.3"),
    value: '3'
  },
  {
    label: i18n.global.t("global.TOO1_lIST.4"),
    value: '4'
  },
  {
    label: i18n.global.t("global.TOO1_lIST.5"),
    value: '5'
  },
  {
    label: i18n.global.t("global.TOO1_lIST.6"),
    value: '6'
  },
  {
    label: i18n.global.t("global.TOO1_lIST.7"),
    value: '7'
  },
  {
    label: i18n.global.t("global.TOO1_lIST.8"),
    value: '8'
  },
  {
    label: i18n.global.t("global.TOO1_lIST.9"),
    value: '9'
  },
  {
    label: i18n.global.t("global.TOO1_lIST.10"),
    value: '10'
  }
];
// 小游戏管理-开奖记录-游戏名称
export const gameName: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: ''
  },
  {
    label: '骰宝',
    value: '1'
  },
  {
    label: '色碟',
    value: '0'
  }
];
// 小游戏管理-开奖记录-游戏名称转文字
export function gameNameTotext(value: number) {
  const obj = gameName.find((pl: any) => pl.value == value);
  if (obj) {
    return obj.label;
  }
}
// 小游戏管理-开奖记录-是否爆罐
export const isBg: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: ''
  },
  {
    label: '是',
    value: '1'
  },
  {
    label: '否',
    value: '0'
  }
];
// 小游戏管理-开奖记录-游戏名称转文字
export function isBgTotext(value: number) {
  const obj = isBg.find((pl: any) => pl.value == value);
  if (obj) {
    return obj.label;
  }
}
// 小游戏管理-每期盈亏-期数
export const profitNumber: Options[] = [
  {
    label: i18n.global.t('global.checkall'),
    value: ''
  },
  {
    label: '最后10期',
    value: '1'
  },
  {
    label: '最后30期',
    value: '2'
  },
  {
    label: '最后60期',
    value: '3'
  },
  {
    label: '今天',
    value: '4'
  },
  {
    label: '昨天',
    value: '5'
  }
];


// 特例
export const myShortcuts: any = [
  {
    text: i18n.global.t('routes.system.today'),
    value: (() => {
      return timerChange(1);
    })()
  },
  {
    text: i18n.global.t('routes.system.yestoday'),
    value: (() => {
      return timerChange(2, true);
    })()
  },
  {
    text: i18n.global.t('routes.report_center_page.weeks'),
    value: (() => {
      return timerChange(7);
    })()
  },
  {
    text: i18n.global.t('routes.report_center_page.half_month'),
    value: (() => {
      return timerChange(14);
    })()
  },
  {
    text: i18n.global.t('routes.report_center_page.month'),
    value: (() => {
      return timerChange(30);
    })()
  },
  {
    text:i18n.global.t('routes.system.close_three_month_days'),
    value: (() => {
      return timerChange(90);
    })()
  },
];