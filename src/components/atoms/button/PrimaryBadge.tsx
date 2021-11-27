import { Badge } from "@chakra-ui/layout";
import { memo, ReactNode, VFC } from "react";

type Props = {
  children: ReactNode;
};

export const PrimaryBagge: VFC<Props> = memo((props) => {
  const { children } = props;
  return (
    <Badge
      p="2px 1rem"
      variant="outline"
      colorScheme="teal"
      mr="2em"
      w="120px"
      mb={{ base: "1em", md: "0" }}
    >
      {children}
    </Badge>
  );
});
