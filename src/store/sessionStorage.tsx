export enum KEYS {
  USER_SESSION = "USER_SESSION",
}

export const getItem = (key: KEYS) => {
  const value = sessionStorage.getItem(KEYS.USER_SESSION);
  if (value !== null) {
    return value;
  }
  return "";
};

export const removeItem = (key: KEYS) => {
  sessionStorage.removeItem(key);
};

export const setItem = (key: KEYS, value: any) => {
  sessionStorage.setItem(key, value);
};
