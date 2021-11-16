import { Flex, Box } from "@chakra-ui/layout";
import { motion, useTransform, useViewportScroll } from "framer-motion";
import { memo, VFC } from "react";
import { ParallaxTest } from "../../motion/parallax/ParallaxTest";
import { TextMotion } from "../../motion/TextMotion";
import { WideMotion } from "../../motion/WideMotion";
import { ContentsBox } from "../organism/toppage/ContentsBox";
import styled from "styled-components";
export const Top: VFC = memo(() => {
  const { scrollYProgress } = useViewportScroll();
  const backgroundColor = useTransform(
    scrollYProgress,
    [0.1, 0.4, 0.5, 0.6, 0.7, 0.8, 1],
    [
      "rgba(0, 0, 0, 0);",
      "#7928CA",
      "#7928CA",
      "#FF0080",
      "#81E6D9",
      "#81E6D9",
      "#fff",
    ]
  );
  return (
    <>
      <SBox style={{ backgroundColor }}>
        <Flex height="800px" overflow="hidden">
          {/* <TextMotion>There is always light behind the clouds.</TextMotion> */}

          <TextMotion>Created by Yusuke Kimura.</TextMotion>

          <ParallaxTest />
          <WideMotion />
        </Flex>
        <ContentsBox />
      </SBox>
    </>
  );
});
const SBox = styled(motion.div)`
  height: auto;
  padding-bottom: 50px;
`;
