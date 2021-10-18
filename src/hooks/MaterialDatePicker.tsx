import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker } from "@material-ui/pickers";
import { useEffect, useState } from "react";
import jaLocale from "date-fns/locale/ja";
import { useRecoilState } from "recoil";
import { UserInfoProvider } from "../providers/UserInfoProvider";
import { User } from "../types/user";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { UseSetInput } from "./useSetInput";

// 生年月日 カレンダー (Material UI)
export const MaterialDatePicker = () => {
  // グローバルステート定義
  const [user, setUser] = useRecoilState<User>(UserInfoProvider);
  // 初期値はDate型のuseStateで作成
  const [date, setDate] = useState(new Date(2000, 0, 1, 1, 1, 1));
  const { setInputField } = UseSetInput();

  // 日付変更時に処理
  const onChange = (date) => {
    // カレンダーの値を更新
    setDate(date);
    // Date型からString型に変更し、Userグローバルステートに部分更新
    const selectBirth = date.toLocaleDateString();
    setInputField({ inputType: "birthDate", inputField: selectBirth });
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={jaLocale}>
      {/* <FormControl isRequired>
        <FormLabel>生年月日</FormLabel>
      </FormControl>*/}

      <DatePicker
        value={date}
        onChange={onChange}
        format="yyyy年 MM月 dd日"
        animateYearScrolling
        okLabel="決定"
        cancelLabel="キャンセル"
        openTo="year"
        style={{ fontSize: "10em", width: "100%" }}
        label={
          <FormControl isRequired>
            <FormLabel fontSize="16px" color="gray.900">
              生年月日
            </FormLabel>
          </FormControl>
        }
      />
    </MuiPickersUtilsProvider>
  );
};
