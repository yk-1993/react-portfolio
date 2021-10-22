import { Flex } from "@chakra-ui/layout";
import { memo, VFC } from "react";
import { ParallaxTest } from "../../motion/parallax/ParallaxTest";
export const Top: VFC = memo(() => {
  return (
    <>
      <Flex height="70vh">
        <ParallaxTest />
      </Flex>
    </>
  );
});
