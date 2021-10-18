import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { EmailIcon, UnlockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/input";
import { Box, Divider, Flex, Heading, Stack } from "@chakra-ui/layout";
import { ChangeEvent, memo, useState, VFC } from "react";
import { useHistory } from "react-router";
import { useRecoilState } from "recoil";
import { auth } from "../../firebase";
import { MaterialDatePicker } from "../../hooks/MaterialDatePicker";
import { UseMessage } from "../../hooks/useMessage";
import { UseSetInput } from "../../hooks/useSetInput";
import { UserInfoProvider } from "../../providers/UserInfoProvider";
import { IconForm } from "../molecules/form/IconForm";
import { NormalForm } from "../molecules/form/NormalForm";

// 新規ユーザ登録画面

export const SignUp: VFC = memo(() => {
  // 画面遷移用のhooksを定義
  const history = useHistory();
  // エラーメッセージ用 useState
  const [errMessage, setErrMessage] = useState<string>("");

  // ローカルにユーザー情報を登録
  const { setRegisterUser } = UseSetInput();
  // メッセージトースト

  const { showMessage } = UseMessage();
  // フロント側画面間連携情報用グローバルステート
  const [user, setUser] = useRecoilState(UserInfoProvider);

  //登録ボタン押下
  const onRegister = () => {
    // フロント側でのバリデーションチェック
    const validResult = checkPwValidation();
    // バリデーションエラーの場合は登録処理しない
    if (!validResult) {
      return;
    }

    console.log("登録");
    console.log(email);
    auth
      // emailとpasswordをFirebase Authenticationに送信、登録
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        showMessage({ title: "登録に成功しました", status: "success" });
        history.push("/");
      })
      // Firebase側でのバリデーションチェックとエラーハンドリング
      .catch((error) => {
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

  const checkPwValidation = (): boolean => {
    // パスワード再入力用バリデーション
    if (password === rePassword) {
      return true;
    } else {
      setErrMessage("再入力されたパスワードが一致しません");
      return false;
    }
  };

  // 入力されたメールアドレスをuseStateにセット
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
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

  // メールアドレス、パスワード用のuseState
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // 再入力パスワード用のuseState
  const [rePassword, setRePassword] = useState<string>("");

  return (
    <>
      <Flex align="center" justify="center" height="100vh">
        <Box bg="white" w="lg" p={4} borderRadius="md" shadow="md">
          <Heading as="h1" size="md" textAlign="center">
            新規ユーザー登録
          </Heading>
          <Divider my={4} />
          {/**氏名入力フォーム */}
          <Stack spacing={3} py={4} px={10}>
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
            {/**生年月日フォームカレンダー */}
            <MaterialDatePicker />

            <IconForm
              formLabel="メールアドレス"
              isRequiredFlag={true}
              placeholder="example@gmail.com"
              leftIcon={<EmailIcon color="gray.300" />}
              inputType="email"
            />

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
                />
              </InputGroup>
            </FormControl>
            <Button onClick={onRegister} disabled={false}>
              登録
            </Button>
            <Box fontSize="sm" color="red.400" fontWeight="bold">
              {errMessage ?? { errMessage }}
            </Box>
            <Button onClick={setRegisterUser}>TEST</Button>
          </Stack>
        </Box>
      </Flex>
    </>
  );
});
