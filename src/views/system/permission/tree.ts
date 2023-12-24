import { ResponsePriveListItem } from './types';

export function listToTree(list: any[], root: number = 1) {
  const map: any = {};
  list.forEach((item: any) => {
    if (!map[item.id]) {
      map[item.id] = item;
    }
  });

  list.forEach((item: any) => {
    // if (item.pid !== 1 && map[item.pid]) {
    if (map[item.pid]) {
      map[item.pid].children
        ? map[item.pid].children.push(item)
        : (map[item.pid].children = [item]);
    }
  });

  return list.filter(item => {
    if (item.pid === root) {
      return item;
    }
  });
}

export function getPriveItemByPid(pid: number, list: ResponsePriveListItem[]) {
  return list.find((item: ResponsePriveListItem) => item.id === pid);
}
