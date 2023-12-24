import { store } from '@/store';

export const globalMixin = {
  data() {
    return {
      globalTableHeight: store.state.app.tableHeight || 600
    };
  }
};
