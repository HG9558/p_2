import { InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from 'vuex';
import { StateType } from '@/dto/store';
import app from './modules/app';
import user from './modules/user';

// 定义 injection key
export const key: InjectionKey<Store<StateType>> = Symbol();

// 创建store实例
export const store = createStore<StateType>({
  modules: {
    app,
    user
  },
  devtools: false
});

// 重新定义useStore
export const useStore = () => baseUseStore(key);
