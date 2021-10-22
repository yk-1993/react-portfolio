import styled from "styled-components";
import { motion } from "framer-motion";
import { Center } from "@chakra-ui/layout";

export const TopPageMotionParents = (props) => {
  const { children } = props;
  const container = {
    hidden: { y: 0 },
    show: {
      y: "100%",
      transition: {
        duration: 1,
        delayChildren: 0.5,
        staggerChildren: 0.3,
        type: "spring",
      },
    },
  };

  return (
    <MotionBox
      overflow="hidden"
      variants={container}
      as={motion.ul}
      initial="hidden"
      animate="show"
    >
      {children}
    </MotionBox>
  );
};

const MotionBox = styled(motion.div)``;
