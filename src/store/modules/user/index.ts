import { Module } from 'vuex';
import { UserStateType } from './state';
import { StateType } from '@/dto/store';
import state from './state';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

const user: Module<UserStateType, StateType> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default user;
