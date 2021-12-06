import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker } from "@material-ui/pickers";
import { useEffect, useState, VFC } from "react";
import jaLocale from "date-fns/locale/ja";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { UseSetInput } from "../../hooks/useSetInput";
import { User } from "../../types/user";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  userDate?: Date | null;
};
// 生年月日 カレンダー (Material UI)
export const MaterialDatePicker: VFC<Props> = (props) => {
  // 初期値はDate型のuseStateで作成
  const [date, setDate] = useState<Date | null>(null);
  const { setInputField } = UseSetInput();
  const dateState = useSelector((state: User) => state.birthDate);
  const dispatch = useDispatch();
  // 日付変更時に処理
  const onChange = (date) => {
    // カレンダーの値を更新
    setDate(date);
  };
  useEffect(() => {
    if (date) {
      // Date型からString型に変更し、Userグローバルステートに部分更新
      const selectBirth = date.toLocaleDateString();
      setInputField({ inputType: "birthDate", inputField: selectBirth });
    }
  }, [date]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={jaLocale}>
      <DatePicker
        emptyLabel="選択してください"
        initialFocusedDate={dateState}
        value={date || dateState}
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
