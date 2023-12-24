import { ref } from 'vue';
import i18n from '@/locales';
import { user_name, user_name_prompt } from '@/utils/expressions';

export default function useSearchPlaceholder() {
  const FormDataList = ref<any[]>([
    {
      label: i18n.global.t('global.username'),
      model: 'username',
      placeholder: i18n.global.t('routes.tips.please_enter_username'),
      width: '260px'
    },
    {
      label: i18n.global.t('global.creat_time'),
      model: 'time',
      type: 'datetimerange',
      modelNameArray: ['start_time', 'end_time'],
      rules: [
        {
          type: 'array',
          required: true,
          message: i18n.global.t('global.pleace_sel_time'),
          trigger: 'blur'
        }
      ]
    }
  ]);
  return {
    FormDataList
  };
}
