import styled from "styled-components";
import { motion } from "framer-motion";

export const TopPageMotion = (props) => {
  const { children } = props;
  const item = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { duration: 0.5, type: "spring" },
    },
  };
  return (
    <MotionBox variants={item} as={motion.li}>
      {children}
    </MotionBox>
  );
};

const MotionBox = styled(motion.div)`
  display: block;
`;
