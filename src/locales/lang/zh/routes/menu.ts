// import opration from './opration';
// import finance_manage from './finance_manage';
// import report from './report/report';
// import site from './site';

export default {
  // 菜单导航
  member_manage: '会员管理',
  // 子菜单-会员管理
  member_manage_children: {
    list: '会员列表',
    config: '会员配置',
    bank: '银行卡管理',
    bet: '投注管理',
    rec: '记录管理',
    acc: '账户调整审核',
    regi: '注册白名单',
    zbjlcx: '账变记录',
    ptzz: '平台转账查询',
    verc: '验证码查询'
  },
  // 运营列表
  operation_manage: '运营管理',
  // 子菜单-运营列表
  operation_manage_children: {
    advertising: '广告管理',
    ylpjsz: '盈利派奖设置',
    content: '内容管理',
    vipRebateManager: 'VIP返水',
    bonusManager: '红利管理',
    activityManager: '活动管理',
    depositOffer: '存款优惠',
    prize: '奖品管理'
  },
  // 运营列表 - 页面
  deposit: {
    scss: '首存三送',
    jyj: '救援金',
    tzhd: '投注活动',
    djscj: '登记送彩金',
    jty: '静态页',
  },
  // 稽查审核
  risk_audits: '稽查审核',
  // 稽查审核 - 子菜单
  risk_audit_children: {
    auditList: '稽查列表',
    auditRecord: '稽查记录'
  },
  // 风控管理
  risk_manage: '风控管理',
  // 风控管理 - 子菜单
  risk_manage_children: {
    risk: '黑名单',
    whitelist: 'IP白名单',
    withdrawalReview: '提款审核',
    LoginLog: '登录日志',
    riskConfiguration: '风控配置'
  },
  // 财务管理
  finance_manage: '财务管理',
  // 财务管理 - 子菜单
  finance_children: {
    ChannelManagement: '渠道管理',
    DepositManagement: '存款管理',
    WithdrawalManagement: '提款管理',
    ManualUpAndDown: '手动下分'
  },
  // 财务管理 - 页面
  // finance_manage: {
  //   ...finance_manage
  // },
  // 站点管理
  site_manage_txt: '站点管理',
  // 站点管理 - 子菜单
  site_manage_children: {
    siteSettings: '站点设置',
    venueManagement: '场馆管理',
    dlj: '短链接',
    appmanagement: 'APP升级管理'
  },
  // 站点管理 - 页面
  // site: {
  //   ...site
  // },
  // 报表中心
  report_center: '报表中心',
  // 报表中心 - 子菜单
  report_center_children: {
    livebetting: '实时投注监控',
    gameInfo: '游戏明细报表',
    game: '游戏报表',
    platformgame: '游戏报表(场馆)',
    memberReport: '会员报表',
    PlatformReport: '平台报表',
    RealTimeAccessMonitoring: '实时存取监控'
  },
  // 报表中心 - 页面
  // report: {
  //   ...report
  // },
  // 日志
  system_riz: '日志管理',
  system_riz_children: {
    list: '表数据',
    table: '日志表名',
  },
  // 系统管理
  system_manage: '系统管理',
  // 系统管理 - 子菜单
  system_manage_children: {
    systemAccount: '系统账号',
    rolePermission: '角色权限',
    roleModules: '角色模块',
    accessAuthorization: '访问授权',
    logManagement: '日志管理',
    logBankCard: '银行卡信息检测日志',
    systemMessage: '系统消息',
    clientLimit: '客户端限制',
    proxyDomain: '专属域名'
  },
  // 代理管理
  agent_manage: '代理管理',
  agent_manage_children: {
    agentList: '代理列表',
    lowerMembers: '下级成员',
    teamManagement: '团队管理',
    commissionManagement: '佣金管理',
    withdrawalManagement: '提款管理',
    recordsManagement: '记录管理',
    domainNameManagement: '域名管理'
  }
};
