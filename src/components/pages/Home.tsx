import { Box } from "@chakra-ui/layout";
import { memo, VFC } from "react";
import { Redirect } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../../providers/LoginUserProvider";

export const Home: VFC = memo(() => {
  const userState = useRecoilValue(authState);

  return (
    <>
      {userState ? (
        <Box height="100%">
          <h1>ホームページ/ユーザ情報:{userState.email}</h1>
        </Box>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
});
