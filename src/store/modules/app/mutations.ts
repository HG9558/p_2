import { MutationTree } from 'vuex';
import { AppStateType } from './state';
import { ToolData } from './types';
import router from '@/router/index';
import Local from '@/utils/storage';

const mutations: MutationTree<AppStateType> = {
  setCount(state: AppStateType, count: number) {
    state.count = count;
  },
  changeLeftFoldStatus(state: AppStateType) {
    state.leftFoldStatus = !state.leftFoldStatus;
    Local.set('leftFoldStatus', state.leftFoldStatus ? 1 : 0);
  },
  setToolData(state: AppStateType, data: ToolData) {
    if (state.toolBarData) {
      if (state.toolBarData.some(v => v.detail === data.detail)) return;
      state.toolBarData.push(data);
    }
  },
  setCacheView(state: AppStateType, data: string) {
    if (state.cacheView) {
      if (state.cacheView?.includes(data)) {
        return;
      }
      state.cacheView.push(data);
    }
  },
  clearToolItem(state: AppStateType, { detail }: ToolData) {
    const { path } = router.currentRoute.value;
    const { push } = router;
    if (state.toolBarData) {
      const index = state.toolBarData.findIndex(item => item.detail === detail);
      /* tslint:disable:no-string-literal */
      const isActive = path === state.toolBarData[index]['detail'];
      const len = state.toolBarData.length - 1;
      if (index === 0) {
        push({
          path: state.toolBarData[index + 1]['detail']
        });
      } else if (index === len || isActive) {
        push({
          path: state.toolBarData[index - 1]['detail']
        });
      }
      state.toolBarData.splice(index, 1);
      /* tslint:enable:no-string-literal */
    }
  },
  setTransferArray(state: AppStateType, arr: any) {
    state.transferArray = arr;
  },
  setGameTypeList(state: AppStateType, arr: any) {
    state.GameTypeList = arr;
  },
  setCashTypeList(state: AppStateType, arr: any) {
    state.CashTypeList = arr;
  },
  setTranferList(state: AppStateType, arr: any) {
    state.TranferList = arr;
  },
  setBankList(state: AppStateType, arr: any) {
    state.BankList = arr;
  },
  setTagsArray(state: AppStateType, arr: any) {
    state.tagsArray = arr;
  },
  setDeviceTypes(state: AppStateType, arr: any) {
    state.deviceTypes = arr;
  },
  clearCacheView(state: AppStateType, componentName: string) {
    // console.error(state.cacheView, componentName, 111111111);
    if (state.cacheView) {
      const clearIndex = state.cacheView.findIndex(item => item === componentName);
      state.cacheView?.splice(clearIndex, 1)
    }
  }
};

export default mutations;
