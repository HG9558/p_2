import { ToolData } from './types';
import Local from '@/utils/storage';
interface State {
  count: number;
  leftFoldStatus: boolean;
  toolBarData?: ToolData[]; // 保存标签button的数组
  cacheView?: string[]; // 保存需要缓存的数组
  transferArray?: any[];
  GameTypeList?: any[];
  CashTypeList?: any[];
  TranferList?: any[];
  BankList?: any[];
  tagsArray?: any[];
  deviceTypes?: any[]; // 设备类型
  tableHeight?: number | string;
}

const appState: State = {
  count: 0,
  leftFoldStatus: Local.get('leftFoldStatus') === 1 ? true : false,
  transferArray: undefined,
  GameTypeList: undefined,
  CashTypeList: undefined,
  TranferList: undefined,
  BankList: undefined,
  tagsArray: [],
  deviceTypes: [],
  toolBarData: [],
  cacheView: [],
  tableHeight: 600
};

export type AppStateType = typeof appState;

export default appState;
