import { ref } from 'vue';
import { gameIdO } from '@/views/vip/list/ts/game_id';
import i18n from '@/locales/index';
import { APIs } from '@/http';

const sVipList = ref<any[]>([]);

export function getState(state: number): string {
  return state == 1 ? i18n.global.t('routes.operation_manage_page.start') : i18n.global.t('routes.finance_manage_page.disabled');
}

export function getAgent(agent: number): string {
  return agent == 1 ? i18n.global.t('global.yes') : i18n.global.t('global.no');
}

export function lostWin(state: number): string {
  return state >= 0 ? '#67C23A' : '#ff4d4f';
}

export function lostWin2(state: number): string {
  return state >= 0 ? '#ff4d4f' : 'green';
}

export function tzFlag(flag: number, resettle: number): string {
  const f = String(flag);
  const r = String(resettle);
  if (f === '0') {
    return i18n.global.t('routes.tips.foption1');
  }
  if (f === '2') {
    return i18n.global.t('routes.tips.foption3');
  }
  if (f === '1' && r === '1') {
    return i18n.global.t('routes.tips.settled');
  }
  if (f === '1' && r !== '1') {
    return i18n.global.t('routes.tips.foption2');
  }
  if (f === '3' && r === '1') {
    return i18n.global.t('routes.tips.foption4');
  }
  if (f === '3' && r !== '1') {
    return i18n.global.t('routes.tips.foption4');
  }
  return '';
}

export function gameIDText(result: string) {
  const resultarr = result ? result.split('|') : [];
  let gameIdText = '';
  for (let i = 0; i < resultarr.length; i++) {
    gameIdO.forEach((pl: any) => {
      if (resultarr[i].indexOf(pl) !== -1) {
        let text = resultarr[i].split(':');
        text.shift();
        gameIdText = text.join('');
      }
    });
  }
  return gameIdText;
}

// svip转换
export function svipToText(svip: number) {
  const obj = sVipList.value.find((item: any) => item.value == svip);
  if (obj) {
    return obj.label;
  } else {
    return '-';
  }
}

// 注册设备转换
export function deviceToText(device: number) {
  if (device) {
    if (device === 1) {
      return 'web';
    } else if (device === 2) {
      return 'h5';
    } else if (device === 3) {
      return 'ios';
    } else if (device === 4) {
      return 'android';
    } else {
      return '-';
    }
  } else {
    return '';
  }
}

// 注册设备转换
export function device_Text(device: number) {
  if (device) {
    if (device === 24) {
      return 'web';
    } else if (device === 25) {
      return 'h5';
    } else if (device === 35) {
      return 'android';
    } else if (device === 36) {
      return 'ios';
    } else {
      return '-';
    }
  } else {
    return '';
  }
}
