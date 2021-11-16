import { Box, Flex, Heading, Link } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/react";
import { memo, useCallback, VFC } from "react";
import { useHistory } from "react-router";
import { useRecoilValue } from "recoil";
import { authState } from "../../../providers/LoginUserProvider";
import { MenuIconButton } from "../../atoms/button/MenuIconButton";
import { MenuDrawer } from "../../molecules/MenuDrawer";
import { LogoutBtn } from "../../molecules/button/LogoutBtn";
import { LoginBtn } from "../../molecules/button/LoginBtn";
import { ScrollMotion } from "../../../motion/ScrollMotion";

export const Header: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();
  const onClickHome = useCallback(() => history.push("/"), [history]);
  const onClickUserManagement = useCallback(
    () => history.push("/home/user_management"),
    [history]
  );
  const onClickSetting = useCallback(
    () => history.push("/home/setting"),
    [history]
  );
  const userState = useRecoilValue(authState);

  const onClickSignUp = useCallback(() => history.push("/signup"), [history]);
  return (
    <>
      <Flex
        as="nav"
        backgroundColor="white"
        color="#222"
        align="center"
        justify="space-between"
        padding={{ base: "3", md: "5" }}
        height="15vh"
        borderBottom="1px solid #222"
        // position="fixed"
        // width="100%"
        // zIndex="100"
      >
        <Flex
          align="center"
          as="a"
          mr={8}
          _hover={{ cursor: "pointer" }}
          onClick={onClickHome}
        >
          <ScrollMotion>
            <Heading as="h1" fontSize={{ base: "md", md: "lg" }}>
              TOP
            </Heading>
          </ScrollMotion>
        </Flex>
        <Flex
          align="center"
          fontSize="sm"
          flexGrow={1}
          display={{ base: "none", md: "flex" }}
        >
          <Box pr={4}>
            {userState?.uid ? (
              <ScrollMotion>
                <LogoutBtn />
              </ScrollMotion>
            ) : (
              <ScrollMotion>
                <LoginBtn />
              </ScrollMotion>
            )}
          </Box>
          <Box pr={4}>
            {userState?.uid ? (
              ""
            ) : (
              <ScrollMotion>
                <Link onClick={onClickSignUp}>新規登録</Link>
              </ScrollMotion>
            )}
          </Box>
          {/* <Box pr={4}>
            <Link onClick={onClickUserManagement}>ユーザー一覧</Link>
          </Box>
          <Box pr={4}>
            <Link onClick={onClickSetting}>設定</Link>
          </Box> */}
        </Flex>
        <MenuIconButton onOpen={onOpen} />
        <MenuDrawer
          onClose={onClose}
          isOpen={isOpen}
          onClickHome={onClickHome}
          onClickUserManagement={onClickUserManagement}
          onClickSetting={onClickSetting}
          onClickSignUp={onClickSignUp}
        />
      </Flex>
    </>
  );
});
