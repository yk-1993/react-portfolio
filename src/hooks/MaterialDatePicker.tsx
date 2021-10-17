import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker } from "@material-ui/pickers";
import { useEffect, useState } from "react";
import jaLocale from "date-fns/locale/ja";
import { useRecoilState } from "recoil";
import { UserInfoProvider } from "../providers/UserInfoProvider";
import { User } from "../types/user";

export const MaterialDatePicker = () => {
  const [user, setUser] = useRecoilState<User>(UserInfoProvider);
  const [date, setDate] = useState(new Date(2000, 0, 1, 1, 1, 1));
  const onChange = (date) => {
    setDate(date);
  };
  useEffect(() => {
    setUser({ ...user, birthDate: date });
    console.log(date);
    console.log(user);
  }, [date]);

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
