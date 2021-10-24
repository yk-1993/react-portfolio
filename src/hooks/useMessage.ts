import { useToast } from "@chakra-ui/toast";
import { useCallback } from "react";
type Props = {
  title: string;
  status: "info" | "warning" | "success" | "error";
};

export const useMessage = () => {
  const toast = useToast();
  const showMessage = useCallback(
    (props: Props) => {
      const { title, status } = props;
      toast({
        title,
        status,
        position: "top",
        duration: 3000,
        isClosable: false,
      });
    },
    [toast]
  );
  return { showMessage };
};
