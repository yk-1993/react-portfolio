import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { memo, ReactNode, useEffect, VFC } from "react";
import { useRecoilState } from "recoil";
import { UserInfoProvider } from "../../../providers/UserInfoProvider";
import { UseSetInput } from "../../../hooks/useSetInput";
type Props = {
  formLabel: string; //フォームラベル
  isRequiredFlag: boolean; //必須項目フラグ
  placeholder: string; //プレースホルダー
  leftIcon: ReactNode;
  inputType: string;
};

export const IconForm: VFC<Props> = memo((props) => {
  const { formLabel, isRequiredFlag, placeholder, leftIcon, inputType } = props;

  // フロント側画面間連携情報ユーザー用グローバルステート
  const [user] = useRecoilState(UserInfoProvider);
  const { setInputField } = UseSetInput();

  const onChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
    // 各フォームからのType,valueを渡してセット
    setInputField({ inputType: inputType, inputField: e.currentTarget.value });
  };

  useEffect(() => {}, [user]);

  // 標準フォーム
  return (
    <>
      {isRequiredFlag ? (
        <FormControl isRequired>
          <FormLabel>{formLabel}</FormLabel>
          <InputGroup size="md">
            <InputLeftElement
              pointerEvents="none"
              children={leftIcon}
            ></InputLeftElement>
            <Input placeholder={placeholder} onChange={onChangeInput} />
          </InputGroup>
        </FormControl>
      ) : (
        <FormControl>
          <FormLabel>{formLabel}</FormLabel>
          <InputGroup size="md">
            <InputLeftElement
              pointerEvents="none"
              children={leftIcon}
            ></InputLeftElement>
            <Input placeholder={placeholder} onChange={onChangeInput} />
          </InputGroup>
        </FormControl>
      )}
    </>
  );
});
