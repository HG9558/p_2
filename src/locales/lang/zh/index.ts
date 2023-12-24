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
import domain from './routes/domain';
// 中文
export default {
  zh_name: '中文',
  abcsdsd: '123',
  choose_lang: '选择语言',
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
    activity,
    domain
  },
  global
};
