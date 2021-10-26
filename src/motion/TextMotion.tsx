import styled from "styled-components";
import { motion } from "framer-motion";
import { Box } from "@chakra-ui/layout";

export const TextMotion = (props) => {
  const { children } = props;

  return (
    <Box fontSize={{ md: "40px", sm: "30px" }}>
      <MotionBox
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 1, 1, 0] }}
        transition={{
          duration: 5,
        }}
      >
        {children}
      </MotionBox>
    </Box>
  );
};

const MotionBox = styled(motion.div)`
  font-family: "Futura";
  position: absolute;
  top: 400px;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  @media (min-width: 768px) {
    top: 500px;
  }
`;
