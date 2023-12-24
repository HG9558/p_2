import { ref } from 'vue';
import i18n from '@/locales';
import { maintainedOptions, stateOptions } from './common';
import { useGameTypeList } from '@/utils/getJson';
import { usePlatform } from '@/utils/requestOptions';
import { DeviceOptions } from '@/utils/selectOptions';

export default function useSearchPlaceholder() {
  const {list, toPlatformText} = usePlatform(true);
  const { GameTypeListData, GameTypeListToText } = useGameTypeList(true);
  const FormDataList = ref([
    {
      label: i18n.global.t('routes.operation_manage_page.game_name'),
      model: 'word',
      placeholder: i18n.global.t('routes.tips.enter_ganmename'),
    },
    {
      type: 'select',
      label: i18n.global.t('routes.site_page.game_plat'),
      options: list,
      model: 'platform_id',
      default: ''
    },
    {
      type: 'select',
      label: i18n.global.t('routes.site_page.plat_type'),
      options: GameTypeListData,
      model: 'game_type',
      default: ''
    },
    // {
    //   type: 'select',
    //   label: i18n.global.t('routes.site_page.support_platform'),
    //   options: [
    //     {
    //       label: i18n.global.t('global.checkall'),
    //       value: ''
    //     },
    //     ...DeviceOptions
    //   ],
    //   model: 'client_type',
    //   default: ''
    // },
    {
      type: 'select',
      label: i18n.global.t('global.select_tip'),
      options: [
        ...stateOptions
      ],
      model: 'online',
      default: ''
    },
  ]);
  return {
    FormDataList,
    GameTypeListToText,
    toPlatformText
  };
}
