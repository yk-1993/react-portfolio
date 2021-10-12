import { Button } from "@chakra-ui/button";
import { memo, ReactNode, VFC } from "react";

type Props = {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export const PrimaryButton: VFC<Props> = memo((props) => {
  const { children, onClick, disabled = false, loading = false } = props;
  return (
    <Button
      bg="teal.400"
      color="white"
      _hober={{ opacity: 0.8 }}
      onClick={onClick}
      isLoading={loading}
      isDisabled={disabled || loading}
    >
      {children}
    </Button>
  );
});
