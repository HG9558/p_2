import { AppStateType } from '@/store/modules/app/state';
import { UserStateType } from '@/store/modules/user/state';

type ModuleType = {
  app: AppStateType;
  user: UserStateType;
};

export type StateType = ModuleType;
