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
    [0.1, 0.3, 0.45, 0.5],
    ["rgba(0, 0, 0, 0);", "#FF0080", "#7928CA", "#81E6D9"]
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
  height: 5000px;
`;
