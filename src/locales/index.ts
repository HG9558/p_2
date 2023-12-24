import { createI18n } from 'vue-i18n';
// 项目自身
import zh from './lang/zh';
import en from './lang/en';
// ele
import zhLocale from 'element-plus/lib/locale/lang/zh-cn';
import enLocale from 'element-plus/lib/locale/lang/en';
// vxe
import zhVxeLocale from 'vxe-table/lib/locale/lang/zh-CN';
import enVxeLocale from 'vxe-table/lib/locale/lang/en-US';

const messages: any = {
  'zh-CN': {
    ...zh,
    ...zhVxeLocale,
    el: zhLocale.el
  },
  'en-US': {
    ...en,
    ...enVxeLocale,
    el: enLocale.el
  }
};

const languages = window.navigator.languages;

// 默认取本地 > 浏览器
let locale: string = localStorage.getItem('language') || navigator.language;

if (!['zh-CN', 'en-US',].includes(locale)) {
  locale = 'en-US';
}

if (!locale) {
  languages.forEach((language: string) => {
    if (messages[language]) {
      locale = language;
      return;
    }
  });
}

localStorage.setItem('language', locale || 'zh-CN');
locale = localStorage.getItem('language') as string;
const i18n = createI18n({
  legacy: false,
  locale,
  messages,
  silentTranslationWarn: true
});

export default i18n;
