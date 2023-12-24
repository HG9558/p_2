if (isProd) {
  __webpack_public_path__ = APP_CDN_URL + '/';
  // 清console
}
// if (ENVI === 'prod') {
//   window.console.table = () => {};
//   window.console.log = () => {};
// }
import { createApp, Directive } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import { store, key } from './store';
import * as directives from '@/directives';
import App from './App.vue';
import router from './router';
import './permission';
import 'default-passive-events';
import * as filter from './filter';
import { _filterKey } from './filter/filterKey';
import kUpload from '@/components/upload/index.vue';
import uploads from '@/components/uploads/index.vue';
import formSerch from '@/components/serch-form/index.vue'; // 全局搜索组件
import pagination from '@/components/pagination/index.vue';
import LockIcon from '@/components/lock/index.vue'; // 全局加解密组件
import VXETable from 'vxe-table';
import { globalMixin } from './mixins/index';
import 'vxe-table/lib/style.css';
import bus from '@/utils/bus';
import i18n from './locales';
// import * as echarts from 'echarts';
import { toFixedNReport, appendBRL } from '@/utils/int';

console.log('站点：', site);
console.log('默认语言：', lang);

VXETable.setup({
  size: 'medium',
  i18n: (key, args) => i18n.global.t(key, args)
  // 可选，对参数中的列头、校验提示..等进行自动翻译（只对支持国际化的有效）
  // translate(key, args) {
  //   // 例如，只翻译 "app." 开头的键值
  //   if (key) {
  //     return i18n.global.t(key, args);
  //   }
  //   return key;
  // }
});

const app = createApp(App);

// 注册自定义指令
Object.keys(directives).forEach(key => {
  app.directive(key, (directives as { [key: string]: Directive })[key]);
});
// 全局过滤器
app.config.globalProperties.toFixedPro = toFixedNReport;
app.config.globalProperties.appendBRL = appendBRL;
app.config.globalProperties.$filters = filter;
app.config.globalProperties.$bus = bus;
// app.config.globalProperties.echarts = echarts;
app.use(ElementPlus, { size: 'small', i18n: i18n.global.t });
app.use(VXETable);
app.provide(_filterKey, filter);
app.component('k-upload', kUpload);
app.component('uploads', uploads);
app.component('form-serch', formSerch);
app.component('pagination-page', pagination);
app.component('lock-icon', LockIcon);
app.use(i18n);
app.use(router).use(store, key).mount('#App');
app.mixin(globalMixin);

if (module.hot) {
  module.hot.accept();
}
