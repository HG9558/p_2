import { Getter, GetterTree } from 'vuex';
import { UserStateType } from './state';

const getters: GetterTree<UserStateType, any> = {
  getToken(state: UserStateType) {
    return state.token;
  },
  getPrefix(state: UserStateType) {
    return state.prefix;
  },
  getAllows(state: UserStateType) {
    return state.allows;
  },
  getIsLoad(state: UserStateType) {
    return state.isLoad;
  },
  getUserRoutesList(state: UserStateType) {
    return state.routes;
  }
};

export default getters;
