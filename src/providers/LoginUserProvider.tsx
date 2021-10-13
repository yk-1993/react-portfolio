import { atom } from "recoil";
import firebase from "firebase";

type AuthState = firebase.User | null;

export const authState = atom<AuthState>({
  key: "authState",
  default: null,
  // TypeError: Cannot freezeを回避
  dangerouslyAllowMutability: true,
});
