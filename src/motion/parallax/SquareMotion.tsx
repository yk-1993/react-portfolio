import styled from "styled-components";
import { motion } from "framer-motion";

export const SquareMotion = (props) => {
  const { children } = props;
  return (
    <MotionBox
      as={motion.div}
      perpevtive3d
      initial={{
        rotateY: 1,
        rotateX: 0,
        rotateZ: 1,
      }}
      animate={{
        rotateY: [100, 900, 0],
        rotateX: [-600, 900, 0],
        rotateZ: [-600, 900, 0],
      }}
      transition={{
        ease: "easeInOut",
        duration: 100,
        loop: Infinity,
        type: "spring",
      }}
    >
      {children}
    </MotionBox>
  );
};

const MotionBox = styled(motion.div)`
  width: 150px;
  height: 150px;
  margin-top: 20%;
  margin-left: 30%;
  position: absolute;
  transform-origin: center;
`;
