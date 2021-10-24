import { useCallback, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  UserInfoAddress1,
  UserInfoBirthDate,
} from "../providers/UserInfoProvider";
import {
  UserInfoFirstName,
  UserInfoLastName,
  UserInfoPhone,
  UserInfoPostalcode,
} from "../providers/UserInfoProvider";

type Props = {
  password: string;
  rePassword: string;
};
export const UseValidation = () => {
  const [errMessageFirstName, setErrMessageFirstName] = useState<string>("");
  const [errMessageLastName, setErrMessageLastName] = useState<string>("");
  const [errMessagePw, setErrMessagePw] = useState<string>("");
  const [errMessagePhone, setErrMessagePhone] = useState<string>("");
  const [errMessageBirthDate, setErrMessageBirthDate] = useState<string>("");
  const [errMessagePost, setErrMessagePost] = useState<string>("");
  const [errMessageAddress, setErrMessageAddress] = useState<string>("");

  // フロント側画面間連携情報用グローバルステート
  const phone = useRecoilValue(UserInfoPhone);
  const firstName = useRecoilValue(UserInfoFirstName);
  const lastName = useRecoilValue(UserInfoLastName);
  const birthDate = useRecoilValue(UserInfoBirthDate);
  const postalcode = useRecoilValue(UserInfoPostalcode);
  const address = useRecoilValue(UserInfoAddress1);

  const checkFirstNameValid = (): boolean => {
    // 必須項目チェック 名字
    if (firstName) {
      setErrMessageFirstName("");
      return true;
    } else {
      setErrMessageFirstName("名字を入力してください");
      return false;
    }
  };
  const checkLastNameValid = (): boolean => {
    // 必須項目チェック 名前
    if (lastName) {
      setErrMessageLastName("");
      return true;
    } else {
      setErrMessageLastName("名前を入力してください");
      return false;
    }
  };

  const checkBirthDateValid = (): boolean => {
    // 必須項目チェック 生年月日
    if (birthDate) {
      setErrMessageBirthDate("");
      return true;
    } else {
      setErrMessageBirthDate("生年月日を選択してください");
      return false;
    }
  };
  const checkPhoneValidation = (): boolean => {
    // 電話番号バリデーション
    // 電話番号の入力が無い場合はチェックしない
    if (!phone || phone === "") {
      setErrMessagePhone("");
      return true;
    }
    // 正規表現で桁数簡易チェック
    if (phone.match(/^(0{1}\d{9,10})$/)) {
      setErrMessagePhone("");
      return true;
    } else {
      setErrMessagePhone("正しい電話番号を入力してください");
      return false;
    }
  };
  const checkPwValidation = useCallback((props: Props): boolean => {
    // パスワード再入力用バリデーション
    const { password, rePassword } = props;
    if (password === rePassword) {
      setErrMessagePw("");
      return true;
    } else {
      setErrMessagePw("再入力されたパスワードが一致しません");
      return false;
    }
  }, []);
  const checkPostalcodeValid = (): boolean => {
    // 必須項目チェック 郵便番号（住所は自動入力）
    if (postalcode.match(/^[0-9]{7}$/)) {
      setErrMessagePost("");
      return true;
    } else {
      setErrMessagePost("正しい郵便番号を入力してください");
      return false;
    }
  };
  const checkAddressValid = (): boolean => {
    // 必須項目チェック 郵便番号（住所は自動入力）
    if (address) {
      setErrMessageAddress("");
      return true;
    } else {
      setErrMessageAddress("郵便番号を入力後、検索入力してください");
      return false;
    }
  };
  return {
    checkFirstNameValid,
    checkLastNameValid,
    checkPwValidation,
    checkPhoneValidation,
    checkBirthDateValid,
    checkPostalcodeValid,
    checkAddressValid,
    errMessageFirstName,
    errMessageLastName,
    errMessagePw,
    errMessageBirthDate,
    errMessagePhone,
    errMessagePost,
    errMessageAddress,
  };
};
