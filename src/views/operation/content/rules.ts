import i18n from '@/locales';
import { ref } from 'vue';
import { t } from 'vxe-table';

export function useConfigRules(formData: any) {
  function validatePass1(rule: any, value: any, callback: any) {
    if (formData.value.show_end_time) {
      if (!value) {
        callback(new Error(i18n.global.t('routes.tips.select_startT')));
      } else {
        callback();
      }
    } else {
      callback();
    }
  }

  function validatePass2(rule: any, value: any, callback: any) {
    if (formData.value.show_start_time) {
      if (!value) {
        callback(new Error(i18n.global.t('routes.tips.select_stopT')));
      } else {
        callback();
      }
    } else {
      callback();
    }
  }

  const rules = ref<any>({
    title: [
      {
        required: true,
        message: i18n.global.t('routes.tips.carouse_title_tips'),
        trigger: ['blur', 'change']
      }
    ],
    content: [
      {
        required: true,
        message: i18n.global.t('routes.tips.content_enter'),
        trigger: ['blur', 'change']
      }
    ],
    redirect: [
      {
        required: true,
        message: i18n.global.t('routes.operation_manage_page.s_href_type'),
        trigger: 'change'
      }
    ],
    state: [
      {
        required: true,
        message: i18n.global.t('routes.finance_manage_page.is_start'),
        trigger: 'change',
      }
    ],
    ty: [
      {
        required: true,
        message: i18n.global.t('routes.operation_manage_page.s_announcement'),
        trigger: 'change'
      }
    ],
    icon: [
      {
        required: true,
        message: i18n.global.t('routes.tips.select_icon_tips'),
        trigger: 'change'
      }
    ],
    // redirect_url: [
    //   {
    //     required: true,
    //     message: i18n.global.t('routes.tips.enter_href'),
    //     trigger: 'change'
    //   }
    // ],
    device: [
      {
        type: 'array',
        required: true,
        message: i18n.global.t('routes.operation_manage_page.plese_device'),
        trigger: 'change'
      }
    ],
    show_start_time: [{ validator: validatePass1, trigger: 'blur' }],
    show_end_time: [{ validator: validatePass2, trigger: 'blur' }]
  });
  return {
    rules
  };
}
