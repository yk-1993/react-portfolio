import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import {
  EmailIcon,
  PhoneIcon,
  SearchIcon,
  UnlockIcon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/input";
import { Box, Divider, Flex, Heading, Stack } from "@chakra-ui/layout";
import { ChangeEvent, memo, useState, VFC } from "react";
import { useHistory } from "react-router";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { auth } from "../../firebase";
import { MaterialDatePicker } from "../service/MaterialDatePicker";
import { useMessage } from "../../hooks/useMessage";
import { usePostalCodeGetAddress } from "../../hooks/usePostalcodeGetAddress";
import {
  UserInfoAddress1,
  UserInfoAddress2,
  UserInfoEmail,
  UserInfoPostalcode,
  UserInfoPrefecture,
} from "../../providers/UserInfoProvider";
import { IconForm } from "../molecules/form/IconForm";
import { NormalForm } from "../molecules/form/NormalForm";
import { UseValidation } from "../../hooks/useValidation";
import { UseRegister } from "../../hooks/useRegister";
import { PopupMotion } from "../../motion/PopupMotion";
import { DelayMotion } from "../../motion/Delaymotion";
import { DelayMotionChild } from "../../motion/DelaymotionChild";

// 新規ユーザ登録画面

export const SignUp: VFC = memo(() => {
  // 画面遷移用のhooksを定義
  const history = useHistory();
  // Firebase 認証エラーメッセージ用 useState
  const [errMessage, setErrMessage] = useState<string>("");

  // ローカルにユーザー情報を登録
  const { setRegisterUser } = UseRegister();
  // メッセージトースト
  const { showMessage } = useMessage();
  // 郵便番号検索API
  const { getAddress } = usePostalCodeGetAddress();

  // メールアドレス認証用グローバルステート
  const [emailIns] = useRecoilState(UserInfoEmail);

  // 郵便番号検索後、フォームにセットするためのステート定義
  const prefecture = useRecoilValue(UserInfoPrefecture);
  const setPostalcodeGlobal = useSetRecoilState(UserInfoPostalcode);
  const address1 = useRecoilValue(UserInfoAddress1);
  const address2 = useRecoilValue(UserInfoAddress2);

  // バリデーション読込
  const {
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
    errMessagePhone,
    errMessageBirthDate,
    errMessagePost,
    errMessageAddress,
  } = UseValidation();

  //登録ボタン押下
  const onRegister = () => {
    // Firebase Auth側のエラーメッセージ初期化
    setErrMessage("");

    // 入力された情報をフロント側に登録
    setRegisterUser();
    //
    /* フロント側でのバリデーションチェック
     */

    // 名字
    const validResultFirstname: boolean = checkFirstNameValid();
    // 名前
    const validResultLastName: boolean = checkLastNameValid();
    // 生年月日
    const validResultBirthDate: boolean = checkBirthDateValid();
    // パスワード
    const validResultPw: boolean = checkPwValidation({
      password: password,
      rePassword: rePassword,
    });
    // 電話番号
    const validResultPhone: boolean = checkPhoneValidation();
    // 郵便番号（数字と桁数チェック。実際に存在するかどうかは外部APIコール部分で判定）
    const validResultPost: boolean = checkPostalcodeValid();
    // 住所（郵便番号検索語、自動入力）
    const validResultAddress: boolean = checkAddressValid();
    // バリデーションエラーの場合は登録処理しない
    if (
      !validResultPw ||
      !validResultPhone ||
      !validResultFirstname ||
      !validResultLastName ||
      !validResultPost ||
      !validResultAddress ||
      !validResultBirthDate
    ) {
      return;
    }

    // emailとpasswordをFirebase Authenticationに送信、登録

    auth
      .createUserWithEmailAndPassword(emailIns, password)
      .then(() => {
        showMessage({ title: "登録に成功しました", status: "success" });
        history.push("/home");
      })
      .catch((error) => {
        // Firebase側でのバリデーションチェックとエラーハンドリング
        showMessage({ title: "登録に失敗しました", status: "error" });
        console.log(error.code);
        if (error.code === "auth/invalid-email") {
          setErrMessage("正しい形式でメールアドレスを入力してください");
        } else if (error.code === "auth/user-disabled") {
          setErrMessage("アカウントが無効です");
        } else if (error.code === "auth/email-already-in-use") {
          setErrMessage("既に登録されているアカウントです");
        } else if (error.code === "auth/weak-password") {
          setErrMessage("パスワードは６文字以上で入力してください");
        } else if (error.code === "auth/too-many-requests") {
          setErrMessage("パスワードを何度も間違っています");
        } else {
          console.log(`エラー：${error}`);
        }
      });
  };

  // 入力された郵便番号をuseStateにセット
  const onChangePostcode = (e: ChangeEvent<HTMLInputElement>) => {
    setPostcode(e.target.value);
    setPostalcodeGlobal(e.target.value);
  };
  // 入力されたパスワードをuseStateにセット
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  // 再入力されたパスワードをuseStateにセット
  const onChangeRePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setRePassword(e.target.value);
  };

  // パスワード表示制御用のuseState
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [password, setPassword] = useState<string>("");
  // 再入力パスワード用のuseState
  const [rePassword, setRePassword] = useState<string>("");
  const [postcode, setPostcode] = useState<string>("");

  return (
    <>
      <Flex align="center" justify="center" padding="10">
        <DelayMotion>
          <Heading as="h1" size="md" textAlign="center">
            新規ユーザー登録
          </Heading>
          <Divider my={4} />
          {/**氏名入力フォーム */}

          <Stack spacing={3} py={4} px={10}>
            <DelayMotionChild>
              <Flex align="center" justifyContent="space-between">
                <Box w="47.5%">
                  <NormalForm
                    formLabel="氏"
                    isRequiredFlag={true}
                    placeholder="例：鈴木"
                    inputType="firstName"
                  />
                </Box>
                <Box w="47.5%">
                  <NormalForm
                    formLabel="名"
                    isRequiredFlag={true}
                    placeholder="例：太郎"
                    inputType="lastName"
                  />
                </Box>
              </Flex>
              {errMessageFirstName ? (
                <Box fontSize="sm" color="red.400" fontWeight="bold">
                  {errMessageFirstName}
                </Box>
              ) : (
                ""
              )}
              {errMessageLastName ? (
                <Box fontSize="sm" color="red.400" fontWeight="bold">
                  {errMessageLastName}
                </Box>
              ) : (
                ""
              )}
            </DelayMotionChild>
            <DelayMotionChild>
              {/**生年月日フォームカレンダー */}
              <MaterialDatePicker />
              {errMessageBirthDate ? (
                <Box fontSize="sm" color="red.400" fontWeight="bold">
                  {errMessageBirthDate}
                </Box>
              ) : (
                ""
              )}
            </DelayMotionChild>
            <DelayMotionChild>
              {/**メールアドレス入力フォーム */}
              <IconForm
                formLabel="メールアドレス"
                isRequiredFlag={true}
                placeholder="example@gmail.com"
                leftIcon={<EmailIcon color="gray.300" />}
                inputType="email"
              />
            </DelayMotionChild>
            <DelayMotionChild>
              {/**パスワードフォーム */}
              <FormControl isRequired>
                <FormLabel>パスワード</FormLabel>
                <InputGroup size="md">
                  <InputLeftElement
                    pointerEvents="none"
                    children={<UnlockIcon color="gray.300" />}
                  ></InputLeftElement>
                  <Input
                    placeholder="パスワードを入力してください"
                    type={show ? "text" : "password"}
                    onChange={onChangePassword}
                  />
                  <InputRightElement width="3rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </DelayMotionChild>
            <DelayMotionChild>
              {/**パスワード再入力フォーム */}
              <FormControl isRequired>
                <InputGroup size="md">
                  <InputLeftElement
                    pointerEvents="none"
                    children={<UnlockIcon color="gray.300" />}
                  ></InputLeftElement>
                  <Input
                    placeholder="パスワードを再入力してください"
                    type={show ? "text" : "password"}
                    onChange={onChangeRePassword}
                    onBlur={() =>
                      checkPwValidation({
                        password: password,
                        rePassword: rePassword,
                      })
                    }
                  />
                </InputGroup>
              </FormControl>
              {errMessagePw ? (
                <Box fontSize="sm" color="red.400" fontWeight="bold">
                  {errMessagePw}
                </Box>
              ) : (
                ""
              )}
            </DelayMotionChild>
            <DelayMotionChild>
              {/**電話番号フォーム */}
              <IconForm
                formLabel="電話番号"
                isRequiredFlag={false}
                placeholder="例：09012345678"
                inputType="phone"
                leftIcon={<PhoneIcon color="gray.300" />}
              />

              {errMessagePhone ? (
                <Box fontSize="sm" color="red.400" fontWeight="bold">
                  {errMessagePhone}
                </Box>
              ) : (
                ""
              )}
            </DelayMotionChild>
            <Divider height="5" />
            <DelayMotionChild>
              {/**郵便番号入力フォーム
               * 検索ボタン押下で郵便番号検索APIをコール
               */}
              <Box w={{ md: "60%", sm: "100%" }}>
                <FormControl isRequired>
                  <FormLabel>郵便番号</FormLabel>
                  <InputGroup size="md">
                    <InputLeftElement
                      pointerEvents="none"
                      children={<SearchIcon color="gray.300" />}
                    />
                    <Input
                      placeholder="郵便番号を入力"
                      onChange={onChangePostcode}
                      onBlur={() => getAddress(postcode)}
                    />
                    <InputRightElement width="4rem">
                      <Button
                        h="1.75rem"
                        size="sm"
                        onClick={() => getAddress(postcode)}
                      >
                        <Box>検索</Box>
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </Box>
              {errMessagePost ? (
                <Box fontSize="sm" color="red.400" fontWeight="bold">
                  {errMessagePost}
                </Box>
              ) : (
                ""
              )}
            </DelayMotionChild>

            <DelayMotionChild>
              <FormControl isRequired>
                <FormLabel>都道府県</FormLabel>
                <InputGroup size="md">
                  <Input
                    placeholder="例：東京都"
                    value={prefecture}
                    variant="filled"
                  />
                </InputGroup>
              </FormControl>
            </DelayMotionChild>

            <DelayMotionChild>
              <FormControl isRequired>
                <FormLabel>市町区</FormLabel>
                <InputGroup size="md">
                  <Input
                    placeholder="例：千代田区"
                    value={address1}
                    variant="filled"
                  />
                </InputGroup>
              </FormControl>
            </DelayMotionChild>

            <DelayMotionChild>
              <Flex align="center" justifyContent="space-between">
                <Box w="35%">
                  <FormControl isRequired>
                    <FormLabel>番地</FormLabel>
                    <InputGroup size="md">
                      <Input
                        placeholder="例：千代田"
                        value={address2}
                        variant="filled"
                        onFocus={() => {
                          console.log("郵便番号を入力してください");
                        }}
                      />
                    </InputGroup>
                  </FormControl>
                </Box>
                <Box w="60%">
                  <NormalForm
                    formLabel="番地以降"
                    isRequiredFlag={false}
                    placeholder="例：千代田レジデンス201"
                    inputType="address3"
                  />
                </Box>
              </Flex>
              {errMessageAddress ? (
                <Box fontSize="sm" color="red.400" fontWeight="bold">
                  {errMessageAddress}
                </Box>
              ) : (
                ""
              )}
            </DelayMotionChild>

            <Divider height="5" />

            <Button
              onClick={onRegister}
              disabled={false}
              backgroundColor={{ md: "teal.400", sm: "gray.100" }}
              color="white"
              _hober={{ opacity: 0.8 }}
            >
              登録
            </Button>
            <Box fontSize="sm" color="red.400" fontWeight="bold">
              {errMessage ?? { errMessage }}
            </Box>
          </Stack>
        </DelayMotion>
      </Flex>
    </>
  );
});
