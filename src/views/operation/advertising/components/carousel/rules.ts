import { reactive } from 'vue';
import i18n from '@/locales';

export const rules = reactive({
  title: [
    {
      required: true,
      message: i18n.global.t('routes.operation_manage_page.enter_t'),
      trigger: 'change'
    },
    { min: 3, max: 200, message: i18n.global.t('routes.tips.title_limit_3_200'), trigger: 'change' }
  ],
  redirect_url: [
    {
      required: true,
      message: i18n.global.t('routes.tips.link_detail'),
      trigger: 'change'
    }
  ],
  seq: [
    {
      required: true,
      message: i18n.global.t('global.sort_enter'),
      trigger: 'change'
    },
    {
      validator: (rule: any, value: any, callback: any) => {
        const txt = i18n.global.t('routes.tips.numbers');
        if (Number.isNaN(Number(value))) {
          callback(new Error(txt));
        } else {
          if (Number(value) < 1 || Number(value) > 100) {
            callback(new Error(txt));
          } else {
            callback();
          }
        }
      },
      trigger: 'blur'
    }
  ],
  url_type: [
    {
      required: true,
      message: i18n.global.t('routes.tips.enter_link'),
      trigger: 'change'
    }
  ],
  // link_type: [
  //   {
  //     required: true,
  //     message: i18n.global.t('routes.operation_manage_page.s_href_type'),
  //     trigger: 'change'
  //   }
  // ],
  state: [
    {
      required: true,
      message: i18n.global.t('routes.operation_manage_page.s_state'),
      trigger: 'change'
    }
  ],
  imagesH5: [
    {
      required: true,
      message: i18n.global.t('routes.operation_manage_page.s_pic'),
      trigger: 'change'
    }
  ],

  imagesPc: [
    {
      required: true,
      message: i18n.global.t('routes.operation_manage_page.s_pic'),
      trigger: 'change'
    }
  ],
  show_type: [
    {
      required: true,
      message: i18n.global.t('routes.operation_manage_page.s_showt'),
      trigger: 'change'
    }
  ]
});
