export enum KEYS {
  USER_LASTLOGIN = "USER_LASTLOGIN",
}

export const getItem = (key: KEYS) => {
  const value = localStorage.getItem(KEYS.USER_LASTLOGIN);
  if (value !== null) {
    return value;
  }
  return "";
};

export const removeItem = (key: KEYS) => {
  localStorage.removeItem(key);
};

export const setItem = (key: KEYS, value: any) => {
  localStorage.setItem(key, value);
};
