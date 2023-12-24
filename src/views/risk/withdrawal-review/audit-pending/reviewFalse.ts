import i18n from '@/locales';
import { ref } from 'vue';

export function useConfigRules() {
  const rules = ref<any>({
    remark_select: [
      {
        required: true,
        message: i18n.global.t('routes.risk.refuses_tips'),
        trigger: 'change'
      }
    ],
    notice: [
      {
        required: true,
        message: i18n.global.t('routes.risk.msg_tz_tips'),
        trigger: 'change'
      }
    ],
    review_remark: [
      {
        required: true,
        message: i18n.global.t('routes.risk.reason_content_tips'),
        trigger: 'blur'
      }
    ],
    withdraw_remark: [
      {
        required: true,
        message: i18n.global.t('routes.risk.pls_qtbz'),
        trigger: 'blur'
      }
    ]
  });
  return {
    rules
  };
}
