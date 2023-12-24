import type { RouteRecordRaw } from 'vue-router';

const Layout = () => import(/* webpackChunkName: 'layout' */ '@/layouts/default/index.vue');

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '/vip',
    name: 'Vip',
    redirect: '/vip/list',
    meta: {
      icon: 'el-icon-user-solid',
      name: 'routes.member_manage'
    },
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'VipList',
        component: () => import(/* webpackChunkName: "vip-list" */ '@/views/vip/list/index.vue'),
        meta: {
          name: 'routes.member_manage_children.list'
        }
      },
      {
        path: 'upDownRecord',
        name: 'upDownRecord',
        component: () => import(/* webpackChunkName: "upDownRecord" */ '@/views/vip/upDownRecord/index.vue'),
        meta: {
          name: 'global.vipPoints'
        }
      },
      {
        path: 'config',
        name: 'VipConfigTables',
        component: () => import(/* webpackChunkName: "vip-config" */ '@/views/vip/config/index.vue'),
        meta: {
          name: 'routes.member_manage_children.config'
        }
      },
      {
        path: 'verc',
        name: 'vipCodeQuerys',
        component: () => import(/* webpackChunkName: "vip-verc" */ '@/views/vip/verc/index.vue'),
        meta: {
          name: 'routes.member_manage_children.verc'
        }
      },
      {
        path: 'accountChange',
        name: 'vipAccountChange',
        component: () => import(/* webpackChunkName: "vip-verc" */ '@/views/vip/AccountChange/index.vue'),
        meta: {
          name: 'routes.member_manage_children.zbjlcx'
        }
      },
      {
        path: 'bankManagement',
        name: 'bankManagement',
        component: () => import(/* webpackChunkName: "vip-config" */ '@/views/vip/bankManagement/index.vue'),
        meta: {
          name: 'routes.member_manage_children.bank'
        }
      },
      {
        path: 'proxyDomain',
        name: 'ProxyDomain',
        component: () => import(/* webpackChunkName: "permission-Proxy-Domain" */ '@/views/permission/proxyDomain/index.vue'),
        meta: {
          name: 'routes.system_manage_children.proxyDomain'
        }
      },
      // {
      //   path: 'vipTest',
      //   name: 'vipTest',
      //   component: () => import(/* webpackChunkName: "vip-config" */ '@/views/vip/test/index.vue'),
      //   meta: {
      //     name: 'test123'
      //   }
      // },
    ]
  },
  {
    path: '/bet',
    name: 'Bet',
    component: Layout,
    meta: {
      icon: 'el-icon-document-copy',
      name: 'routes.member_manage_children.bet'
    },
    children: [
      {
        path: 'vipBet',
        name: 'VipBet',
        component: () => import(/* webpackChunkName: "vipBet" */ '@/views/bet/vipBet/index.vue'),
        meta: {
          name: 'routes.vip_list_page.bet_recourd',
          noCache: true
        }
      },
    ]
  },
  {
    path: '/activity',
    name: 'activity',
    meta: {
      icon: 'el-icon-sell',
      name: 'routes.operation_manage_children.activityManager'
    },
    component: Layout,
    children: [
      {
        path: 'treasure',
        name: 'treasure',
        component: () => import(/* webpackChunkName: "treasure" */ '@/views/activity/treasure/index.vue'),
        meta: {
          name: 'routes.activity.treasure_menu'
        }
      },
      {
        path: 'signActivity',
        name: 'signActivity',
        component: () => import(/* webpackChunkName: "signActivity" */ '@/views/activity/signActivity/index.vue'),
        meta: {
          name: 'routes.activity.sign_menu'
        }
      },
      {
        path: 'invite',
        name: 'inviteActivity',
        component: () => import(/* webpackChunkName: "signActivity" */ '@/views/activity/deposit/index.vue'),
        meta: {
          name: 'routes.activity.deposit_menu'
        }
      },
      {
        path: 'weeeksBet',
        name: 'weeeksBet',
        component: () => import(/* webpackChunkName: "weeeksBet" */ '@/views/activity/weeksBet/index.vue'),
        meta: {
          name: 'routes.activity.weeks'
        }
      },
    ]
  },
  {
    path: '/operation',
    name: 'operation',
    redirect: '/operation/advertising',
    meta: {
      icon: 'el-icon-s-cooperation',
      name: 'routes.operation_manage'
    },
    component: Layout,
    children: [
      {
        path: 'advertising',
        name: 'operation-advertising',
        component: () => import(/* webpackChunkName: "operation-advertising" */ '@/views/operation/advertising/index.vue'),
        meta: {
          name: 'routes.operation_manage_children.advertising'
        }
      },
      {
        path: 'content',
        name: 'operation-content',
        component: () => import(/* webpackChunkName: "operation-content" */ '@/views/operation/content/index.vue'),
        meta: {
          name: 'routes.tips.system_notice'
        }
      },
    ]
  },
  {
    path: '/risk',
    name: 'risk',
    redirect: '/risk/withdrawalReview',
    meta: {
      icon: 'el-icon-message-solid',
      name: 'routes.risk_manage'
    },
    component: Layout,
    children: [
      {
        path: 'withdrawalReview',
        name: 'withdrawal-review',
        component: () => import(/* webpackChunkName: "withdrawal-review" */ '@/views/risk/withdrawal-review/Index.vue'),
        meta: {
          name: 'routes.risk_manage_children.withdrawalReview'
        }
      },
      {
        path: 'flowList',
        name: 'flowList',
        component: () => import(/* webpackChunkName: "vipBet" */ '@/views/risk/flow-list/index.vue'),
        meta: {
          name: 'routes.risk.game_record',
          noCache: true
        }
      },
      {
        path: 'whitelist',
        name: 'Whitelist',
        component: () => import(/* webpackChunkName: "Whitelist" */ '@/views/risk/whitelist/index.vue'),
        meta: {
          name: 'routes.risk_manage_children.whitelist'
        }
      },
    ]
  },
  {
    path: '/fin',
    name: 'Fin',
    redirect: '/fin/ChannelManagement',
    meta: {
      icon: 'el-icon-money',
      name: 'routes.finance_manage'
    },
    component: Layout,
    children: [
      // 存款管理
      {
        path: 'history',
        name: 'DepHistory',
        component: () => import(/* webpackChunkName: "fin-usdt123" */ '@/views/fin/DepositManagement/history/index.vue'),
        meta: {
          name: 'routes.vip_list_page.all_withd',
        },
      },
      {
        path: 'tripartite_deposit',
        name: 'TripartiteDeposit',
        component: () => import(/* webpackChunkName: "tripartite_deposit" */ '@/views/fin/DepositManagement/tripartite_deposit/index.vue'),
        meta: {
          name: 'routes.finance_manage_page.third_desipot',
          parent: 'DepositManagement',
        }
      },
      // 通道管理
      {
        path: 'ChannelManagement',
        name: 'ChannelManagement',
        component: () => import(/* webpackChunkName: "fin-list" */ '@/views/fin/ChannelManagement/index.vue'),
        meta: {
          name: 'routes.finance_manage_page.aisleList'
        }
      },
      // 提款管理
      {
        path: 'WithdrawalManagement',
        name: 'WithdrawalManagement',
        component: () => import(/* webpackChunkName: "fin-list" */ '@/views/fin/WithdrawalManagement/index.vue'),
        meta: {
          name: 'routes.finance_manage_page.WithdrawalManagement'
        }
      },
      // 手动出款
      {
        path: 'ManualWithdrawal',
        name: 'ManualWithdrawal',
        component: () => import(/* webpackChunkName: "fin-list" */ '@/views/fin/ManualWithdrawal/index.vue'),
        meta: {
          name: 'routes.finance_manage_page.ManualWithdrawal'
        }
      },
      // 手续费管理
      {
        path: 'HandlingFeeManagement',
        name: 'HandlingFeeManagement',
        component: () => import(/* webpackChunkName: "fin-list" */ '@/views/fin/HandlingFeeManagement/index.vue'),
        meta: {
          name: 'routes.finance_manage_page.HandlingFeeManagement'
        }
      }
    ]
  },
  {
    path: '/site',
    name: 'Site',
    component: Layout,
    meta: {
      icon: 'el-icon-set-up',
      name: 'routes.site_manage_txt'
    },
    children: [
      {
        path: 'venueManagement',
        name: 'VenueManagement',
        component: () => import(/* webpackChunkName: "site-venue-management" */ '@/views/site/VenueManagement.vue'),
        meta: {
          name: 'routes.site_manage_children.venueManagement'
        }
      },
      {
        path: 'kfUrl',
        name: 'kfUrl',
        component: () => import(/* webpackChunkName: "kfUrl" */ '@/views/site/kfLink/index.vue'),
        meta: {
          name: 'routes.site_page.kf.sider_name'
        }
      },
      {
        path: 'appmanagement',
        name: 'appmanagement',
        component: () => import(/* webpackChunkName: "site-app-management" */ '@/views/site/appmanagement/index.vue'),
        meta: {
          name: 'routes.site_manage_children.appmanagement'
        }
      }
    ]
  },
  // 报表管理
  {
    path: '/report',
    name: 'Report',
    component: Layout,
    meta: {
      icon: 'el-icon-s-order',
      name: 'routes.report_center'
    },
    children: [
       {
        path: 'AgentReport',
        name: 'AgentReport',
        component: () => import(/* webpackChunkName: "ReportGamePlatform" */ '@/views/report/AgentReport.vue'),
        meta: {
          name: 'routes.tips.agent_report'
        }
      },
      {
        path: 'game',
        name: 'ReportGame',
        component: () => import(/* webpackChunkName: "ReportGame" */ '@/views/report/GameReport.vue'),
        meta: {
          name: 'routes.report_center_children.game'
        }
      },
      {
        path: 'PlatformReport',
        name: 'PlatformReport',
        component: () => import(/* webpackChunkName: "PlatformReport" */ '@/views/report/PlatformReport.vue'),
        meta: {
          name: 'routes.report_center_children.PlatformReport'
        }
      },
      {
        path: 'statistics',
        name: 'statistics',
        component: () => import(/* webpackChunkName: "MerchantReportOnline" */ '@/views/report/statistics.vue'),
        meta: {
          name: 'routes.report_center_page.statistics'
        }
      }
    ]
  },
  // 代理管理
  {
    path: '/agent',
    name: 'AgentList',
    component: Layout,
    redirect: '/agent/AgentList',
    meta: {
      icon: 'el-icon-s-custom',
      name: 'routes.agent.invitations'
    },
    children: [
      {
        path: 'AgentConfig',
        name: 'AgentConfig',
        component: () => import(/* webpackChunkName: "agent-config" */ '@/views/agent/config/index.vue'),
        meta: {
          name: 'routes.agent.set_invits',
          noCache: true
        }
      },
      {
        path: 'invitationList',
        name: 'invitationList',
        component: () => import(/* webpackChunkName: "agent-config" */ '@/views/agent/invitation_list/index.vue'),
        meta: {
          name: 'routes.agent.invitation_list',
          noCache: true
        }
      },
      {
        path: 'channelList',
        name: 'channelList',
        component: () => import(/* webpackChunkName: "agent-config" */ '@/views/agent/channel/index.vue'),
        meta: {
          name: 'routes.agent.setcid',
          noCache: true
        }
      },
    ]
  },
  {
    path: '/permission',
    name: 'Permission',
    component: Layout,
    // redirect: '/permission/roleModule',
    meta: {
      icon: 'el-icon-s-platform',
      name: 'routes.system_manage'
    },
    children: [
      {
        path: 'systemAccount',
        name: 'SystemAccount',
        component: () => import(/* webpackChunkName: "permission-system-account" */ '@/views/permission/systemAccount/index.vue'),
        meta: {
          name: 'routes.system_manage_children.systemAccount',
          noCache: true
        }
      },
      {
        path: 'rolePermission',
        name: 'RolePermission',
        component: () => import(/* webpackChunkName: "permission-role-permision" */ '@/views/permission/rolePermission/index.vue'),
        meta: {
          name: 'routes.system_manage_children.rolePermission'
        }
      },
    ]
  }
];
