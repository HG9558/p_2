import Local, { Session } from '@/utils/storage';

export const TokenKey = 'token';
export const AllowsKey = 'allows';
export const NameKey = 'user_name';

export function getCookies(key: string) {
  return Local.get(key) || '';
}

export function setCookies(key: string, token: string) {
  return Local.set(key, token);
}

export function removeCookies(key: string) {
  return Local.remove(key);
}
