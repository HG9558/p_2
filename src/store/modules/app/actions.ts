import { ActionTree, ActionContext } from 'vuex';
import { AppStateType } from './state';
import { StateType } from '@/dto/store';
import { ToolData } from './types';
import _Alert from 'element-plus/lib/el-alert';
import { APIs } from '@/http';
import { AjaxReturnOptions } from '@/utils/selectOptions';
import Local, { Session } from '@/utils/storage';
import { labelType } from '@/utils/selectOptions';
import _ from 'lodash';
import { getPlatformId } from '@/utils/requestOptions';

type AugmentedActionContext = ActionContext<AppStateType, StateType>;

const actions: ActionTree<AppStateType, StateType> = {
  async aycSetCount({ commit }) {
    await Promise.resolve();
    commit('setCount', 10);
  },
  commitToolBar({ commit }, data: ToolData) {
    commit('setToolData', data);
    // commit('setCacheView', data.componentName);
  },
  clearToolBar({ commit }, data: ToolData) {
    commit('clearToolItem', data);
  },
  clearCache({ commit }, data: ToolData) {
    commit('clearCacheView', data);
  },
  // 场馆
  setTransferArrayAction({ commit, state }, data: ToolData) {
    return new Promise(resolve => {
      if (Local.get('token')) {
        APIs.options.platformOptions().then((res: any) => {
          const data: any = res.map((item: any) => {
            return {
              label: item.name,
              value: item.id,
              wallet_id: item.wallet_id,
              maintained: item.maintained,
              wn: item.wallet_name,
              flags: item.flags
            };
          });
          commit('setTransferArray', data);
          resolve(data);
        });
      }
    });
  },
  // 场馆:platform_id
  setPlatformId({ commit, state }, data: ToolData) {
    return new Promise(resolve => {
      if (Local.get('token')) {
        APIs.options.platformId().then((res: any) => {
          const data: any = res.map((item: any) => {
            return {
              label: item.name,
              value: item.id,
              wallet_id: item.wallet_id,
              maintained: item.maintained,
              wn: item.wallet_name,
              flags: item.flags
            };
          });
          commit('setTransferArray', data);
          resolve(data);
        });
      }
    });
  },
  setBankList({ commit, state }, data: ToolData) {
    return new Promise(resolve => {
      if (Local.get('token')) {
        APIs.options.getBankList().then((res: any) => {
          const data: any = res.map((item: AjaxReturnOptions) => {
            return {
              label: item.name,
              value: item.id
            };
          });
          commit('setBankList', data);
          resolve(data);
        });
      }
    });
  },
  getTagsArray({ commit, state }, data: any = {}) {
    return new Promise(resolve => {
      let labelTypeRef = _.cloneDeep(labelType);
      labelTypeRef = labelTypeRef.map((item: any) => {
        return {
          ...item,
          children: []
        };
      });
      APIs.label.tagsList({ all: 1, ...data }).then(res => {
        if (res.status && res?.data.d) {
          res.data.d.map((item: any) => {
            labelTypeRef.map((p: any, pi: any) => {
              if (item.flags == p.value) {
                p.children.push(item);
              }
            });
          });
          labelTypeRef = labelTypeRef.filter((c: any) => {
            return c.children.length !== 0;
          });
          commit('setTagsArray', labelTypeRef);
          resolve(labelTypeRef);
        } else {
          resolve([]);
        }
      });
    });
  }
};

export default actions;
