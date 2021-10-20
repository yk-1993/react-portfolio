import styled from "styled-components";
import { motion } from "framer-motion";

export const MotionTest = (props) => {
  const { children } = props;
  return (
    <MotionBox
      sizeTransition
      as={motion.div}
      initial={{
        opacity: 0,
        scale: 0,
      }}
      animate={{
        scale: [0, 1.1, 1],
        opacity: 1,
      }}
      transition={{
        ease: "easeInOut",
        duration: 0.5,
        times: [0, 1, 0.1, 0.1],
      }}
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
`;
