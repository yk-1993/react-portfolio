import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import {
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
type Props = {
  inputType: string;
  inputField: string;
};

export const UseSetInput = () => {
  // フロント側画面間連携情報ユーザー用、一時保存用のグローバルステートを定義
  const setFirstName = useSetRecoilState(UserInfoFirstName);
  const setLastName = useSetRecoilState(UserInfoLastName);
  const setEmail = useSetRecoilState(UserInfoEmail);
  const setPhone = useSetRecoilState(UserInfoPhone);
  const setBirthDate = useSetRecoilState(UserInfoBirthDate);
  const setPrefecture = useSetRecoilState(UserInfoPrefecture);
  const setPostalcode = useSetRecoilState(UserInfoPostalcode);
  const setAddress1 = useSetRecoilState(UserInfoAddress1);
  const setAddress2 = useSetRecoilState(UserInfoAddress2);
  const setAddress3 = useSetRecoilState(UserInfoAddress3);

  const setInputField = useCallback((props: Props) => {
    const { inputType, inputField } = props;
    // フォームタイプによってセットするグローバルステートを出し分け
    switch (inputType) {
      case "firstName":
        setFirstName(inputField);
        break;
      case "lastName":
        setLastName(inputField);
        break;
      case "email":
        setEmail(inputField);
        break;
      case "phone":
        setPhone(inputField);
        break;
      case "birthDate":
        setBirthDate(inputField);
        break;
      case "prefecture":
        setPrefecture(inputField);
        break;
      case "postalcode":
        setPostalcode(inputField);
        break;
      case "address1":
        setAddress1(inputField);
        break;
      case "address2":
        setAddress2(inputField);
        break;
      case "address3":
        setAddress3(inputField);
        break;
    }
  }, []);

  return { setInputField };
};
