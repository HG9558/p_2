import { Getter, GetterTree } from 'vuex';
import { AppStateType } from './state';

const getters: GetterTree<AppStateType, any> = {
  getToolData(state: AppStateType) {
    return state.toolBarData;
  },
  getCacheView(state: AppStateType) {
    return state.cacheView;
  }
};

export default getters;
