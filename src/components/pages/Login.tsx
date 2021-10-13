import { Input } from "@chakra-ui/input";
import { Box, Divider, Flex, Heading, Stack } from "@chakra-ui/layout";
import { memo, useRef, useState, VFC, ChangeEvent } from "react";
import { useAuth } from "../../hooks/useAuth";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useRecoilState } from "recoil";
import { authState } from "../../providers/LoginUserProvider";
import firebase from "firebase";
import { useHistory } from "react-router";
import { UseMessage } from "../../hooks/useMessage";

export const Login: VFC = memo(() => {
  const { login, loading } = useAuth();
  const [userState, setUserState] = useRecoilState(authState);
  const { showMessage } = UseMessage();

  // useRefを定義
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);
  const history = useHistory();

  // InputフォームのステートをuseStateで管理
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // ログインボタン押下時、inputに値が入っていた場合、認証処理を行う
  const onClickLogin = async () => {
    if (
      inputEmailRef.current?.value !== undefined &&
      inputPasswordRef.current?.value !== undefined
    ) {
      try {
        const auth = await firebase
          .auth()
          // Firebaseに値を送信。
          .signInWithEmailAndPassword(
            inputEmailRef.current.value,
            inputPasswordRef.current.value
          );
        //Firebaseからの値 auth.userに値が入っていた場合、TOP画面に遷移
        if (auth.user) {
          setUserState(auth.user);
          history.push("/home");
          showMessage({ title: "ログインに成功しました", status: "success" });
          console.log(userState);
        }
      } catch (e) {
        // handle error
        console.log(`エラー：${e}`);
        showMessage({ title: "ログインに失敗しました", status: "error" });
      }
    }
  };
  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="md" textAlign="center">
          ログイン画面
        </Heading>
        <Divider my={4} />
        <Stack spacing={3} py={4} px={10}>
          <Input
            placeholder="メールアドレス"
            ref={inputEmailRef}
            value={email}
            onChange={onChangeEmail}
          />
          <Input
            placeholder="パスワード"
            ref={inputPasswordRef}
            value={password}
            onChange={onChangePassword}
          />
          <PrimaryButton
            onClick={onClickLogin}
            loading={loading}
            disabled={email === "" || password === ""}
          >
            ログイン
          </PrimaryButton>
        </Stack>
      </Box>
    </Flex>
  );
});
