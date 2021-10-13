import { memo, VFC } from "react";
import { Redirect } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../../providers/LoginUserProvider";

export const Home: VFC = memo(() => {
  const user = useRecoilValue(authState);

  return (
    <>
      {user ? (
        <div>
          <h1>ホームページ/ユーザ情報:{user.email}</h1>
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
});
