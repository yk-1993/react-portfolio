import styled from "styled-components";
import { motion } from "framer-motion";

export const ScrollMotion = (props) => {
  const { children } = props;

  return (
    <MotionBox as={motion.div} whileHover={{ scale: 1.1, rotate: 5, y: 5 }}>
      {children}
    </MotionBox>
  );
};

const MotionBox = styled(motion.div)`
  border-radius: 10px;
  width: auto;
  height: auto;
  margin: auto;
  padding: 10px;
`;
