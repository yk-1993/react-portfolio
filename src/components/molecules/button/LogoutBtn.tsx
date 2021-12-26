import { Button } from "@chakra-ui/button";
import { memo, VFC } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useSetRecoilState } from "recoil";
import { auth } from "../../../firebase";
import { useMessage } from "../../../hooks/useMessage";
import { authState } from "../../../providers/LoginUserProvider";

export const LogoutBtn: VFC = memo(() => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const setUserState = useSetRecoilState(authState);
  const dispatch = useDispatch();

  const logout = () => {
    showMessage({ title: "ログアウトしました", status: "info" });
    // Firebase側の認証からサインアウト
    auth.signOut();
    // フロント側で保持しているユーザ情報を初期化
    // Recoil
    setUserState(null);
    // Redux
    dispatch({
      type: "DELETE_USER",
    });
    // ログアウト後はログイン画面に遷移
    history.push("/login");
    setTimeout(() => {
      history.go(0);
    }, 0);
  };
  return (
    <Button
      backgroundColor="#fff"
      onClick={logout}
      fontSize="sm"
      borderRadius="0"
      _hover={{
        borderBottom: "1px solid #222",
      }}
    >
      ログアウト
    </Button>
  );
});
