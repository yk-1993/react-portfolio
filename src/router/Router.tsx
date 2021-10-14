import { memo, useEffect, useState, VFC } from "react";
import { Login } from "../components/pages/Login";
import { Switch, Route, Redirect } from "react-router-dom";
import { Page404 } from "../components/pages/Page404";
import { HeaderLayout } from "../components/templates/HeaderLayout";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { SignUp } from "../components/pages/SignUp";
import firebase from "firebase";
import { authState } from "../providers/LoginUserProvider";
import { Home } from "../components/pages/Home";
import { Top } from "../components/pages/Top";

export const Router: VFC = memo(() => {
  const setAuth = useSetRecoilState(authState);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        setAuth(authUser);
      }
      setIsLoading(false);
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
          {/* <HeaderLayout>
            <PrivateRoute exact path="/" component={Home} />
          </HeaderLayout>
          <HeaderLayout>
            <GuestRoute path="/login" component={Login} />
          </HeaderLayout> */}
          <Route exact path="/">
            <HeaderLayout>
              <Top />
            </HeaderLayout>
          </Route>
          <Route path="/login">
            <HeaderLayout>
              <Login />
            </HeaderLayout>
          </Route>
          <Route path="/home">
            <HeaderLayout>
              <Home />
            </HeaderLayout>
          </Route>
          <Route path="/signup">
            <HeaderLayout>
              <SignUp />
            </HeaderLayout>
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
