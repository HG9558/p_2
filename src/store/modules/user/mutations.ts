import { MutationTree } from 'vuex';
import { UserStateType } from './state';
import { setCookies, TokenKey, AllowsKey, NameKey } from '@/utils/auth';
import { getDefaultState } from './state';
import Local from '@/utils/storage';

const mutations: MutationTree<UserStateType> = {
  setToken(state: UserStateType, token: string) {
    state.token = token;
    // Local.set(TokenKey, token);
    setCookies(TokenKey, token);
  },
  setName(state: UserStateType, name: string) {
    setCookies(NameKey, name);
    // Local.set(NameKey, name);
    state.name = name;
  },
  setPrefix(state: UserStateType, prefix: string) {
    state.prefix = prefix;
    setCookies('prefix', prefix);
  },
  resetState(state: UserStateType) {
    Object.assign(state, getDefaultState());
  },
  setAllows(state, allows: string[]) {
    if (allows) {
      state.allows = Array.isArray(allows) ? allows : JSON.parse(allows);
      setCookies(AllowsKey, Array.isArray(allows) ? JSON.stringify(allows) : '');
    }
  },
  setIsLoad(state, bool) {
    state.isLoad = bool;
  },
  addUserRoute(state: UserStateType, data) {
    state.routes.push(data);
  },
  removeUserRoute(state: UserStateType) {
    state.routes = [];
  },
  setSocketInfo(state: UserStateType, data: any) {
    if (Array.isArray(data.url)) {
      state.socketUrl = data.url[0];
    } else {
      state.socketUrl = data.url;
    }
    state.socketUser = data.username;
    state.socketPass = data.password;
  }
};

export default mutations;
