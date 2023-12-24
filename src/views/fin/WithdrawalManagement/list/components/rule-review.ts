import { ref } from 'vue';
import i18n from '@/locales';
import { dynamic, dynamicMsg } from '@/utils/expressions';

export function useConfigRules() {
  const rules = ref<any>({
    remark: [
      {
        required: true,
        message: i18n.global.t('routes.finance_manage_page.remark_tip'),
        trigger: 'change'
      }
    ],
    withdraw_remark: [
      {
        required: true,
        message: i18n.global.t('routes.finance_manage_page.remark_tip'),
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
    ]
  });
  return {
    rules
  };
}
