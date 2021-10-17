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
    phone: 0,
    birthDate: new Date(),
    address: {
      postalcode: 0,
      prefecture: "",
      address1: "",
      address2: "",
    },
  },
});
