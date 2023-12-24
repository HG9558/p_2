import i18n from '@/locales';
import { ref } from 'vue';

export function useConfigRules() {
  const rules = ref<any>({
    confirm_uid: [
      {
        required: true,
        message: i18n.global.t('routes.risk.recipient_new_tips'),
        trigger: 'change'
      }
    ]
  });
  return {
    rules
  };
}
