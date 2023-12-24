import { ref } from 'vue';
import i18n from '@/locales';
import { user_name, user_name_prompt } from '@/utils/expressions';
export default function useSearchPlaceholder() {
  const FormDataList = ref<any[]>([
    {
      label: i18n.global.t('global.username'),
      model: 'user_name',
      placeholder: i18n.global.t('routes.tips.please_enter_username'),
      width: '260px'
    }
  ]);
  return {
    FormDataList
  };
}
