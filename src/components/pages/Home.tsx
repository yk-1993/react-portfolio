import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { memo, VFC } from "react";
import { Redirect } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../../providers/LoginUserProvider";
import { UserInfoProvider } from "../../providers/UserInfoProvider";
import { useHistory } from "react-router";
import store from "../../index";

export const Home: VFC = memo(() => {
  const userState = useRecoilValue(authState);
  const user = useRecoilValue(UserInfoProvider);
  const history = useHistory();
  const onClickInfo = () => {
    console.log("Recoil:");
    console.log(user);
    console.log(userState?.uid);
    console.log(`Redux:`);
    console.log(store.getState());
  };
  const redirect = () => {
    history.push("/login");
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
        redirect()
      )}
    </>
  );
});
