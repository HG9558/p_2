import { ref } from 'vue';
import i18n from '@/locales';
import { ipNumber, ipTips } from '@/utils/expressions';

export default function useSearchPlaceholder() {
  const FormDataList = ref([
    {
      label: i18n.global.t('routes.system.IP_addr'),
      model: 'ip',
      trigger: 'change',
      placeholder: '请输入IP白名单地址',
      rules: [
        {
          pattern: ipNumber,
          message: ipTips
        }
      ]
    },
    {
      label: i18n.global.t('routes.vip_list_page.oper_add_user'),
      model: 'created_name',
      placeholder: '请输入添加人',
    },
    {
      label: i18n.global.t('global.operating_time'),
      model: 'c',
      type: 'datetimerange',
      modelNameArray: ['start_time', 'end_time'],
    }
  ]);
  return {
    FormDataList
  };
}
