import { Button } from "@chakra-ui/button";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/layout";
import { memo, useEffect, VFC } from "react";
import { useRecoilValue } from "recoil";
import { authState } from "../../providers/LoginUserProvider";
import { useHistory } from "react-router";
import store from "../../index";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { UserState } from "../../store/store";
import { UserInfoBadge } from "../molecules/user/UserInfoBadge";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";

export const Home: VFC = memo(() => {
  const userState = useRecoilValue(authState);
  const history = useHistory();
  const onClickInfo = () => {
    console.log(`Redux:`);
    console.log(store.getState());
  };
  const redirect = () => {
    history.push("/login");
  };
  // Redux dispatchを定義
  const dispatch = useDispatch();

  // Reduxからステートを取得
  const userInfo = useSelector((state: UserState) => state);

  // モーダル用のディスクロージャを定義
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const db = firebase.firestore();
    // collection 'recipes' を参照
    const myColRef = db.collection("users");

    // 取得したdataの格納用
    let dataValue;
    myColRef.onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        dataValue = doc.data();
        if (dataValue.uid === userState?.uid) {
          console.log("FireStoreから取得:");
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
                postalcode: dataValue.address.postalcode,
                prefecture: dataValue.address.prefecture,
                address1: dataValue.address.address1,
                address2: dataValue.address.address2,
                address3: dataValue.address.address3,
              },
            },
          });
        } else {
          return;
        }
      });
    });
  }, [userState?.uid, dispatch]);

  return (
    <>
      {userState ? (
        <Box height="100%" minHeight="75vh">
          <Grid
            h="100%"
            minHeight="75vh"
            templateRows={{ base: "repeat(3,1fr)", md: "repeat(2,1fr)" }}
            templateColumns={{ base: "repeat(4,1fr)", md: "repeat(4,1fr)" }}
            gap={4}
            p={10}
            bgColor="gray.200"
          >
            <GridItem
              rowSpan={2}
              colSpan={{ base: 4, md: 3 }}
              p={10}
              bgColor="#fff"
            >
              <Text mb={5} fontWeight="bold">
                ユーザ情報
              </Text>
              <Box borderLeft="2px solid #13ab6a" pl={5}>
                <Stack direction="column" height="100%" p={3}>
                  <Flex flexDirection="column">
                    <Stack
                      spacing={5}
                      divider={<StackDivider borderColor="gray.200" />}
                    >
                      <UserInfoBadge userInfo={userInfo.firstName}>
                        氏
                      </UserInfoBadge>
                      <UserInfoBadge userInfo={userInfo.lastName}>
                        名
                      </UserInfoBadge>
                      <UserInfoBadge userInfo={userInfo.birthDate}>
                        生年月日
                      </UserInfoBadge>
                      <UserInfoBadge userInfo={userInfo.email}>
                        メールアドレス
                      </UserInfoBadge>
                      <UserInfoBadge userInfo={userInfo.phone}>
                        電話番号
                      </UserInfoBadge>
                      <UserInfoBadge userInfo={userInfo.address?.postalcode}>
                        郵便番号
                      </UserInfoBadge>
                      <UserInfoBadge
                        userInfo={`${userInfo.address?.prefecture}
                         ${userInfo.address?.address1} 
                         ${userInfo.address?.address2} 
                         ${userInfo.address?.address3}`}
                      >
                        住所
                      </UserInfoBadge>
                    </Stack>
                  </Flex>
                </Stack>
              </Box>
              <Button
                m="2em auto"
                w={{ base: "100%", md: "200px" }}
                border="1px solid teal"
                bgColor="white"
                color="teal.500"
                _hover={{ opacity: "0.5" }}
                onClick={onOpen}
                float="right"
              >
                登録情報変更
              </Button>
            </GridItem>
            <GridItem rowSpan={1} colSpan={{ base: 2, md: 1 }} p={10} bg="#FFF">
              <Button
                w="100%"
                bgColor="teal.500"
                color="white"
                _hover={{ bgGradient: "linear(to-r,green.100,teal.200)" }}
                onClick={onClickInfo}
              >
                Redux 保持情報取得
              </Button>
            </GridItem>
            <GridItem
              rowSpan={1}
              colSpan={{ base: 2, md: 1 }}
              bg="#FFF"
              p={10}
            ></GridItem>
          </Grid>
        </Box>
      ) : (
        redirect()
      )}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>登録情報変更</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input placeholder="First name" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder="Last name" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3}>
              変更
            </Button>
            <Button onClick={onClose}>キャンセル</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
});
