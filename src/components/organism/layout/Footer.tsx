import { Box, Flex, Heading, Link } from "@chakra-ui/layout";
import { memo, useCallback, VFC } from "react";

export const Footer: VFC = memo(() => {
  return (
    <>
      <Box
        as="nav"
        bgGradient="linear(to-r,teal.500,green.200)"
        color="gray.50"
        m="auto"
        textAlign="right"
        padding={{ base: "3", md: "5" }}
      >
        <Heading as="h2" fontSize={{ base: "sm", md: "md" }}>
          Created by Yusuke Kimura 2021
        </Heading>
      </Box>
    </>
  );
});
