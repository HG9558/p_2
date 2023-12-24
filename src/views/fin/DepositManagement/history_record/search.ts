import { ref } from 'vue';
import { useChannel,  } from '@/views/fin/ChannelManagement/ts/cateAndChannel';
import i18n from '@/locales';

export default function useSearchPlaceholder() {
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
      label: i18n.global.t('routes.agent.agent_name'),
      model: 'parent_name',
      placeholder: i18n.global.t('routes.tips.pls_sjdl')
    },
    // {
    //   label: i18n.global.t('routes.agent.team_name'),
    //   model: 'group_name',
    //   placeholder: i18n.global.t('routes.agent.enter_team_name')
    // },
    {
      label: i18n.global.t('routes.finance_manage_page.channel_number'),
      model: 'oid',
      placeholder: i18n.global.t('routes.finance_manage_page.channel_number_tip')
    },
    {
      type: 'select',
      label: i18n.global.t('routes.finance_manage_page.tname'),
      options: ChannelData,
      model: 'fid',
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
    // // 1三方存款，,3是线下转卡，4线下usdt
    // {
    //   type: 'select',
    //   label: i18n.global.t('routes.finance_manage_page.deposit_type'),
    //   options: [
    //     {
    //       label: i18n.global.t('global.checkall'),
    //       value: ''
    //     },
    //     {
    //       label: i18n.global.t('routes.finance_manage_page.third_desipot'),
    //       value: '1'
    //     },
    //     {
    //       label: i18n.global.t('routes.finance_manage_page.offline.tips4'),
    //       value: '3'
    //     },
    //     {
    //       label: i18n.global.t('routes.finance_manage_page.usdt_manage'),
    //       value: '4'
    //     }
    //   ],
    //   model: 'ty',
    //   default: ''
    // },
    {
      type: 'doubleInput',
      model: 'min_amount',
      max: 'max_amount',
      label: i18n.global.t('global.order_amount')
    },
    {
      type: 'composite',
      model: 'time_flag',
      selectType: 'datetimerange',
      modelName: 1,
      width: 100,
      modelNameArray: ['start_time', 'end_time'],
      options: [
        {
          value: 1,
          label: i18n.global.t('routes.finance_manage_page.order_time')
        },
        {
          value: 0,
          label: i18n.global.t('global.over_time')
        }
      ],
      rules: [{ required: true, message: i18n.global.t('global.pleace_sel_time'), trigger: 'change' }]
    },
    // // 1三方存款，,3是线下转卡，4线下usdt
    // {
    //   type: 'select',
    //   label: i18n.global.t('routes.tips.ckcs'),
    //   options: [
    //     {
    //       label: i18n.global.t('global.checkall'),
    //       value: 0
    //     },
    //     {
    //       label: i18n.global.t('routes.tips.sc'),
    //       value: 1
    //     },
    //     {
    //       label: i18n.global.t('routes.tips.ec'),
    //       value: 2
    //     }
    //   ],
    //   model: 'dty',
    //   default: 0
    // },
  ]);
  return {
    FormDataList
  };
}
