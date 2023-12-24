import { ref } from 'vue';
import { fourNumber, fourNumberMsg, dynamic, dynamicMsg } from '@/utils/expressions';
import i18n from '@/locales/index';

export function useConfigRules() {
  const rules = ref<any>({
    fmin: [
      {
        pattern: fourNumber,
        message: fourNumberMsg
      }
    ],
    fmax: [
      {
        pattern: fourNumber,
        message: fourNumberMsg
      }
    ],
    discount: [
      {
        pattern: fourNumber,
        message: fourNumberMsg
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
    amount_list: {
      pattern: /^[1-9]([0-9]*|\,?[0-9]+)+$/,
      message: i18n.global.t('routes.finance_manage_page.fixedamount.tip1'),
      trigger: 'blur'
    }
  });
  return {
    rules
  };
}
