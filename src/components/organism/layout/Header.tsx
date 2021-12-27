import { Box, Flex, Heading, Link } from "@chakra-ui/layout";
import { useDisclosure, Divider, Stack, Center } from "@chakra-ui/react";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import { useHistory } from "react-router";
import { useRecoilValue } from "recoil";
import { authState } from "../../../providers/LoginUserProvider";
import { MenuIconButton } from "../../atoms/button/MenuIconButton";
import { MenuDrawer } from "../../molecules/MenuDrawer";
import { LogoutBtn } from "../../molecules/button/LogoutBtn";
import { LoginBtn } from "../../molecules/button/LoginBtn";
import { ScrollMotion } from "../../../motion/ScrollMotion";
import { UserState } from "../../../store/store";
import { User } from "../../../types/user";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase";
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
  const onClickMypage = useCallback(() => history.push("/home"), [history]);

  // Redux dispatchを定義
  const dispatch = useDispatch();
  // 最終ログイン日
  const [lastDate, setLastDate] = useState<string | null>(null);

  useEffect(() => {
    const lastTime = localStorage.getItem("USER_LASTLOGIN");
    setLastDate(lastTime);
        const db = firebase.firestore();
    // collection 'recipes' を参照
    const myColRef = db.collection("users");

    // 取得したdataの格納用
    let dataValue;
    myColRef.onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        dataValue = doc.data();
        if (dataValue.uid === userState?.uid) {
          console.log(dataValue);
          // ReduxにFirebaseから取得した情報を格納
          dispatch({
            type: "REGISTER_USER",
            user: {
              uid: dataValue.uid,
              firstName: dataValue.firstName,
              lastName: dataValue.lastName,
              email: dataValue.email,
              phone: dataValue.phone,
              birthDate: dataValue.birthDate,
              address: {
                postalcode: dataValue.address?.postalcode,
                prefecture: dataValue.address?.prefecture,
                address1: dataValue.address?.address1,
                address2: dataValue.address?.address2,
                address3: dataValue.address?.address3,
              },
            },
          });
        } else {
          return;
        }
      });
    });
  }, []);

  // Reduxからステートを取得
  const userChangeInfo = useSelector((state: User) => state);

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
          <Stack
            spacing={1}
            position="absolute"
            right={{ base: "2vh", md: "50" }}
            top={{ base: "7vh", md: "70" }}
            fontSize={{ base: "11", md: "13" }}
          >
            <Box>
              {userState?.uid &&
                userChangeInfo.firstName &&
                `${userChangeInfo.firstName} ${userChangeInfo.lastName} 様`}
            </Box>
            <Divider />
            <Box>
              {userState?.uid && lastDate && `最終ログイン日：${lastDate}`}
            </Box>
          </Stack>
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
          <Box pr={4}>
            {userState?.uid && (
              <ScrollMotion>
                <Link onClick={onClickMypage}>HOME</Link>
              </ScrollMotion>
            )}
          </Box>
        </Flex>
        <Box marginTop="-8vh">
          <MenuIconButton onOpen={onOpen} />
        </Box>
        <MenuDrawer
          onClose={onClose}
          isOpen={isOpen}
          onClickHome={onClickHome}
          onClickUserManagement={onClickUserManagement}
          onClickSetting={onClickSetting}
          onClickSignUp={onClickSignUp}
          onClickMypage={onClickMypage}
        />
      </Flex>
    </>
  );
});
