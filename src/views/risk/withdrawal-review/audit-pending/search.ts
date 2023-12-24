import i18n from '@/locales';
import { ref, onMounted } from 'vue';

export default function useSearchPlaceholder() {
  onMounted(() => {
  });
  const FormDataList = ref<any[]>([
    {
      label: i18n.global.t('global.order_number'),
      model: 'id',
      placeholder: i18n.global.t('routes.finance_manage_page.order_tip')
    },
    // {
    //   label: i18n.global.t('routes.risk.realname'),
    //   model: 'real_name',
    //   placeholder: i18n.global.t('routes.risk.realname_tips'),
    //   width: '340px'
    // },
    {
      label: i18n.global.t('routes.activity.userId'),
      model: 'uid',
      placeholder: i18n.global.t('routes.activity.userId'),
      width: '260px'
    },
    {
      label: i18n.global.t('routes.risk.recipients'),
      model: 'confirm_name',
      placeholder: i18n.global.t('routes.risk.pls_recipients')
    }
  ]);
  return {
    FormDataList,
  };
}
