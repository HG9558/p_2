import { ref } from 'vue';
import { fourNumber, fourNumberMsg, dynamic, dynamicMsg } from '@/utils/expressions';
import i18n from '@/locales';
import { user_name, user_name_prompt } from '@/utils/expressions';

export function useConfigRules() {
  const rules = ref<any>({
    username: [
      {
        required: true,
        message: i18n.global.t('global.username'),
        trigger: 'change',
      }
    ],
    real_amount: [
      {
        required: true,
        message: i18n.global.t('routes.finance_manage_page.down_money_tips'),
        trigger: 'blur'
      },
      {
        pattern: fourNumber,
        message: fourNumberMsg,
        trigger: 'change'
      }
    ],
    remark: [
      {
        required: true,
        message: i18n.global.t('routes.operation_manage_page.please_enter_remark'),
        trigger: 'blur'
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
    ]
  });
  return {
    rules
  };
}
