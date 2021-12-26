import { Button } from "@chakra-ui/button";
import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/layout";
import { ChangeEvent, memo, useEffect, useState, VFC } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
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
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/input";
import { DelayMotionModal } from "../../motion/DelaymotionModal";
import { DelayMotionChild } from "../../motion/DelaymotionChild";
import { NormalForm } from "../molecules/form/NormalForm";
import { MaterialDatePicker } from "../service/MaterialDatePicker";
import { IconForm } from "../molecules/form/IconForm";
import { EmailIcon, PhoneIcon, SearchIcon } from "@chakra-ui/icons";
import { UseValidation } from "../../hooks/useValidation";
import {
  UserInfoAddress1,
  UserInfoAddress2,
  UserInfoAddress3,
  UserInfoBirthDate,
  UserInfoEmail,
  UserInfoFirstName,
  UserInfoLastName,
  UserInfoPhone,
  UserInfoPostalcode,
  UserInfoPrefecture,
  UserInfoProvider,
} from "../../providers/UserInfoProvider";
import { usePostalCodeGetAddress } from "../../hooks/usePostalcodeGetAddress";
import { useMessage } from "../../hooks/useMessage";
import { User } from "../../types/user";
import { UseRegister } from "../../hooks/useRegister";

export const Home: VFC = memo(() => {
  // Reduxからステートを取得
  const userInfo = useSelector((state: UserState) => state);
  const userChangeInfo = useSelector((state: User) => state);
  const userState = useRecoilValue(authState);
  const history = useHistory();
  // Redux dispatchを定義
  const dispatch = useDispatch();
  // 初期処理
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
  }, [userState?.uid, dispatch]);
  const redirect = () => {
    history.push("/login");
  };

  // Modal起動
  const onModal = () => {
    setFisrtName(userChangeInfo.firstName);
    setLastName(userChangeInfo.lastName);
    setTmpPrefecture(userChangeInfo.address.prefecture);
    setTmpPostalcode(userChangeInfo.address.postalcode);
    setTmpAddress1(userChangeInfo.address.address1);
    setTmpAddress2(userChangeInfo.address.address2);
    setTmpAddress3(
      userChangeInfo.address.address3 ? userChangeInfo.address.address3 : "-"
    );
    initErrMsg();
    onOpen();
  };

  // フロント側画面間連携情報ユーザー用、一時保存用のグローバルステートを定義
  const [firstName, setFisrtName] = useRecoilState(UserInfoFirstName);
  const [lastName, setLastName] = useRecoilState(UserInfoLastName);
  const [phone, setPhone] = useRecoilState(UserInfoPhone);
  const [birthDate, setBirthDate] = useRecoilState(UserInfoBirthDate);
  const [tmpPrefecture, setTmpPrefecture] = useRecoilState(UserInfoPrefecture);
  const [tmpPostalcode, setTmpPostalcode] = useRecoilState(UserInfoPostalcode);
  const [tmpAddress1, setTmpAddress1] = useRecoilState(UserInfoAddress1);
  const [tmpAddress2, setTmpAddress2] = useRecoilState(UserInfoAddress2);
  const [tmpAddress3, setTmpAddress3] = useRecoilState(UserInfoAddress3);

  // モーダル用のディスクロージャを定義
  const { isOpen, onOpen, onClose } = useDisclosure();

  // ローカルにユーザー情報を登録
  const { setRegisterUser } = UseRegister();
  // メッセージトースト
  const { showMessage } = useMessage();

  // 郵便番号検索API
  const { getAddress } = usePostalCodeGetAddress();

  // メールアドレス認証用グローバルステート
  const [emailIns] = useRecoilState(UserInfoEmail);

  // 郵便番号検索後、フォームにセットするためのステート定義
  const prefecture = useRecoilValue(UserInfoPrefecture);
  const setPostalcodeGlobal = useSetRecoilState(UserInfoPostalcode);
  const address1 = useRecoilValue(UserInfoAddress1);
  const address2 = useRecoilValue(UserInfoAddress2);
  // バリデーション読込
  const {
    checkFirstNameValid,
    checkLastNameValid,
    checkPhoneValidation,
    checkBirthDateValid,
    checkPostalcodeValid,
    checkAddressValid,
    initErrMsg,
    errMessageFirstName,
    errMessageLastName,
    errMessagePhone,
    errMessageBirthDate,
    errMessagePost,
    errMessageAddress,
  } = UseValidation();
  const setUser = useSetRecoilState(UserInfoProvider);
  // Firebase 認証エラーメッセージ用 useState
  const [errMessage, setErrMessage] = useState<string>("");
  // 入力された郵便番号をuseStateにセット
  const onChangePostcode = (e: ChangeEvent<HTMLInputElement>) => {
    setPostcode(e.target.value);
    setPostalcodeGlobal(e.target.value);
  };
  //登録ボタン押下
  const onRegister = async () => {
    //
    /* フロント側でのバリデーションチェック
     */

    // 名字
    const validResultFirstname: boolean = checkFirstNameValid(false);
    // 名前
    const validResultLastName: boolean = checkLastNameValid(false);
    // 生年月日
    const validResultBirthDate: boolean = checkBirthDateValid(false);

    // 電話番号
    const validResultPhone: boolean = checkPhoneValidation(false);
    // 郵便番号（数字と桁数チェック。実際に存在するかどうかは外部APIコール部分で判定）
    const validResultPost: boolean = checkPostalcodeValid(false);
    // 住所（郵便番号検索語、自動入力）
    const validResultAddress: boolean = checkAddressValid(false);
    // バリデーションエラーの場合は登録処理しない
    if (
      !validResultPhone ||
      !validResultFirstname ||
      !validResultLastName ||
      !validResultPost ||
      !validResultAddress ||
      !validResultBirthDate
    ) {
      return;
    }
    onClose();
    const db = firebase.firestore();
    // collection 'recipes' を参照
    const myColRef = db
      .collection("users")
      .doc(userChangeInfo.uid ? userChangeInfo.uid : undefined);

    // 各ユーザ情報項目がRecoilに値がある場合（ユーザが値を修正した場合）、その値をＤＢに登録。
    // 値が無い場合（ユーザが未修正の場合）、未変更とみなしサーバから取得したReduxの情報をそのまま登録。
    await myColRef.update({
      uid: userChangeInfo.uid,
      firstName: firstName ? firstName : userChangeInfo.firstName,
      lastName: lastName ? lastName : userChangeInfo.lastName,
      email: userChangeInfo.email,
      phone: phone === "" ? phone : phone ? phone : userChangeInfo.phone,
      birthDate: birthDate ? birthDate : userChangeInfo.birthDate,
      address: {
        postalcode: tmpPostalcode
          ? tmpPostalcode
          : userChangeInfo.address.postalcode,
        prefecture: tmpPrefecture
          ? tmpPrefecture
          : userChangeInfo.address.prefecture,
        address1: tmpAddress1 ? tmpAddress1 : userChangeInfo.address.address1,
        address2: tmpAddress2 ? tmpAddress2 : userChangeInfo.address.address2,
        address3: tmpAddress3 ? tmpAddress3 : userChangeInfo.address.address3,
      },
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    showMessage({ title: "登録情報を変更しました", status: "success" });
  };

  const [postcode, setPostcode] = useState<string>("");

  const setPostCodeAwait = async () => {
    setPostcode(userInfo.address.postalcode);
    setPostalcodeGlobal(userInfo.address.postalcode);
    return true;
  };
  // モーダルが開いたときの処理
  useEffect(() => {
    (async () => {
      const pCode = userInfo.address.postalcode;
      if (pCode) {
        await setPostCodeAwait();
        getAddress(pCode);
      }
    })();
  }, [isOpen]);

  return (
    <>
      {userState || userInfo ? (
        <Box height="100%" minHeight="75vh">
          <Grid
            h="100%"
            minHeight="75vh"
            templateRows={{ base: "repeat(3,1fr)", md: "repeat(2,1fr)" }}
            templateColumns={{ base: "repeat(4,1fr)", md: "repeat(4,1fr)" }}
            gap={4}
            p={{ base: 2, md: 10, sm: 2 }}
            bgColor="gray.200"
          >
            <GridItem
              rowSpan={2}
              colSpan={{ base: 4, md: 3 }}
              p={{ base: 5, md: 10, sm: 10 }}
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
                      <UserInfoBadge
                        userInfo={
                          userInfo.address.postalcode
                            ? userInfo.address.postalcode
                            : "-"
                        }
                      >
                        郵便番号
                      </UserInfoBadge>
                      <UserInfoBadge
                        userInfo={`${
                          userInfo.address.prefecture
                            ? userInfo.address.prefecture
                            : "-"
                        }
                         ${
                           userInfo.address.address1
                             ? userInfo.address.address1
                             : "-"
                         } 
                         ${
                           userInfo.address.address2
                             ? userInfo.address.address2
                             : "-"
                         } 
                         ${
                           userInfo.address.address3
                             ? userInfo.address.address3
                             : "-"
                         }`}
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
                onClick={onModal}
                float="right"
              >
                登録情報変更
              </Button>
            </GridItem>
            <GridItem
              rowSpan={1}
              colSpan={{ base: 2, md: 1 }}
              p={10}
              bg="#FFF"
            ></GridItem>
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
            <DelayMotionModal>
              {/**氏名入力フォーム */}
              <Stack spacing={3} py={4} px={10}>
                <DelayMotionChild>
                  <Flex align="center" justifyContent="space-between">
                    <Box w="47.5%">
                      <NormalForm
                        formLabel="氏"
                        isRequiredFlag={true}
                        placeholder="例：鈴木"
                        value={
                          userChangeInfo.firstName
                            ? userChangeInfo.firstName
                            : "-"
                        }
                        inputType="firstName"
                      />
                    </Box>
                    <Box w="47.5%">
                      <NormalForm
                        formLabel="名"
                        isRequiredFlag={true}
                        placeholder="例：太郎"
                        value={
                          userChangeInfo.lastName
                            ? userChangeInfo.lastName
                            : "-"
                        }
                        inputType="lastName"
                      />
                    </Box>
                  </Flex>
                  {errMessageFirstName ? (
                    <Box fontSize="sm" color="red.400" fontWeight="bold">
                      {errMessageFirstName}
                    </Box>
                  ) : (
                    ""
                  )}
                  {errMessageLastName ? (
                    <Box fontSize="sm" color="red.400" fontWeight="bold">
                      {errMessageLastName}
                    </Box>
                  ) : (
                    ""
                  )}
                </DelayMotionChild>
                <DelayMotionChild>
                  {/**生年月日フォームカレンダー */}
                  <MaterialDatePicker />
                  {errMessageBirthDate ? (
                    <Box fontSize="sm" color="red.400" fontWeight="bold">
                      {errMessageBirthDate}
                    </Box>
                  ) : (
                    ""
                  )}
                </DelayMotionChild>
                <DelayMotionChild>
                  {/**メールアドレス入力フォーム */}
                  <IconForm
                    formLabel="メールアドレス"
                    isRequiredFlag={false}
                    placeholder="example@gmail.com"
                    leftIcon={<EmailIcon color="gray.300" />}
                    inputType="email"
                    value={userChangeInfo.email ? userChangeInfo.email : "-"}
                    disabled={true}
                  />
                </DelayMotionChild>
                <DelayMotionChild>
                  {/**電話番号フォーム */}
                  <IconForm
                    formLabel="電話番号"
                    isRequiredFlag={false}
                    placeholder="例：09012345678"
                    inputType="phone"
                    value={userChangeInfo.phone ? userChangeInfo.phone : "-"}
                    leftIcon={<PhoneIcon color="gray.300" />}
                  />

                  {errMessagePhone ? (
                    <Box fontSize="sm" color="red.400" fontWeight="bold">
                      {errMessagePhone}
                    </Box>
                  ) : (
                    ""
                  )}
                </DelayMotionChild>
                <Divider height="5" />
                <DelayMotionChild>
                  {/**郵便番号入力フォーム
                   * 検索ボタン押下で郵便番号検索APIをコール
                   */}
                  <Box w={{ md: "60%", sm: "100%" }}>
                    <FormControl isRequired>
                      <FormLabel>郵便番号</FormLabel>
                      <InputGroup size="md">
                        <InputLeftElement
                          pointerEvents="none"
                          children={<SearchIcon color="gray.300" />}
                        />
                        <Input
                          placeholder="郵便番号を入力"
                          onChange={onChangePostcode}
                          onBlur={() => getAddress(postcode)}
                          defaultValue={
                            userChangeInfo.address.postalcode
                              ? userChangeInfo.address.postalcode
                              : "-"
                          }
                        />
                        <InputRightElement width="4rem">
                          <Button
                            h="1.75rem"
                            size="sm"
                            onClick={() => getAddress(postcode)}
                          >
                            <Box>検索</Box>
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                  </Box>
                  {errMessagePost ? (
                    <Box fontSize="sm" color="red.400" fontWeight="bold">
                      {errMessagePost}
                    </Box>
                  ) : (
                    ""
                  )}
                </DelayMotionChild>

                <DelayMotionChild>
                  <FormControl isRequired>
                    <FormLabel>都道府県</FormLabel>
                    <InputGroup size="md">
                      <Input
                        placeholder="例：東京都"
                        value={prefecture ? prefecture : "-"}
                        variant="filled"
                      />
                    </InputGroup>
                  </FormControl>
                </DelayMotionChild>

                <DelayMotionChild>
                  <FormControl isRequired>
                    <FormLabel>市町区</FormLabel>
                    <InputGroup size="md">
                      <Input
                        placeholder="例：千代田区"
                        value={address1 ? address1 : "-"}
                        variant="filled"
                      />
                    </InputGroup>
                  </FormControl>
                </DelayMotionChild>

                <DelayMotionChild>
                  <Flex align="center" justifyContent="space-between">
                    <Box w="35%">
                      <FormControl isRequired>
                        <FormLabel>番地</FormLabel>
                        <InputGroup size="md">
                          <Input
                            placeholder="例：千代田"
                            value={address2 ? address2 : "-"}
                            variant="filled"
                            onFocus={() => {
                              console.log("郵便番号を入力してください");
                            }}
                          />
                        </InputGroup>
                      </FormControl>
                    </Box>
                    <Box w="60%">
                      <NormalForm
                        formLabel="番地以降"
                        isRequiredFlag={false}
                        placeholder="例：千代田レジデンス201"
                        inputType="address3"
                        value={
                          userChangeInfo.address.address3
                            ? userChangeInfo.address.address3
                            : undefined
                        }
                      />
                    </Box>
                  </Flex>
                  {errMessageAddress ? (
                    <Box fontSize="sm" color="red.400" fontWeight="bold">
                      {errMessageAddress}
                    </Box>
                  ) : (
                    ""
                  )}
                </DelayMotionChild>

                <Divider height="5" />

                <Button
                  onClick={onRegister}
                  disabled={false}
                  backgroundColor={"teal.400"}
                  color="white"
                  _hober={{ opacity: 0.8 }}
                >
                  変更
                </Button>
                <Button onClick={onClose}>キャンセル</Button>
                <Box fontSize="sm" color="red.400" fontWeight="bold">
                  {errMessage ?? { errMessage }}
                </Box>
              </Stack>
            </DelayMotionModal>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
});
