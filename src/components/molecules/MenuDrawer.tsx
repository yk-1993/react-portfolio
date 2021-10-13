import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Button,
} from "@chakra-ui/react";
import { memo, VFC } from "react";
import { LogoutBtn } from "./button/LogoutBtn";
import { LoginBtn } from "./button/LoginBtn";
import { useRecoilValue } from "recoil";
import { authState } from "../../providers/LoginUserProvider";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onClickHome: () => void;
  onClickUserManagement: () => void;
  onClickSetting: () => void;
  onClickSignUp: () => void;
};

export const MenuDrawer: VFC<Props> = memo((props) => {
  const {
    onClose,
    isOpen,
    onClickHome,
    onClickSetting,
    onClickUserManagement,
    onClickSignUp,
  } = props;
  const userState = useRecoilValue(authState);
  return (
    <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerBody p={0} bg="gray.100">
            <Button w={"100%"} onClick={onClickHome} borderRadius={0}>
              TOP
            </Button>
            {/** ログイン状態によってボタンの出し分け制御 */}
            {userState ? <LogoutBtn /> : <LoginBtn />}
            <Button w={"100%"} onClick={onClickSignUp} borderRadius={0}>
              新規登録
            </Button>
            <Button w={"100%"} onClick={onClickUserManagement} borderRadius={0}>
              ユーザー一覧
            </Button>
            <Button w={"100%"} onClick={onClickSetting} borderRadius={0}>
              設定
            </Button>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
});
