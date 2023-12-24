import { ref } from 'vue';
import { fourNumber, fourNumberMsg, dynamic, dynamicMsg } from '@/utils/expressions';
import i18n from '@/locales/index';

export function useConfigRules() {
  const rules = ref<any>({
    vip: [
      {
        required: true,
        message: i18n.global.t('routes.tips.viplevel_tips'),
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
    fmin: [
      {
        pattern: fourNumber,
        message: fourNumberMsg,
        trigger: ['blur', 'change']
      }
    ],
    fmax: [
      {
        pattern: fourNumber,
        message: fourNumberMsg,
        trigger: ['blur', 'change']
      }
    ]
  });
  return {
    rules
  };
}
