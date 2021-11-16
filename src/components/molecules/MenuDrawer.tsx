import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Button,
  Flex,
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
  const { onClose, isOpen, onClickHome, onClickSignUp } = props;
  const userState = useRecoilValue(authState);
  return (
    <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerBody
            p={0}
            bg="white"
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Button
              w={"100%"}
              onClick={onClickHome}
              borderRadius={0}
              backgroundColor="#fff"
              _hover={{
                borderBottom: "1px solid #222",
              }}
            >
              TOP
            </Button>
            {/** ログイン状態によってボタンの出し分け制御 */}
            {userState ? <LogoutBtn /> : <LoginBtn />}
            <Button
              w={"100%"}
              backgroundColor="#fff"
              onClick={onClickSignUp}
              borderRadius={0}
              _hover={{
                borderBottom: "1px solid #222",
              }}
            >
              新規登録
            </Button>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
});
