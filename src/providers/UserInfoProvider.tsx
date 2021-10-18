import { atom } from "recoil";
import { User } from "../types/user";

// UI側で保持するユーザー情報を定義
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
    },
  },
});

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
