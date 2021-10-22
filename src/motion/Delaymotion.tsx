import styled from "styled-components";
import { motion } from "framer-motion";

export const DelayMotion = (props) => {
  const { children } = props;
  const container = {
    hidden: { height: 0 },
    show: {
      height: "auto",
      transition: {
        duration: 0.5,
        delayChildren: 0.5,
        staggerChildren: 0.1,
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
  border-radius: 10px;
  width: auto;
  height: auto;
  margin: auto;
  padding: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  list-style: none;
  transform-origin: 0 0;
`;
