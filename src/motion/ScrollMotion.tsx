import styled from "styled-components";
import { motion } from "framer-motion";

export const ScrollMotion = (props) => {
  const { children } = props;

  return (
    <MotionBox as={motion.div} whileHover={{ scale: 1.1 }}>
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
`;
