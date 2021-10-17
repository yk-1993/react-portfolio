import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker } from "@material-ui/pickers";
import { useEffect, useState } from "react";
import jaLocale from "date-fns/locale/ja";
import { useRecoilState } from "recoil";
import { UserInfoProvider } from "../providers/UserInfoProvider";
import { User } from "../types/user";

// 生年月日 カレンダー (Material UI)
export const MaterialDatePicker = () => {
  // グローバルステート定義
  const [user, setUser] = useRecoilState<User>(UserInfoProvider);
  // 初期値はDate型のuseStateで作成
  const [date, setDate] = useState(new Date(2000, 0, 1, 1, 1, 1));

  // 日付変更時に処理
  const onChange = (date) => {
    // カレンダーの値を更新
    setDate(date);
    // Date型からString型に変更し、Userグローバルステートに部分更新
    const selectBirth = date.toLocaleDateString();
    setUser({ ...user, birthDate: selectBirth });
  };
  // Userグローバルステートが更新されている 確認用
  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={jaLocale}>
      {/* <FormControl isRequired>
        <FormLabel>生年月日</FormLabel>
      </FormControl>*/}

      <DatePicker
        value={date}
        onChange={onChange}
        format="yyyy年MM月dd日"
        animateYearScrolling
        okLabel="決定"
        cancelLabel="キャンセル"
        openTo="year"
        style={{ fontSize: "10em", width: "100%" }}
        label="生年月日"
      />
    </MuiPickersUtilsProvider>
  );
};
