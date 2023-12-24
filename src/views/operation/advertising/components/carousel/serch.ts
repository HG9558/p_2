import { ref } from 'vue';
import { carouseType, opperationType } from '@/utils/selectOptions';
import i18n from '@/locales';

export default function useSearchPlaceholder() {
  const FormDataList = ref<any>([

    // {
    //   label: i18n.global.t('routes.tips.by_the_title'),
    //   model: 'title',
    //   placeholder: i18n.global.t('routes.tips.please_enter_a_title')
    // },
    {
      type: 'select',
      label: i18n.global.t('global.select_tip'),
      options: opperationType,
      model: 'state'
    }
  ]);
  return {
    FormDataList
  };
}
