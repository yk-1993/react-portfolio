import { Button } from "@chakra-ui/button";
import { memo, VFC } from "react";
import { useHistory } from "react-router";
export const LoginBtn: VFC = memo(() => {
  const history = useHistory();
  const login = () => {
    // ログイン画面に遷移
    history.push("/login");
  };
  return (
    <Button
      backgroundColor={{ md: "white", sm: "gray.100" }}
      onClick={login}
      fontSize="sm"
      w={{ md: "auto", sm: "100%" }}
      border="2px solid white"
    >
      ログイン
    </Button>
  );
});
