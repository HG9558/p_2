import http from '../core';
import i18n from '@/locales';

/**
 * @场馆列表
 * @param
 * state: number, 全部 -1 离线 0 在线 1
 * name?: string 场馆名称
 */
export function getMerchantList(params: ObjectParams = {}) {
  return http.get('tenant/platform/list', { params });
}

/**
 * @游戏列表
 * @param{*}
 */
export function getGameList(params: ObjectParams = {}) {
  return http.get('tenant/game/list', { params });
}

/**
 * @游戏列表查询接口
 * @param{*}
 */
export function searchGameList(params: ObjectParams = {}) {
  return http.get('tenant/game/search', { params });
}

/**
 * @游戏状态设置
 * @param {id: number, on_line: number //0上线1下线}
 */
export function changeGameState(params: ObjectParams = {}) {
  return http.get('tenant/game/updatestate', { params });
}

/**
 * @场馆编辑
 * @param {id: string, flag: string //更新类型0-修改排序,1-维护状态,2-锁定钱包, seq: number//排序号}
 */
export function updateMerchant(params: ObjectParams = {}) {
  return http.post('tenant/platform/update', params);
}

/**
 * @场馆名称列表
 */
export function getMerchantOptions() {
  return new Promise(resolve => {
    http.get(`merchant/platform/list?page=1&page_size=100&game_type=0`).then(res => {
      // if (res.status) {
      //   resolve(res.data.filter((item: any) => item.state == 1));
      // } else {
      //   resolve([]);
      // }
      if (res.status) {
        if (!res) return [];
        const platsArr: any[] = res.data.d;
        // const platsArr: any[] = res.data.d.filter((item: any) => item.state == 1);
        // 处理多语言，返回数据的格式
        const plats: ObjectParams = {
          name: 'BTI_Sports',
          id: 123123
        };
        // 将platsArr中对象的name属性处理成多语言
        for (let i = 0; i < platsArr.length; i++) {
          platsArr[i]['name'] = i18n.global.t(`global.PLATFORM_PLATS_HEYING.p${platsArr[i]['id']}`);
        }
        resolve(platsArr);
      } else {
        resolve([]);
      }
    });
  });
}


/**
 * @游戏状态设置
 * id: string
 * on_line
 */
export function updateGameState(params: ObjectParams = {}) {
  return http.get('tenant/game/updatestate', { params });
}
export function updateGameIsNew(params: ObjectParams = {}) {
  return http.get('tenant/game/update/batch/rec', { params });
}
export function updateGameIsHot(params: ObjectParams = {}) {
  return http.get('tenant/game/update/batch/hot', { params });
}
//
export function updateGameIsFav(params: ObjectParams = {}) {
  return http.get('tenant/game/update/batch/fav', { params });
}
/**
 * @游戏编辑
 * id: string
 * on_line
 */
export function updateGame(params: ObjectParams = {}) {
  return http.post('/tenant/game/update', params);  
}
/**
 * @游戏标签列表
 * @param{*}
 */
export function getTagList(params: ObjectParams = {}) {
  return http.get('tenant/tag/list', {params});
}

/**
 * @新增游戏标签
 * @param {*}
 */
export function addTag(params: ObjectParams = {}) {
  return http.post('tenant/tag/insert',  params );
}

/**
 * @删除标签
 * @param {id: string}
 */
export function deleteTag(params: ObjectParams = {}) {
  return http.get('tenant/tag/delete', {params});
}
/**
 * @游戏标签编辑
 * @param {id: string, flag: string //更新类型0-修改排序,1-维护状态,2-锁定钱包, seq: number//排序号}
 */
export function updateTag(params: ObjectParams = {}) {
  return http.post('tenant/tag/update', params);
}
/**
 * @绑定游戏标签
 * @param {*}
 */
export function bindingTag(params: ObjectParams = {}) {
  return http.get('tenant/tag/pin/update',{ params});
}
/**
 * @解除绑定游戏标签
 * @param {*}
 */
export function cancelTag(params: ObjectParams = {}) {
  return http.get('tenant/tag/pin/delete',{ params});
}
/**
 * @获取客服链接列表
 * @param {id: string}
 */
export function getKfUrlList(params: ObjectParams = {}) {
  return http.get('tenant/cs/list', {params});
}
/**
 * @游戏标签编辑
 * @param
 */
export function updateKfUrl(params: ObjectParams = {}) {
  return http.post('tenant/cs/update', params);
}