import menu from './routes/menu';
import global from './global';
import operation_manage_page from './routes/operation_manage_page';
import finance_manage_page from './routes/finance_manage_page';
import report_center_page from './routes/report_center_page';
import site_page from './routes/site_page';
import vip_list_page from './routes/vip_list_page';
import tips from './routes/tips';
import system from './routes/system';
import risk from './routes/risk';
import agent from './routes/agent';
import activity from './routes/activity';
// 英语
export default {
  zh_name: 'Chinese',
  vi_name: 'Vietnam',
  abcsdsd: '123',
  choose_lang: 'language',
  routes: {
    ...menu,
    operation_manage_page,
    finance_manage_page,
    report_center_page,
    site_page,
    vip_list_page,
    tips,
    system,
    risk,
    agent,
    activity
  },
  global
};
