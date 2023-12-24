import { cloneDeep } from 'lodash';

export default function listToTree(
  list: any[],
  root: string = '1',
) {
  const map: any = {};
  list.forEach((item: any) => {
    if (!map[item.gid]) {
      map[item.gid] = item;
    }
  });
  
  list.forEach((item: any) => {
    if (map[item.pid]) {
      map[item.pid].children
        ? map[item.pid].children.push(item)
        : (map[item.pid].children = [item]);
    } 
  });

  return list.filter(item => {
    if (item.pid == root) {
      return item;
    }
  });
}

/**
 * @移除tree中state为0的对象
 * @param {*} arrList 移除对象
 * @return {*}
 */
export function ListData(arr: any): [] {
  if (arr.length > 0) {
    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr[i].state == '0') {
        arr.splice(i, 1);
      } else if (!!arr[i].children) {
        ListData(arr[i].children);
      }
    }
  }
  return arr;
}

export function removeTreeNoState(arrList: any) {
  const arr = cloneDeep(arrList);
  ListData(arr);
  return arr;
}
