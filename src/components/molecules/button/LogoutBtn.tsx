import { Button } from "@chakra-ui/button";
import { memo, VFC } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useSetRecoilState } from "recoil";
import { auth } from "../../../firebase";
import { useMessage } from "../../../hooks/useMessage";
import { authState } from "../../../providers/LoginUserProvider";

type Props = {
  onClose?: () => void;
};
export const LogoutBtn: VFC<Props> = memo((props) => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const setUserState = useSetRecoilState(authState);
  const dispatch = useDispatch();

  const { onClose } = props;

  const logout = () => {
    showMessage({ title: "ログアウトしました", status: "info" });

    // ログアウト日を記録
    // 現在日時を取得・フォーマット後にローカルストレージに保存
    var date = new Date();
    const formatDate = (date) => {
      let formatted_date =
        date.getFullYear() +
        "年" +
        (date.getMonth() + 1) +
        "月" +
        date.getDate() +
        "日　" +
        date.getHours() +
        "時" +
        date.getMinutes() +
        "分"
      return formatted_date;
    };
    localStorage.setItem("USER_LASTLOGIN", formatDate(date).toString());
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
      onClick={() => {
        logout();
        onClose && onClose();
      }}
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
