import { Options, ChangesOptions } from '@/utils/selectOptions';
import { ref } from 'vue';
import { store } from '@/store';
let ChangeguanArrayList = ref<any[]>([]);

/**
 * @获取场馆对应的名称
 *
 * @export
 * @param {*} value
 * @param {Options[]} [type=ChangeguanArrayList.value]
 * @return {*}
 */
export function getChangeguanName(value: any) {
  if (!value) return;
  const type: any = store.state.app.transferArray;
  const filter: any = type.find((item: any) => {
    return value == item['value'];
  });
  if (!filter) return;
  return filter.label;
}

export function getChangesOptionsName(value: any) {
  if (value === undefined) return;
  const filter = ChangesOptions.find((item: any) => {
    return item.value.indexOf(value.toString()) != -1;
  });
  if (!filter) return;
  return filter.label;
}

/**
 * @获取平台转账状态
 * @param value
 * @returns
 */
export const getTransferState = (value: string) => {
  if (value == '0') {
    return '失败';
  } else if (value == '1') {
    return '成功';
  } else if (value == '2' || value == '3' || value == '4') {
    return '处理中';
  } else {
    return;
  }
};
