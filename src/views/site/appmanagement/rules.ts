import { reactive } from 'vue';
import { https, https_prompt, appErroMsg, appNumber } from '@/utils/expressions';
import i18n from '@/locales';

export const rules = reactive({
  platform: [
    {
      required: true,
      message: i18n.global.t('routes.site_page.please_device'),
      trigger: 'change'
    }
  ],
  version: [
    {
      required: true,
      message: i18n.global.t('routes.site_page.version_tips'),
      trigger: 'change'
    },
    {
      pattern: appNumber,
      message: appErroMsg
    }
  ],
  url: [
    {
      required: true,
      message: i18n.global.t('routes.site_page.download_addr'),
      trigger: 'change'
    },
    {
      pattern: https,
      message: https_prompt
    }
  ],
  is_force: [
    {
      required: true,
      message: i18n.global.t('global.please_choose'),
      trigger: 'change'
    }
  ],
  name: [
    {
      required: true,
      message: i18n.global.t('routes.site_page.pz_name_tips'),
      trigger: 'change'
    }
  ],
  content: [
    {
      required: true,
      message: i18n.global.t('routes.site_page.up_content'),
      trigger: 'change'
    }
  ]
});
