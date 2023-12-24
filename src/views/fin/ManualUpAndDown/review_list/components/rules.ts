import { ref } from 'vue';
import { dynamic, dynamicMsg } from '@/utils/expressions';
import i18n from '@/locales';

export function useConfigRules() {
  const rules = ref<any>({
    review_remark: [
      {
        required: true,
        message: i18n.global.t('routes.tips.pleace_audit_remark'),
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
