import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup } from "@chakra-ui/input";
import { memo, VFC } from "react";
import { StringLiteralLike } from "typescript";
import { UseSetInput } from "../../../hooks/useSetInput";

type Props = {
  formLabel: string; //フォームラベル
  isRequiredFlag: boolean; //必須項目フラグ
  placeholder: string; //プレースホルダー
  inputType: string;
  value?: string;
};
export const NormalForm: VFC<Props> = memo((props) => {
  const { formLabel, isRequiredFlag, placeholder, inputType, value } = props;
  const { setInputField } = UseSetInput();

  const onChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
    setInputField({ inputType: inputType, inputField: e.currentTarget.value });
  };

  // 標準フォーム
  return (
    <>
      {isRequiredFlag ? (
        <FormControl isRequired>
          <FormLabel>{formLabel}</FormLabel>
          <InputGroup size="md">
            <Input
              placeholder={placeholder}
              onChange={onChangeInput}
              defaultValue={value}
            />
          </InputGroup>
        </FormControl>
      ) : (
        <FormControl>
          <FormLabel>{formLabel}</FormLabel>
          <InputGroup size="md">
            <Input
              placeholder={placeholder}
              onChange={onChangeInput}
              defaultValue={value}
            />
          </InputGroup>
        </FormControl>
      )}
    </>
  );
});
