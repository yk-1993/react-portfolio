import axios from "axios";
import { useCallback, useState } from "react";
import { User } from "../types/user";
import { useHistory } from "react-router";
import { UseMessage } from "./useMessage";
export const useAuth = () => {
  const history = useHistory();
  const { showMessage } = UseMessage();
  const [loading, setLoading] = useState(false);

  const login = useCallback(
    (id: string) => {
      setLoading(true);
      axios
        .get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) => {
          if (res.data) {
            showMessage({ title: "ログインしました", status: "success" });
            history.push("/home");
          } else {
            showMessage({
              title: "ユーザーが見つかりません",
              status: "error",
            });
            setLoading(false);
          }
        })
        .catch(() => {
          showMessage({
            title: "ログインできません",
            status: "error",
          });
          setLoading(false);
        });
    },
    [history, showMessage]
  );
  return { login, loading };
};
