import { ResponseGroupUserItem } from './types';

export function listToTree(list: any[], root: string = '1') {
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

export function getPriveItemByPid(pid: number, list: ResponseGroupUserItem[]) {
  return list.find((item: ResponseGroupUserItem) => item.gid == pid);
}
