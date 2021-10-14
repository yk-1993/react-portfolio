import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Box, Divider, Flex, Heading, Stack } from "@chakra-ui/layout";
import { ChangeEvent, memo, useState, VFC } from "react";
import { auth } from "../../firebase";

export const SignUp: VFC = memo(() => {
  // エラーメッセージ用 useState
  const [errMessage, setErrMessage] = useState<string>("");

  //登録ボタン押下
  const onRegister = () => {
    console.log("登録");
    console.log(email);
    console.log(password);
    auth.createUserWithEmailAndPassword(email, password).catch((error) => {
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
    });
  };

  // 入力されたメールアドレスをuseStateにセット
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  // 入力されたパスワードをuseStateにセット
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <>
      {/* <div>
        <h1>ユーザ登録</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>メールアドレス</label>
            <input name="email" type="email" placeholder="email" />
          </div>
          <div>
            <label>パスワード</label>
            <input name="password" type="password" />
          </div>
          <div>
            <button>登録</button>
          </div>
        </form>
      </div> */}
      <Flex align="center" justify="center" height="100vh">
        <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
          <Heading as="h1" size="md" textAlign="center">
            新規ユーザー登録
          </Heading>
          <Divider my={4} />
          <Stack spacing={3} py={4} px={10}>
            <Input placeholder="メールアドレス" onChange={onChangeEmail} />
            <Input placeholder="パスワード" onChange={onChangePassword} />
            <Button onClick={onRegister}>登録</Button>{" "}
            <Box fontSize="sm" color="red.400" fontWeight="bold">
              {errMessage ?? { errMessage }}
            </Box>
          </Stack>
        </Box>
      </Flex>
    </>
  );
});
