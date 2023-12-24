import { getCookies } from '@/utils/auth';
import { TokenKey, AllowsKey, NameKey } from '@/utils/auth';

interface State {
  token: string;
  name: string;
  prefix: string;
  allows: string[];
  isLoad: boolean;
  routes: any[];
  socketUrl: string;
  socketUser: string;
  socketPass: string;
}

export const getDefaultState = (): State => {
  return {
    token: getCookies(TokenKey),
    name: getCookies(NameKey),
    allows: getCookies(AllowsKey) ? JSON.parse(getCookies(AllowsKey)) : [],
    isLoad: false,
    routes: [],
    prefix: getCookies('prefix') || '',
    socketUrl: '',
    socketUser: '',
    socketPass: ''
  };
};

const UserState: State = getDefaultState();

export type UserStateType = typeof UserState;

export default UserState;
