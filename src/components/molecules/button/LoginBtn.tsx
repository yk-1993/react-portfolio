import { Button } from "@chakra-ui/button";
import { memo, VFC } from "react";
import { useHistory } from "react-router";
import { UseMessage } from "../../../hooks/useMessage";
export const LoginBtn: VFC = memo(() => {
  const history = useHistory();
  const { showMessage } = UseMessage();

  const login = () => {
    // ログイン画面に遷移
    history.push("/login");
    // showMessage({ title: "ログアウトしました", status: "success" });
  };
  return (
    <Button
      backgroundColor={{ md: "teal.400", sm: "gray.100" }}
      onClick={login}
      fontSize="sm"
      w={{ md: "auto", sm: "100%" }}
    >
      ログイン
    </Button>
  );
});
