import { ref } from 'vue';
import i18n from '@/locales';
import { email_prompt } from '@/utils/expressions';
import { qudaoType } from '@/utils/selectOptions';

export default function useSearchPlaceholder() {
  const FormDataList = ref<any[]>([
    // {
    //   label: i18n.global.t('global.username'),
    //   model: 'username',
    //   placeholder: i18n.global.t('routes.tips.please_enter_username'),
    //   width: '260px'
    // },
    {
      label: i18n.global.t('routes.vip_list_page.email'),
      model: 'phone',
      placeholder: i18n.global.t('routes.vip_list_page.email_tips'),
      rules: [
        {
          pattern: /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/,
          message: email_prompt
        }
      ]
    },
    {
      type: 'select',
      label: i18n.global.t('global.status'),
      model: 'state',
      placeholder: i18n.global.t('routes.vip_list_page.state_sel'),
      options: [
        {
          label: i18n.global.t('global.checkall'),
          value: ''
        },
        {
          label: i18n.global.t('routes.tips.wsy'),
          value: '1'
        },
        {
          label: i18n.global.t('global.success'),
          value: '2'
        },
        {
          label: i18n.global.t('global.filed'),
          value: '3'
        }
      ]
    },
    {
      label: i18n.global.t('global.send_time'),
      model: 'time',
      type: 'datetimerange',
      modelNameArray: ['start_time', 'end_time']
    }
  ]);
  return {
    FormDataList
  };
}
