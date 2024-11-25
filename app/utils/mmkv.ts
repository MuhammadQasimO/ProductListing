import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

export const setCache = (key: string, value: any) => {
  storage.set(key, JSON.stringify(value));
};

export const getCache = <T>(key: string): T | null => {
  const cachedValue = storage.getString(key);
  return cachedValue ? JSON.parse(cachedValue) : null;
};

export const removeCache = (key: string) => {
  storage.delete(key);
};
