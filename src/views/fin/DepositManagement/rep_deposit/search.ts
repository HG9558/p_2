import { ref } from 'vue';
import { useCate, useChannel } from '@/views/fin/ChannelManagement/ts/cateAndChannel';
import { user_name, user_name_prompt } from '@/utils/expressions';
import i18n from '@/locales';

export default function useSearchPlaceholder() {
  const { CateData } = useCate(true);
  const { ChannelData } = useChannel(true);
  const FormDataList = ref<any[]>([
    {
      label: i18n.global.t('global.order_number'),
      model: 'id',
      placeholder: i18n.global.t('routes.finance_manage_page.order_tip')
    },
    {
      label: i18n.global.t('global.username'),
      model: 'username',
      placeholder: i18n.global.t('routes.tips.please_enter_username'),
      width: '230px'
    },
    {
      label: i18n.global.t('routes.activity.userId'),
      model: 'uid',
      placeholder: i18n.global.t('routes.activity.userId_placeholder'),
      width: '260px'
    },
    {
      label: i18n.global.t('routes.finance_manage_page.channel_number'),
      model: 'oid',
      placeholder: i18n.global.t('routes.finance_manage_page.channel_number_tip')
    },
    {
      type: 'select',
      label: i18n.global.t('routes.finance_manage_page.tname'),
      options: ChannelData,
      model: 'channel_id',
      default: ''
    },
    {
      type: 'select',
      label: i18n.global.t('global.select_tip'),
      options: [
        {
          label: i18n.global.t('global.checkall'),
          value: ''
        },
        {
          label: i18n.global.t('routes.finance_manage_page.desipot_suc'),
          value: 362
        },
        {
          label: i18n.global.t('routes.finance_manage_page.desipot_error'),
          value: 363
        }
      ],
      model: 'state',
      default: ''
    },
    {
      type: 'doubleInput',
      model: 'min_amount',
      max: 'max_amount',
      label: i18n.global.t('global.order_amount')
    },
    {
      label: i18n.global.t('routes.finance_manage_page.order_time'),
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
