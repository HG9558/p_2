import { ref } from 'vue';
import i18n from '@/locales';
import { maintainedOptions, stateOptions } from './common';
import { useGameTypeList } from '@/utils/getJson';
import { usePlatform } from '@/utils/requestOptions';

export default function useSearchPlaceholder() {
  const {list, toPlatformText} = usePlatform(true);
  const { GameTypeListData, GameTypeListToText } = useGameTypeList(true);
  const FormDataList = ref([
    // {
    //   type: 'select',
    //   label: i18n.global.t('routes.site_page.plat_name'),
    //   options: list,
    //   model: 'id',
    //   default: ''
    // },
    {
      type: 'input',
      label: i18n.global.t('routes.tips.cg_id'),
      options: list,
      model: 'id',
      default: ''
    },
    {
      type: 'select',
      label: i18n.global.t('routes.site_page.plat_type'),
      options: GameTypeListData,
      model: 'game_type',
      default: ''
    },
    {
      type: 'select',
      label: i18n.global.t('routes.site_page.maintain_state'),
      options: [
        ...maintainedOptions
      ],
      model: 'maintained',
      default: ''
    },
    {
      type: 'select',
      label: i18n.global.t('global.select_tip'),
      options: [
        ...stateOptions
      ],
      model: 'state',
      default: ''
    },
  ]);
  return {
    FormDataList,
    GameTypeListToText,
    toPlatformText
  };
}
