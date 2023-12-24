import { ActionTree, ActionContext } from 'vuex';
import { UserStateType } from './state';
import { StateType } from '@/dto/store';
import { removeCookies } from '@/utils/auth';
import _Alert from 'element-plus/lib/el-alert';
import { APIs } from '@/http';
import { TokenKey, AllowsKey, NameKey } from '@/utils/auth';
import { authRoutes } from '@/router/modules/authRoutes';
import { getPermissionsLoggedRoutes } from '@/utils/route';
import router from '@/router';
import { ElMessage } from 'element-plus';
import { cookie } from 'xe-utils';
import Local from '@/utils/storage';
import event from '@/utils/bus';
import { get_img_base_url } from '@/utils/imageBaseUrl';

type AugmentedActionContext = ActionContext<UserStateType, StateType>;

interface UserInfo {
  username: string;
  password: string;
}

const actions: ActionTree<UserStateType, StateType> = {
  login({ commit }, userInfo: UserInfo) {
    return new Promise((resolve, reject) => {
      APIs.user.login(userInfo).then(res => {
        if (res.status && res?.data.token) {
          const allows = res?.data?.allows;
          if (allows) {
            commit(
              'setAllows',
              allows.split(',').filter((item: string) => item)
            );
          }

          let nt;
          switch (process.env.NODE_ENV) {
            case 'development':
            case 'dev':
              nt = {
                url: ['rmqtt.p3nu.com:8443/mqtt', 'rmqtt.p3nu.com:8443/mqtt'],
                username: 'admin',
                password: 'www.123.com'
              }
              break;
            case 'uat':
              nt = {
                url: ['wss://mqt1.wwace83.com:1888/mqtt/', 'wss://mqt2.wwace83.com:1888/mqtt/'],
                username: 'p3admin',
                password: 'www.123.com'
              }
              break;
            case 'production':
            case 'prod':
              nt = {
                url: ['wss://mqt1.wwace83.com:1888/mqtt/', 'wss://mqt2.wwace83.com:1888/mqtt/'],
                username: 'p3admin',
                password: 'www.123.com'
              }
              break;
            default:
              nt = {
                url: ['rmqtt.p3nu.com:8443/mqtt', 'rmqtt.p3nu.com:8443/mqtt'],
                username: 'admin',
                password: 'www.123.com'
              }
              break;
          }

          // const nt: any = res?.data?.nt || {};
          // const nt =
          //   process.env.NODE_ENV === 'development'
          //     ? {
          //       url: ['ws://ws.p3nu.com:9001/mqtt'],
          //       username: 'read',
          //       password: 'www.123.com'
          //     }
          //     : { url: ['wss://nass.wwace83.com:1888/mqtt'], username: 'read', password: 'www.123.com' };

          // if (location.href.includes('p3nu')) {
          //   nt.url = ['ws://ws.p3nu.com:9001/mqtt'];
          // }

          commit('setToken', res?.data?.token);
          commit('setName', res?.data?.user_name);
          commit('setPrefix', res?.data?.prefix);
          // let domainStr = res?.data?.domain.slice(0, -1);
           let domainStr = get_img_base_url();
          console.log('链接nats信息 ', nt);
          Local.set('socketUrl', nt.url);
          Local.set('socketUser', nt.username);
          Local.set('domain', domainStr);
          Local.set('socketPass', nt.password);
          resolve(res);
        } else {
          reject();
        }
      });
    });
  },
  clearUserRoutes({ commit, state }) {
    state.routes.forEach(item => {
      item();
    });
    commit('removeUserRoute');
  },
  /**
   * 退出
   * @param param0
   * @param type 1，手动退出，2，token失效
   */
  logout({ commit, dispatch }, type: number) {
    async function logoutFn() {
      removeCookies(TokenKey);
      removeCookies(AllowsKey);
      removeCookies(NameKey);
      await dispatch('clearUserRoutes');
      commit('setIsLoad', false);
      commit('resetState');
      const lang: string = localStorage.getItem('language') || '';
      const langObj: any = localStorage.getItem(lang) || null;
      localStorage.clear();
      sessionStorage.clear();
      localStorage.setItem('language', lang);
      localStorage.setItem(lang, langObj);
      event.$emit('logoutFn');
      router.replace(`/login?redirect=${router.currentRoute.value.path}`);
    }
    // 手动退出，调用api
    if (type == 1) {
      APIs.user
        .logout()
        .then(async (res: any) => {
          if (res.status) {
            logoutFn();
          }
        })
        .catch(async error => {
          ElMessage.error(error);
        });
    } else {
      // 非手动退出，只需要清空state和localStorage，sessionStorage
      logoutFn();
    }
  },
  generateRoutes({ commit }, allows) {
    return new Promise(resolve => {
      let accessedRoutes: any;
      accessedRoutes = getPermissionsLoggedRoutes() || [];
      commit('setIsLoad', true);
      resolve(accessedRoutes);
    });
  }
};
export default actions;
