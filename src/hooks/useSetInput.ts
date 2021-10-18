import { useCallback } from "react";
import { useRecoilState } from "recoil";
import {
  UserInfoProvider,
  UserInfoFirstName,
  UserInfoLastName,
  UserInfoEmail,
  UserInfoPhone,
  UserInfoBirthDate,
} from "../providers/UserInfoProvider";
type Props = {
  inputType: string;
  inputField: string;
};

export const UseSetInput = () => {
  const [firstName, setFirstName] = useRecoilState(UserInfoFirstName);
  const [lastName, setLastName] = useRecoilState(UserInfoLastName);
  const [email, setEmail] = useRecoilState(UserInfoEmail);
  const [phone, setPhone] = useRecoilState(UserInfoPhone);
  const [birthDate, setBirthDate] = useRecoilState(UserInfoBirthDate);

  // フロント側画面間連携情報ユーザー用グローバルステート
  const [user, setUser] = useRecoilState(UserInfoProvider);

  const setInputField = useCallback((props: Props) => {
    const { inputType, inputField } = props;

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
    }
  }, []);

  const setRegisterUser = () => {
    setUser({
      uid: "",
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      birthDate: birthDate,
      address: {
        postalcode: "",
        prefecture: "",
        address1: "",
        address2: "",
      },
    });
    console.log(user);
  };
  return { setInputField, setRegisterUser };
};
