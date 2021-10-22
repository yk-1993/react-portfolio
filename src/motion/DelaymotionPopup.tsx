import styled from "styled-components";
import { motion } from "framer-motion";

export const DelayMotionPopup = (props) => {
  const { children } = props;
  const container = {
    hidden: { scale: 0 },
    show: {
      scale: [0.2, 1.1, 1],
      transition: {
        duration: 0.5,
        delayChildren: 0.5,
        staggerChildren: 0.01,
        type: "spring",
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
`;
