import { ref } from 'vue';
import { backCard, dynamic, dynamicMsg, backCardTips } from '@/utils/expressions';
import i18n from '@/locales';
export function useConfigRules() {
  const rules = ref<any>({
    ty: [
      {
        required: true,
        message: i18n.global.t('routes.finance_manage_page.out_type_tips'),
        trigger: 'change'
      }
    ],
    bank_name: [
      {
        required: true,
        message: i18n.global.t('routes.finance_manage_page.bank_name_tips'),
        trigger: 'change'
      }
    ],
    real_name: [
      {
        required: true,
        message: i18n.global.t('routes.tips.enter_realname'),
        trigger: 'change'
      }
    ],
    card_no: [
      {
        required: true,
        message: i18n.global.t('routes.finance_manage_page.bank_num_tips'),
        trigger: 'change'
      },
      {
        pattern: backCard,
        message: backCardTips,
        trigger: 'blur'
      }
    ],
    pid: [
      {
        required: true,
        message: i18n.global.t('routes.finance_manage_page.enter_channel_name'),
        trigger: 'change'
      }
    ],
    code: [
      {
        required: true,
        message: i18n.global.t('routes.finance_manage_page.dynamic_code_tip'),
        trigger: 'change'
      },
      {
        pattern: dynamic,
        message: dynamicMsg
      }
    ],
    payout_bank_name: [
      {
        required: true,
        message: i18n.global.t('routes.finance_manage_page.pls_out_bankname'),
        trigger: 'change'
      }
    ],
    remark: [
      {
        required: true,
        message: i18n.global.t('global.remark'),
        trigger: 'change'
      }
    ]
  });
  return {
    rules
  };
}
