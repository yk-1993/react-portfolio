import { memo, useEffect, useState, VFC } from "react";
import { Login } from "../components/pages/Login";
import { Switch, Route } from "react-router-dom";
import { Page404 } from "../components/pages/Page404";
import { useRecoilState, useSetRecoilState } from "recoil";
import { SignUp } from "../components/pages/SignUp";
import firebase from "firebase";
import { authState } from "../providers/LoginUserProvider";
import { Home } from "../components/pages/Home";
import { Top } from "../components/pages/Top";
import { NormalLayout } from "../components/templates/NormalLayout";
import { UserInfoProvider } from "../providers/UserInfoProvider";

export const Router: VFC = memo(() => {
  const setAuth = useSetRecoilState(authState);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // フロント側画面間連携情報ユーザー用のグローバルステートを定義
  const [user] = useRecoilState(UserInfoProvider);

  useEffect(() => {
    // ログイン状態を監視
    const unsubscribe = firebase.auth().onAuthStateChanged(async (authUser) => {
      if (authUser) {
        setAuth(authUser);
        // ログイン済みのユーザー情報が存在するかチェック
        var userDoc = await firebase
          .firestore()
          .collection("users")
          .doc(authUser.uid)
          .get();
        // Firestore にユーザー用のドキュメントが存在しなければ作成
        if (!userDoc.exists) {
          // フロント側に一時保存してあるユーザ情報をFireStoreに登録
          await userDoc.ref.set({
            uid: authUser.uid,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            birthDate: user.birthDate,
            address: {
              postalcode: user.address.postalcode,
              prefecture: user.address.prefecture,
              address1: user.address.address1,
              address2: user.address.address2,
              address3: user.address.address3,
            },
            created_at: firebase.firestore.FieldValue.serverTimestamp(),
          });
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Switch>
          <Route exact path="/">
            <NormalLayout>
              <Top />
            </NormalLayout>
          </Route>
          <Route path="/login">
            <NormalLayout>
              <Login />
            </NormalLayout>
          </Route>
          <Route path="/home">
            <NormalLayout>
              <Home />
            </NormalLayout>
          </Route>
          <Route path="/signup">
            <NormalLayout>
              <SignUp />
            </NormalLayout>
          </Route>
          {/* <Route
              path="/home"
              render={({ match: { url } }) => (
                <Switch>
                  {HomeRoutes.map((route) => (
                    <Route
                      key={route.path}
                      exact={route.exact}
                      path={`${url}${route.path}`}
                    >
                      <HeaderLayout>{route.children}</HeaderLayout>
                    </Route>
                  ))}
                </Switch>
              )}
            /> */}
          <Route path="*">
            <Page404 />
          </Route>
        </Switch>
      )}
    </>
  );
});
