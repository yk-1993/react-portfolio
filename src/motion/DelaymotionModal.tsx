import styled from "styled-components";
import { motion } from "framer-motion";

export const DelayMotionModal = (props) => {
  const { children } = props;
  const container = {
    hidden: { height: "auto" },
    show: {
      height: "auto",
      transition: {
        duration: 0.3,
        delayChildren: 0.1,
        staggerChildren: 0.05,
      },
    },
  };

  return (
    <MotionBox
      variants={container}
      as={motion.ul}
      initial="hidden"
      animate="show"
    >
      {children}
    </MotionBox>
  );
};

const MotionBox = styled(motion.div)`
  background: white;
  width: auto;
  height: auto;
  margin: auto;
  list-style: none;
  transform-origin: 0 0;
`;
