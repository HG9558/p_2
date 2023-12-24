import { ref } from 'vue';
import { dynamic, dynamicMsg } from '@/utils/expressions';
import i18n from '@/locales/index';

export function useConfigRules() {
  const rules = ref<any>({
    merchant_id: [
      {
        required: true,
        message: i18n.global.t('routes.finance_manage_page.enter_merchant'),
        trigger: 'change'
      },
      {
        validator: (rule: any, value: any, callback: any) => {
          if (!value) {
            callback(new Error(i18n.global.t('routes.finance_manage_page.enter_merchant')));
          } else {
            callback();
          }
        },
        trigger: ['blur', 'change']
      }
    ],
    name: [
      {
        required: true,
        message: i18n.global.t('routes.tips.channel_tips'),
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
