import { atom } from "recoil";
import { User } from "../types/user";

// UI側で保持するユーザー情報のグローバルステート定義定義①
export const UserInfoProvider = atom<User>({
  key: "User",
  default: {
    uid: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    address: {
      postalcode: "",
      prefecture: "",
      address1: "",
      address2: "",
      address3: "",
    },
  },
});

// 上記①に登録する前準備として、一時保存用にそれぞれの値を保持するためのグローバルステート定義
export const UserInfoFirstName = atom<string>({
  key: "firstName",
  default: "",
});
export const UserInfoLastName = atom<string>({
  key: "lastName",
  default: "",
});
export const UserInfoEmail = atom<string>({
  key: "email",
  default: "",
});
export const UserInfoPhone = atom<string>({
  key: "phone",
  default: "",
});
export const UserInfoBirthDate = atom<string>({
  key: "birthDate",
  default: "",
});

export const UserInfoPostalcode = atom<string>({
  key: "postalCode",
  default: "",
});
export const UserInfoPrefecture = atom<string>({
  key: "prefecture",
  default: "",
});
export const UserInfoAddress1 = atom<string>({
  key: "address1",
  default: "",
});
export const UserInfoAddress2 = atom<string>({
  key: "address2",
  default: "",
});
export const UserInfoAddress3 = atom<string>({
  key: "address3",
  default: "",
});
