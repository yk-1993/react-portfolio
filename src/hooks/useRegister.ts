import { useCallback } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  UserInfoProvider,
  UserInfoFirstName,
  UserInfoLastName,
  UserInfoEmail,
  UserInfoPhone,
  UserInfoBirthDate,
  UserInfoPrefecture,
  UserInfoPostalcode,
  UserInfoAddress1,
  UserInfoAddress2,
  UserInfoAddress3,
} from "../providers/UserInfoProvider";
import { useDispatch, useSelector } from "react-redux";
import store from "..";
import { UserState } from "../store/store";
import { User } from "../types/user";

export const UseRegister = () => {
  // フロント側画面間連携情報ユーザー用、一時保存用のグローバルステートを定義
  const firstName = useRecoilValue(UserInfoFirstName);
  const lastName = useRecoilValue(UserInfoLastName);
  const email = useRecoilValue(UserInfoEmail);
  const phone = useRecoilValue(UserInfoPhone);
  const birthDate = useRecoilValue(UserInfoBirthDate);
  const prefecture = useRecoilValue(UserInfoPrefecture);
  const postalcode = useRecoilValue(UserInfoPostalcode);
  const address1 = useRecoilValue(UserInfoAddress1);
  const address2 = useRecoilValue(UserInfoAddress2);
  const address3 = useRecoilValue(UserInfoAddress3);

  // フロント側画面間連携情報ユーザー用のグローバルステートを定義
  const setUser = useSetRecoilState(UserInfoProvider);

  const dispatch = useDispatch();
  const setRegisterUser = useCallback(() => {
    // Redux
    dispatch({
      type: "REGISTER_USER",
      user: {
        uid: "",
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        birthDate: birthDate,
        address: {
          postalcode: postalcode,
          prefecture: prefecture,
          address1: address1,
          address2: address2,
          address3: address3,
        },
      },
    });
  }, [
    firstName,
    lastName,
    email,
    phone,
    birthDate,
    postalcode,
    prefecture,
    address1,
    address2,
    address3,
  ]);
  return { setRegisterUser };
};
