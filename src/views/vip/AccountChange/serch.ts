import { ref } from 'vue';
import { useAccountChangeList } from '@/utils/getJson';
import i18n from '@/locales';
import { user_name, user_name_prompt } from '@/utils/expressions';
import { AccountType } from '@/utils/selectOptions';

export default function useSearchPlaceholder() {
  const { AccountChangeData } = useAccountChangeList(true);
  const FormDataList = ref([
    {
      label: i18n.global.t('global.username'),
      model: 'username',
      placeholder: i18n.global.t('routes.tips.please_enter_username'),
      rules: [
        {
          message: user_name_prompt
        }
      ]
    },
    {
      label: i18n.global.t('routes.activity.userId'),
      model: 'uid',
      placeholder: i18n.global.t('routes.activity.userId_placeholder'),
    },
    {
      label: i18n.global.t('global.order_number'),
      model: 'bill_no',
      placeholder: i18n.global.t('routes.tips.pleace_enter_order')
    },
    {
      type: 'select',
      label: i18n.global.t('routes.vip_list_page.account_c_type'),
      model: 'types',
      multiple: true,
      options: AccountChangeData,
      placeholder: i18n.global.t('routes.vip_list_page.account_type_tips'),
      default: ['']
    },
    {
      label: i18n.global.t('routes.vip_list_page.change_time'),
      model: 'b',
      type: 'datetimerange',
      modelNameArray: ['start_time', 'end_time'],
      // rules: [
      //   {
      //     type: 'array',
      //     required: true,
      //     message: i18n.global.t('global.pleace_sel_time'),
      //     trigger: 'change'
      //   }
      // ]
    }
  ]);
  return {
    FormDataList
  };
}
