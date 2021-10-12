import { atom } from "recoil";
import { User } from "../types/user";

export type loginUser = User & { isAdmin: boolean };

export const UserInfo = atom<loginUser | null>({
  key: "userInfo",
  default: null,
});
