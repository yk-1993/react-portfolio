import { Frame, useAnimation } from "framer";
import reactIcon from "./images/react2.png";
import ionicIcon from "./images/ionic.png";
import firebaseIcon from "./images/firebase.png";
import typescriptIcon from "./images/typescript.svg";
import chakraIcon from "./images/chakra.webp";
import motionIcon from "./images/motion.png";
import treeBG from "./images/tree.png";
import styled from "styled-components";
import { TopPageMotionParents } from "../TopPageMotionParents";
import { TopPageMotion } from "../TopPageMotion";

export const ParallaxTest = () => {
  let fbAnim = useAnimation();
  let tsAnim = useAnimation();
  let reactAnim = useAnimation();
  let ionicAnim = useAnimation();
  let chakraAnim = useAnimation();
  let motionAnim = useAnimation();
  let bgAnim = useAnimation();
  return (
    <>
      <SFrame
        top="28%"
        width="100%"
        height="35%"
        overflow="hidden"
        background={null}
        center
        onMouseMove={function ({ clientX, clientY }) {
          let offsetX = clientX - window.innerWidth / 2;
          let offsetY = clientY - window.innerHeight / 2;
          ionicAnim.start({ x: offsetX / 30, y: offsetY / 30 });
          reactAnim.start({ x: offsetX / 40, y: offsetY / 40 });
          tsAnim.start({ x: offsetX / 15, y: offsetY / 15 });
          fbAnim.start({ x: offsetX / 20, y: offsetY / 20 });
          chakraAnim.start({ x: offsetX / 10, y: offsetY / 10 });
          motionAnim.start({ x: offsetX / 25, y: offsetY / 25 });
          bgAnim.start({ x: offsetX / 100, y: offsetY / 100 });
        }}
      >
        <TopPageMotionParents>
          <TopPageMotion>
            <Frame
              opacity={0.1}
              scale={1}
              center="x"
              top={-250}
              left="50%"
              width="1200px"
              height="1200px"
              background={null}
              animate={bgAnim}
              image={treeBG}
              whileHover={{ opacity: 1 }}
            />
          </TopPageMotion>
          <TopPageMotion>
            <Frame
              scale={0.6}
              center="x"
              top={50}
              left="49%"
              width="409px"
              height="499px"
              background={null}
              animate={reactAnim}
              image={reactIcon}
              whileHover={{ scale: 0.65, rotate: 5 }}
              whileTap={{ scale: 0.5 }}
            />
          </TopPageMotion>
          <TopPageMotion>
            <Frame
              scale={0.5}
              top={200}
              left="70%"
              center="x"
              background={null}
              animate={fbAnim}
              width="1600px"
              height="800px"
              image={firebaseIcon}
              whileHover={{ scale: 0.6, rotate: 5 }}
              whileTap={{ scale: 0.4 }}
            />
          </TopPageMotion>
          <TopPageMotion>
            <Frame
              scale={0.3}
              center="x"
              top="-10%"
              left="70%"
              background={null}
              animate={tsAnim}
              width="500px"
              height="500px"
              image={typescriptIcon}
              whileHover={{ scale: 0.4, rotate: 5 }}
              whileTap={{ scale: 0.3 }}
            />
          </TopPageMotion>
          <TopPageMotion>
            <Frame
              scale={0.1}
              center="x"
              top="10%"
              left="20%"
              width="1200px"
              height="419px"
              background={null}
              animate={ionicAnim}
              image={ionicIcon}
              whileHover={{ scale: 0.2, rotate: 5 }}
              whileTap={{ scale: 0.05 }}
            />
          </TopPageMotion>
          <TopPageMotion>
            <Frame
              scale={0.3}
              center="x"
              top={300}
              left="20%"
              width="1400px"
              height="361px"
              background={null}
              animate={chakraAnim}
              image={chakraIcon}
              whileHover={{ scale: 0.4, rotate: 5 }}
              whileTap={{ scale: 0.3 }}
            />
          </TopPageMotion>

          <TopPageMotion>
            <Frame
              scale={0.3}
              center="x"
              top={-20}
              left="35%"
              width="352px"
              height="342px"
              background={null}
              animate={motionAnim}
              image={motionIcon}
              whileHover={{ scale: 0.4, rotate: 5 }}
              whileTap={{ scale: 0.3 }}
            />
          </TopPageMotion>
        </TopPageMotionParents>
      </SFrame>
    </>
  );
};
const SFrame = styled(Frame)``;
