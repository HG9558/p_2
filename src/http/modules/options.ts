import http from '../core';
import i18n from '@/locales';
import _ from 'lodash';


// 本次数值进行调整的json如下： 2021-5-10
// 账变类型 002.josn
// 场馆转账类型 003.json
// 场馆转账状态 004.json
// 语言 009.json
// 红利类型 012.json
// 红利审核状态 013.json
// 红利发放状态 014.json
// 场馆转账确认类型 015.json
// 后台调整类型 016.json
// 后台调整审核状态 017.json
// 后台调整发放状态 018.json

/**
 * @场馆
 * [{"id":"场馆ID","name":"场馆名称","description":"描述","game_type":场馆类型(2=真人,3=捕鱼,4=电子,5=彩票,6=体育,7=棋牌,8=电竞),"state":场馆状态(1上线0下线),"seq":排序,"wallet":场馆钱包状态(1开启0关闭)}]
 * wallet有3个值：0=维护，1=正常，2=不显示，这个不显示是指在转账界面的时候，不显示
 * @param {*}
 */
export function platformOptions() {
  return new Promise(resolve => {
    http.get(`tenant/platform/list?page=1&page_size=100&game_type=0`).then(res => {
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

export function platformId() {
  return new Promise(resolve => {
    http.get(`tenant/platform/list?page=1&page_size=100&game_type=0`).then(res => {
      if (res.status) {
        if (!res) return [];
        const platsArr: any[] = _.uniqBy(res.data.d, 'wallet_id');
        // const platsArr: any[] = res.data.d.filter((item: any) => item.state == 1);
        // 处理多语言，返回数据的格式
        const plats: ObjectParams = {
          name: 'BTI_Sports',
          id: 123123
        };
        // 将platsArr中对象的name属性处理成多语言
        for (let i = 0; i < platsArr.length; i++) {
          platsArr[i]['name'] = i18n.global.t(`global.WALLET_ID.p${platsArr[i]['id']}`);
        }
        resolve(platsArr);
      } else {
        resolve([]);
      }
    });
  });
}

