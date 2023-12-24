import { reactive } from 'vue';
import i18n from '@/locales';

export const rules = reactive({
  c: [
    {
      required: true,
      message: i18n.global.t('routes.risk.recipient_new_tips'),
      trigger: 'change'
    }
  ],
  remark: [
    {
      required: true,
      message: i18n.global.t('routes.risk.recipient_no_tips'),
      trigger: 'change'
    }
  ]
});
