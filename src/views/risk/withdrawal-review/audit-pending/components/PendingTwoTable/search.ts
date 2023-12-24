import { ref, computed } from 'vue';
import { useVipLevel } from '@/utils/getJson';
import i18n from '@/locales';

export default function useSearchPlaceholder() {
  const { vip_list } = useVipLevel();
  let levelData = computed(() => {
    return vip_list.value.map((item: any) => {
      return {
        label: item.label,
        value: item.level
      };
    });
  });
  const FormDataList = ref<any[]>([
    {
      label: i18n.global.t('global.order_number'),
      model: 'id',
      placeholder: i18n.global.t('routes.finance_manage_page.order_tip')
    },
    {
      label: i18n.global.t('global.username'),
      model: 'username',
      placeholder: i18n.global.t('routes.finance_manage_page.username_tips'),
      width: '260px'
    },
    {
      label: i18n.global.t('routes.activity.userId'),
      model: 'uid',
      placeholder: i18n.global.t('routes.activity.userId'),
      width: '260px'
    },
    {
      label: i18n.global.t('global.replay_time1'),
      type: 'datetimerange',
      model: 'time_flag'
    },
    {
      label: i18n.global.t('routes.risk.realname'),
      model: 'real_name',
      placeholder: i18n.global.t('routes.risk.realname_enter'),
      width: '260px'
    },
    {
      type: 'doubleInput',
      model: 'min_amount',
      max: 'max_amount',
      label: i18n.global.t('routes.finance_manage_page.wid_amount')
    }
    // {
    //   type: 'allchecked',
    //   label: i18n.global.t('routes.finance_manage_page.vip_level'),
    //   model: 'vips',
    //   options: levelData
    // }
  ]);
  return {
    FormDataList
  };
}
