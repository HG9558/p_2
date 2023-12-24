import { ref } from 'vue';
import { user_name, user_name_prompt } from '@/utils/expressions';
import i18n from '@/locales';

export default function useSearchPlaceholder() {
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
      width: '200px'
    },
    {
      label: i18n.global.t('routes.activity.userId'),
      model: 'uid',
      placeholder: i18n.global.t('routes.activity.userId_placeholder'),
      width: '200px'
    },
    // {
    //   label:"提款类型",
    //   type: 'composite',
    //   model: 'automatic',
    //   width: 160,
    //   options: [
    //     {
    //       value: '',
    //       label: '全部'
    //     },
    //     {
    //       value: '0',
    //       label: '人工确认'
    //     },
    //     {
    //       value: '1',
    //       label: '自动转账'
    //     },
    //     {
    //       value: '2',
    //       label: '博主打款'
    //     },
    //   ],
    // },
    {
      type: 'doubleInput',
      model: 'min_amount',
      max: 'max_amount',
      label: i18n.global.t('global.order_amount')
    },
    {
      type: 'composite',
      model: 'ty',
      selectType: 'datetimerange',
      modelName: '1',
      width: 100,
      modelNameArray: ['start_time', 'end_time'],
      options: [
        {
          value: '1',
          label: i18n.global.t('global.replay_time1')
        },
        // {
        //   value: '2',
        //   label: i18n.global.t('global.over_time')
        // }
      ],
      rules: [{ required: true, message: i18n.global.t('global.pleace_sel_time'), trigger: 'change' }]
    }
  ]);
  return {
    FormDataList
  };
}
