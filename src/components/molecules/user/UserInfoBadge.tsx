import { Flex, Text } from "@chakra-ui/layout";
import { memo, ReactNode, VFC } from "react";
import { PrimaryBagge } from "../../atoms/button/PrimaryBadge";

type Props = {
  children: ReactNode;
  userInfo?: string;
};

export const UserInfoBadge: VFC<Props> = memo((props) => {
  const { children, userInfo } = props;
  return (
    <>
      {userInfo ? (
        <Flex flexDirection={{ md: "row", base: "column" }}>
          <PrimaryBagge>{children}</PrimaryBagge>
          <Text display="inline" fontSize="0.8rem">
            {userInfo}
          </Text>
        </Flex>
      ) : (
        <Flex flexDirection={{ md: "row", base: "column" }}>
          <PrimaryBagge>{children}</PrimaryBagge>
          <Text display="inline" fontSize="0.8rem">
            -
          </Text>
        </Flex>
      )}
    </>
  );
});
