import {
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
} from "@chakra-ui/input";
import { Box, Divider, Flex, Heading, Stack } from "@chakra-ui/layout";
import { memo, useRef, useState, VFC, ChangeEvent, useEffect } from "react";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authState } from "../../providers/LoginUserProvider";
import firebase from "firebase";
import { useHistory } from "react-router";
import { useMessage } from "../../hooks/useMessage";
import { Button } from "@chakra-ui/button";
import { EmailIcon, UnlockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { UserInfoProvider } from "../../providers/UserInfoProvider";
import { DelayMotionChild } from "../../motion/DelaymotionChild";
import { DelayMotionPopup } from "../../motion/DelaymotionPopup";

export const Login: VFC = memo(() => {
  // Firebase認証用グローバルステート
  const setUserState = useSetRecoilState(authState);
  // フロント側画面間連携情報用グローバルステート
  const [user] = useRecoilState(UserInfoProvider);
  useEffect(() => {
    console.log(user);
  }, []);

  const { showMessage } = useMessage();

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
  // エラーメッセージ用 useState
  const [errMessage, setErrMessage] = useState<string>("");

  // Password 表示制御用のuseState
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

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
          if (authState) {
            showMessage({ title: "ログインに成功しました", status: "success" });
            history.push("/home");

            // 現在日時を取得・フォーマット後にローカルストレージに保存
            var date = new Date();
            const formatDate = (date) => {
              let formatted_date =
                date.getFullYear() +
                "年" +
                (date.getMonth() + 1) +
                "月" +
                date.getDate() +
                "日";
              return formatted_date;
            };
            localStorage.setItem("USER_LASTLOGIN", formatDate(date).toString());
          }
        }
      } catch (error: any) {
        if (error.code === "auth/invalid-email") {
          setErrMessage("正しい形式でメールアドレスを入力してください");
        } else if (error.code === "auth/user-disabled") {
          setErrMessage("アカウントが無効です");
        } else if (error.code === "auth/user-not-found") {
          setErrMessage("アカウントが存在しません");
        } else if (error.code === "auth/wrong-password") {
          setErrMessage("パスワードが間違っています");
        } else if (error.code === "auth/too-many-requests") {
          setErrMessage("パスワードを何度も間違っています");
        } else {
          console.log(`エラー：${error}`);
        }
        showMessage({ title: "ログインに失敗しました", status: "error" });
      }
    }
  };
  return (
    <Flex align="center" justify="center" minHeight="70vh">
      <DelayMotionPopup>
        <Heading as="h1" size="md" textAlign="center">
          ログイン
        </Heading>
        <Divider my={4} />
        <Stack spacing={3} py={4} px={{ base: 0, sm: 10 }}>
          <DelayMotionChild>
            <InputGroup size="md">
              <InputLeftElement
                pointerEvents="none"
                children={<EmailIcon color="gray.300" />}
              ></InputLeftElement>
              <Input
                placeholder="メールアドレス"
                ref={inputEmailRef}
                value={email}
                onChange={onChangeEmail}
              />
            </InputGroup>
          </DelayMotionChild>
          <DelayMotionChild>
            <InputGroup size="md">
              <InputLeftElement
                pointerEvents="none"
                children={<UnlockIcon color="gray.300" />}
              ></InputLeftElement>
              <Input
                placeholder="パスワード"
                type={show ? "text" : "password"}
                ref={inputPasswordRef}
                value={password}
                onChange={onChangePassword}
              />
              <InputRightElement width="3rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </DelayMotionChild>

          <DelayMotionChild>
            <PrimaryButton
              onClick={onClickLogin}
              disabled={email === "" || password === ""}
            >
              ログイン
            </PrimaryButton>
          </DelayMotionChild>
          <Box fontSize="sm" color="red.400" fontWeight="bold">
            {errMessage ?? { errMessage }}
          </Box>
        </Stack>
      </DelayMotionPopup>
    </Flex>
  );
});
