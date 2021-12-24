import { atom } from "recoil";
import { User } from "../types/user";

// UI側で保持するユーザー情報のグローバルステート定義定義①
export const UserInfoProvider = atom<User | null>({
  key: "User",
  default: {
    uid: null,
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
    birthDate: null,
    address: {
      postalcode: null,
      prefecture: null,
      address1: null,
      address2: null,
      address3: null,
    },
  },
});

// 上記①に登録する前準備として、一時保存用にそれぞれの値を保持するためのグローバルステート定義
export const UserInfoFirstName = atom<string | null>({
  key: "firstName",
  default: null,
});
export const UserInfoLastName = atom<string | null>({
  key: "lastName",
  default: null,
});
export const UserInfoEmail = atom<string | null>({
  key: "email",
  default: null,
});
export const UserInfoPhone = atom<string | null>({
  key: "phone",
  default: null,
});
export const UserInfoBirthDate = atom<string | null>({
  key: "birthDate",
  default: null,
});

export const UserInfoPostalcode = atom<string | null>({
  key: "postalCode",
  default: null,
});
export const UserInfoPrefecture = atom<string | null>({
  key: "prefecture",
  default: null,
});
export const UserInfoAddress1 = atom<string | null>({
  key: "address1",
  default: null,
});
export const UserInfoAddress2 = atom<string | null>({
  key: "address2",
  default: null,
});
export const UserInfoAddress3 = atom<string | null>({
  key: "address3",
  default: null,
});
