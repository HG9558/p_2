import { ref } from 'vue';
import { dynamic, dynamicMsg } from '@/utils/expressions';
import i18n from '@/locales';

export function useConfigRules() {
  const rules = ref<any>({
    c: [
      {
        required: true,
        message: i18n.global.t('routes.finance_manage_page.enter_upper_amount'),
        trigger: 'change'
      },
      {
        validator: (rule: any, value: any, callback: any) => {
          if (!value) {
            callback(new Error(i18n.global.t('routes.finance_manage_page.enter_upper_amount')));
          } else if (Number.isNaN(Number(value))) {
            callback(new Error(i18n.global.t('routes.tips.enter_number')));
          } else if (Number(value) > 1000000 || Number(value) < 0) {
            callback(new Error(i18n.global.t('routes.tips.best_num')));
          } else {
            callback();
          }
        },
        trigger: ['blur', 'change']
      }
    ],
    d: [
      {
        required: true,
        message: i18n.global.t('routes.finance_manage_page.enter_turnover_multiple'),
        trigger: 'change'
      },
      {
        validator: (rule: any, value: any, callback: any) => {
          if (!value) {
            callback(new Error(i18n.global.t('routes.finance_manage_page.enter_turnover_multiple')));
          } else if (Number.isNaN(Number(value))) {
            callback(new Error(i18n.global.t('routes.tips.enter_number')));
          } else if (Number(value) > 100 || Number(value) < 0) {
            callback(new Error(i18n.global.t('routes.tips.best_num100')));
          } else {
            callback();
          }
        },
        trigger: ['blur', 'change']
      }
    ],
    e: [
      {
        required: true,
        message: i18n.global.t('routes.finance_manage_page.enter_upper_reason'),
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
