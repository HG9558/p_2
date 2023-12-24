// 场馆（排序）编辑
import { computed, ref } from 'vue';
import i18n from '@/locales';
import { useGameTypeList } from '@/utils/getJson';
import { usePlatform } from '@/utils/requestOptions';

export const stateOptions = [
  { label: i18n.global.t('global.checkall'), value: '' },
  { label: i18n.global.t('routes.site_page.online'), value: 1 },
  { label: i18n.global.t('routes.site_page.offline'), value: 2 }
];
export const bannerStateOptions = [
  { label: i18n.global.t('routes.tips.dpush'), value:'1' },
  { label: i18n.global.t('routes.tips.start'), value: '2'},
  { label: i18n.global.t('routes.tips.stop'), value: '3' },
];
export const stateOptionsOther = [
  { label: i18n.global.t('global.checkall'), value: '' },
  { label: i18n.global.t('routes.site_page.online'), value: 1 },
  { label: i18n.global.t('routes.site_page.offline'), value: 0 }
];
export const maintainedOptions = [
  { label: i18n.global.t('global.checkall'), value: '' },
  { label: i18n.global.t('routes.site_page.normal'), value: 1 },
  { label: i18n.global.t('routes.site_page.w_h_z'), value: 2 }
];
export const client_types: any = {
  '1': { label: 'pc', value: 1 },
  '2': { label: 'h5', value: 2 },
  '4': { label: 'app', value: 4 }
};

/**场馆类型*/
export function useGetMerchantCate() {
  const { GameTypeListData } = useGameTypeList();
  const cupGameType = computed(() => {
    return GameTypeListData.value.map((item: any) => {
      return {
        name: item.label,
        id: item.value
      };
    });
  });
  return {
    cates: cupGameType
  };
}

export function useGetMerchantOptions(cb: () => void) {
  const { list } = usePlatform();
  const cupGameType = computed(() => {
    return list.value.map((item: any) => {
      return {
        name: item.label,
        id: item.value
      };
    });
  });
  // const sites: any = ref(JSON.parse(sessionStorage.getItem('MerchantOptions') || '[]'));
  // if (sites.value.length === 0) {
  //   getMerchantOptions()
  //     .then(json => {
  //       sites.value = json;
  //       sessionStorage.setItem('MerchantOptions', JSON.stringify(json));
  //       cb();
  //     })
  //     .catch(err => console.log(err));
  // } else {
  //   cb();
  // }
  return {
    sites: cupGameType
  };
}

export function gameTypeName(game_type: number, cates: any[]): string {
  const obj: any = cates.find((cate: any) => cate.id === game_type);

  return obj ? obj.name : '--';
}
