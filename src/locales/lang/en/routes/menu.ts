// import opration from './opration';
// import finance_manage from './finance_manage';
// import report from './report/report';
// import site from './site';

export default {
  // 菜单导航
  member_manage: 'member management',
  // 子菜单-会员管理
  member_manage_children: {
    list: 'member list',
    config: 'member config',
    bank: 'bank card management',
    bet: 'bet management',
    rec: 'record management',
    acc: 'account adjustment review',
    regi: 'register normal list',
    zbjlcx: 'Account change record',
    verc: 'verification code query'
  },
  // 运营列表
  operation_manage: 'operation management',
  // 子菜单-运营列表
  operation_manage_children: {
    advertising: 'advertising management',
    ylpjsz: 'Win payment settings',
    content: 'content managment',
    vipRebateManager: 'VIPsend money',
    bonusManager: 'bonus managment',
    activityManager: 'activity management',
    depositOffer: 'deposit offer',
    prize: 'prize managment'
  },
  // 运营列表 - 页面
  deposit: {
    scss: 'first deposit three free',
    jyj: 'rescue gold',
    jty: 'static page',
    tzhd: 'betting activity',
    djscj: 'Registration to send bonus',
  },
  // 稽查审核
  risk_audits: 'Audit review',
  // 稽查审核 - 子菜单
  risk_audit_children: {
    auditList: 'Audit list',
    auditRecord: 'Audit records'
  },
  // opration: {
  //   ...opration
  // },
  // 风控管理
  risk_manage: 'risk control management',
  // 风控管理 - 子菜单
  risk_manage_children: {
    risk: 'blacklist',
    whitelist: 'white list',
    withdrawalReview: 'withdrawal review',
    LoginLog: 'login log',
    riskConfiguration: 'risk control figuration'
  },
  // 财务管理
  finance_manage: 'finance management',
  // 财务管理 - 子菜单
  finance_children: {
    ChannelManagement: 'channel management',
    DepositManagement: 'deposit management',
    WithdrawalManagement: 'withdrawal management',
    ManualUpAndDown: 'manual reduce money'
  },
  // 财务管理 - 页面
  // finance_manage: {
  //   ...finance_manage
  // },
  // 站点管理
  site_manage_txt: 'site management',
  // 站点管理 - 子菜单
  site_manage_children: {
    siteSettings: 'site settings',
    venueManagement: 'plat management',
    dlj: 'short link',
    appmanagement: 'APP upgrade management'
  },
  // 站点管理 - 页面
  // site: {
  //   ...site
  // },
  // 报表中心
  report_center: 'report center',
  // 报表中心 - 子菜单
  report_center_children: {
    livebetting: 'real-time betting monitoring',
    game: 'game report',
    platformgame: 'game peport(plat)',
    memberReport: 'member report',
    PlatformReport: 'platform report',
    RealTimeAccessMonitoring: 'real-time access monitoring'
  },
  system_riz: 'Log management',
  system_riz_children: {
    list: 'Table data',
    table: 'log table name',
  },
  // 报表中心 - 页面
  // report: {
  //   ...report
  // },
  // 系统管理
  system_manage: 'system management',
  // 系统管理 - 子菜单
  system_manage_children: {
    systemAccount: 'system account',
    rolePermission: 'role permission',
    roleModules: 'role module',
    accessAuthorization: 'access authorization',
    logManagement: 'log management',
    logBankCard: 'Bank card information detection log',
    systemMessage: 'system message',
    clientLimit: 'client limit',
    proxyDomain: 'Exclusive domain name'
  },
  agent_manage: 'agent management',
  agent_manage_children: {
    agentList: 'agent list',
    lowerMembers: 'lower members',
    teamManagement: 'team management',
    commissionManagement: 'commission management',
    withdrawalManagement: 'withdrawal management',
    recordsManagement: 'record management',
    domainNameManagement: 'domain name management'
  }
};
