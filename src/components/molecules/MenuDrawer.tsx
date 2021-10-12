import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Button,
} from "@chakra-ui/react";
import { memo, VFC } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onClickHome: () => void;
  onClickUserManagement: () => void;
  onClickSetting: () => void;
};

export const MenuDrawer: VFC<Props> = memo((props) => {
  const {
    onClose,
    isOpen,
    onClickHome,
    onClickSetting,
    onClickUserManagement,
  } = props;
  return (
    <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerBody p={0} bg="gray.100">
            <Button w={"100%"} onClick={onClickHome}>
              TOP
            </Button>
            <Button w={"100%"} onClick={onClickUserManagement}>
              ユーザー一覧
            </Button>
            <Button w={"100%"} onClick={onClickSetting}>
              設定
            </Button>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
});
