import axios from "axios";
import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import {
  UserInfoAddress1,
  UserInfoAddress2,
  UserInfoPostalcode,
  UserInfoPrefecture,
} from "../providers/UserInfoProvider";
import { useMessage } from "./useMessage";

export const usePostalCodeGetAddress = () => {
  const setPrefecture = useSetRecoilState(UserInfoPrefecture);
  const setPostalcode = useSetRecoilState(UserInfoPostalcode);
  const setAddress1 = useSetRecoilState(UserInfoAddress1);
  const setAddress2 = useSetRecoilState(UserInfoAddress2);
  const { showMessage } = useMessage();

  // 郵便番号検索API
  // 入力された郵便番号をpropsで受け取りコールする
  const getAddress = useCallback((postalcode: string) => {
    axios
      .get(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postalcode}`)
      .then((res) => {
        if (res.data) {
          // レスポンスをそれぞれ対応したグローバルステートにセット
          setPostalcode(postalcode);
          setPrefecture(res.data.results[0].address1);
          setAddress1(res.data.results[0].address2);
          setAddress2(res.data.results[0].address3);
        }
      })
      .catch(() => {
        showMessage({
          title: "正しい郵便番号を入力してください",
          status: "error",
        });
      });
  }, []);
  return { getAddress };
};
