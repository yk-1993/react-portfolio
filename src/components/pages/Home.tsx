import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { memo, VFC } from "react";
import { Redirect } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../../providers/LoginUserProvider";
import { UserInfoProvider } from "../../providers/UserInfoProvider";

export const Home: VFC = memo(() => {
  const userState = useRecoilValue(authState);
  const user = useRecoilValue(UserInfoProvider);
  const onClickInfo = () => {
    console.log(user);
    console.log(userState?.uid);
  };

  return (
    <>
      {userState ? (
        <Box height="80vh">
          <h1>ホームページ/ユーザ情報:{userState.email}</h1>
          {console.log(userState)}
          <Button
            bgGradient="linear(to-r,green.200,teal.500)"
            color="white"
            _hover={{ bgGradient: "linear(to-r,green.100,teal.200)" }}
            onClick={onClickInfo}
          >
            ローカル情報取得
          </Button>
        </Box>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
});
