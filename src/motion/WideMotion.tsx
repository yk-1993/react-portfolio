import styled from "styled-components";
import { motion } from "framer-motion";
import { Box } from "@chakra-ui/layout";

export const WideMotion = (props) => {
  const { children } = props;
  return (
    <>
      <MotionBox
        as={motion.div}
        initial={{ scaleY: 0, y: 200, scaleX: 1 }}
        animate={{
          scaleY: [0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
          scaleX: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        }}
        transition={{
          ease: "easeInOut",
          duration: 5,
          type: "spring",
          loop: Infinity,
          repeatDelay: 2,
        }}
      >
        {children}
      </MotionBox>
      <MotionBox02
        as={motion.div}
        initial={{ scaleY: 0, y: 300, scaleX: 1 }}
        animate={{
          scaleY: [0, 0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
          scaleX: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
        }}
        transition={{
          ease: "easeInOut",
          duration: 5,
          type: "spring",
          loop: Infinity,
          repeatDelay: 2,
        }}
      >
        {children}
      </MotionBox02>
      <MotionBox03
        as={motion.div}
        initial={{ scaleY: 0, y: 400, scaleX: 1 }}
        animate={{
          scaleY: [0, 0, 0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
          scaleX: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        }}
        transition={{
          ease: "easeInOut",
          duration: 5,
          type: "spring",
          loop: Infinity,
          repeatDelay: 2,
        }}
      >
        {children}
      </MotionBox03>
      <MotionBox04
        as={motion.div}
        initial={{ scaleY: 0, y: 150, scaleX: 1 }}
        animate={{
          scaleY: [0, 0, 0, 0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
          scaleX: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
        }}
        transition={{
          ease: "easeInOut",
          duration: 5,
          type: "spring",
          loop: Infinity,
          repeatDelay: 2,
        }}
      >
        {children}
      </MotionBox04>
      <MotionBox05
        as={motion.div}
        initial={{ scaleY: 0, y: 200, scaleX: 1 }}
        animate={{
          scaleY: [0, 0, 0, 0, 0, 10, 10, 10, 10, 10, 10, 10, 10, 10],
          scaleX: [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        }}
        transition={{
          ease: "easeInOut",
          duration: 5,
          loop: Infinity,
          repeatDelay: 2,
          type: "spring",
        }}
      >
        {children}
      </MotionBox05>
    </>
  );
};

const MotionBox = styled(motion.div)`
  width: 100%;
  height: 90px;
  background-color: #fff4ea;
  position: absolute;
  z-index: -1;
  transform-origin: 0 center;
`;
const MotionBox02 = styled(motion.div)`
  width: 100%;
  height: 80px;
  background-color: #ffffef;
  position: absolute;
  transform-origin: 0 center;
  z-index: -1;
`;
const MotionBox03 = styled(motion.div)`
  width: 100%;
  height: 70px;
  background-color: #f7ffef;
  transform-origin: 0 center;
  z-index: -1;
`;
const MotionBox04 = styled(motion.div)`
  width: 100%;
  height: 50px;
  background-color: #effff7;
  position: absolute;
  transform-origin: 0 center;
  z-index: -1;
`;
const MotionBox05 = styled(motion.div)`
  width: 100%;
  height: 110px;
  background-color: #eff7ff;
  z-index: -1;
  transform-origin: 0 center;
  position: absolute;
`;
