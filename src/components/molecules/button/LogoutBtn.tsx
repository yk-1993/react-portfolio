import { Button } from "@chakra-ui/button";
import { memo, VFC } from "react";
import { useHistory } from "react-router";
import { useSetRecoilState } from "recoil";
import { auth } from "../../../firebase";
import { useMessage } from "../../../hooks/useMessage";
import { authState } from "../../../providers/LoginUserProvider";

export const LogoutBtn: VFC = memo(() => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const setUserState = useSetRecoilState(authState);

  const logout = () => {
    // Firebase側の認証からサインアウト
    auth.signOut();
    // フロント側で保持しているユーザ情報を初期化
    setUserState(null);
    // ログアウト後はログイン画面に遷移
    history.push("/login");
    showMessage({ title: "ログアウトしました", status: "info" });
  };
  return (
    <Button
      backgroundColor={{ md: "white", sm: "gray.100" }}
      onClick={logout}
      fontSize="sm"
      w={{ md: "auto", sm: "100%" }}
      border="2px solid white"
      _hover={{
        backgroundColor: "#222",
        color: "gray.100",
      }}
    >
      ログアウト
    </Button>
  );
});
