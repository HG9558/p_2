import { ref } from 'vue';
import i18n from '@/locales';
import { user_name, user_name_prompt } from '@/utils/expressions';

export default function useSearchPlaceholder() {
  const FormDataList = ref<any[]>([
    {
      label: i18n.global.t('global.creat_time'),
      model: 'b',
      type: 'datetimerange',
      modelNameArray: ['start_time', 'end_time'],
      default: null
    },
    {
      type: 'select',
      label: i18n.global.t('global.status'),
      options: [
        {
          label: i18n.global.t('global.checkall'),
          value: ''
        },
        {
          label: i18n.global.t('global.enable'),
          value: '1'
        },
        {
          label: i18n.global.t('global.stop'),
          value: '0'
        }
      ],
      model: 'state',
      default: ''
    },
    {
      label: i18n.global.t('global.operating_people'),
      model: 'created_name',
      placeholder: i18n.global.t('global.operating_people_tips'),
      width: '230px',
    }
  ]);
  return {
    FormDataList
  };
}
