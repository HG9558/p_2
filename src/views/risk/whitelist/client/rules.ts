import { ref } from 'vue';
import i18n from '@/locales';
import { ipNumber, ipTips } from '@/utils/expressions';

export function useConfigRules() {
  const rules = ref<any>({
    ip: [
      {
        required: true,
        message: '请正确输入IP白名单地址',
        trigger: 'change'
      },
      {
        pattern: ipNumber,
        message: ipTips
      }
    ],
    remark: [
      {
        required: true,
        message: i18n.global.t('global.remark'),
        trigger: 'change'
      }
    ]
  });
  return {
    rules
  };
}
