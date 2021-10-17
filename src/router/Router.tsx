import { memo, useEffect, useState, VFC } from "react";
import { Login } from "../components/pages/Login";
import { Switch, Route } from "react-router-dom";
import { Page404 } from "../components/pages/Page404";
import { useSetRecoilState } from "recoil";
import { SignUp } from "../components/pages/SignUp";
import firebase from "firebase";
import { authState } from "../providers/LoginUserProvider";
import { Home } from "../components/pages/Home";
import { Top } from "../components/pages/Top";
import { NormalLayout } from "../components/templates/NormalLayout";

export const Router: VFC = memo(() => {
  const setAuth = useSetRecoilState(authState);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // ログイン状態を監視
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (authUser) => {
      if (authUser) {
        setAuth(authUser);
        // ログイン済みのユーザー情報が存在するかチェック
        var userDoc = await firebase
          .firestore()
          .collection("users")
          .doc(authUser.uid)
          .get();
        if (!userDoc.exists) {
          // Firestore にユーザー用のドキュメントが存在しなければ作成
          await userDoc.ref.set({
            screen_name: authUser.uid,
            display_name: "名無しさん",
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
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
