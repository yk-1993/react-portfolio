import { Button } from "@chakra-ui/button";
import { memo, VFC } from "react";
import { useHistory } from "react-router";
type Props = {
  onClose?: () => void;
};
export const LoginBtn: VFC<Props> = memo((props) => {
  const history = useHistory();
  const login = () => {
    // ログイン画面に遷移
    history.push("/login");
  };

  const { onClose } = props;
  return (
    <Button
      backgroundColor="#fff"
      onClick={() => {
        login();
        onClose && onClose();
      }}
      fontSize="sm"
      w="100%"
      borderRadius="0"
      boxSizing="border-box"
      _hover={{
        borderBottom: "1px solid #222",
      }}
    >
      ログイン
    </Button>
  );
});
