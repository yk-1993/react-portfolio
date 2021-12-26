import { Flex, Heading } from "@chakra-ui/layout";
import { memo, VFC } from "react";

export const Footer: VFC = memo(() => {
  return (
    <>
      <Flex
        backgroundColor="white"
        color="#222"
        m="auto"
        justifyContent="flex-end"
        padding={{ base: "3", md: "5" }}
        height="10vh"
        alignItems="center"
        borderTop="1px solid #222"
      >
        <Heading as="h2" fontSize={{ base: "sm", md: "md" }}>
          Created by Yusuke Kimura 2021
        </Heading>
      </Flex>
    </>
  );
});
