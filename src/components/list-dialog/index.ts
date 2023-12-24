import { ref } from 'vue';
import { TabsActiveName } from '@/views/vip/list/nsIWalletService/index';

export default function useTableRowDialog() {
  const dialogVisible = ref<boolean>(false);
  const tabsName = ref<TabsActiveName>('groundwater');

  return { dialogVisible, tabsName };
}
