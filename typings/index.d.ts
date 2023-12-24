declare module '*.vue' {
  import { ComponentOptions } from 'vue';
  const component: ComponentOptions;
  export default component;
}
interface Payload {
  [random: string]: any;
}

declare const module: any;
declare const version: string;
declare const isProd: boolean;
declare const lang: string;
declare const site: string;
declare let APP_CDN_URL: string;
declare let APP_ASSETS_URL: string;
declare let ENVI: string;
declare let __webpack_public_path__: string;

declare module 'element-china-area-data';
declare module 'json2csv';
declare module 'he';
declare module 'nats.ws';

interface ObjectParams {
  [prop: string]: any;
}
