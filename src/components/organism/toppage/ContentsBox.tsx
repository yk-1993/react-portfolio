import styled from "styled-components";
import { motion, useTransform, useViewportScroll } from "framer-motion";
import { VFC } from "react";
import { ReactAnimate } from "../../../lottie/lottieComponent/ReactAnimate";
import { Box, Flex } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/media-query";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { Frame, useAnimation } from "framer";
import typescriptIcon from "../../../motion/parallax/images/typescript.svg";
import { Image } from "@chakra-ui/image";
import motionImage from "../../../motion/parallax/images/motion_logo.png";
import chakraImage from "../../../motion/parallax/images/chakra.webp";
import firebaseImage from "../../../motion/parallax/images/firebase.png";
import { FramerAnimate } from "../../../lottie/lottieComponent/FramerAnimate";
import { PhoneAnimate } from "../../../lottie/lottieComponent/PhoneAnimate";
import { FirebaseAnimate } from "../../../lottie/lottieComponent/FirebaseAnimate";

export const ContentsBox: VFC = () => {
  // スクロールアニメーションに使用
  const { scrollYProgress } = useViewportScroll();
  // レスポンシブ対応
  const isSmall = useMediaQuery("(max-width: 768px)");
  // tsロゴパララックス用
  let tsAnim = useAnimation();

  // FRONTEND STACKS テキストカラーアニメーション
  const color_R_title = useTransform(
    scrollYProgress,
    [0.1, 0.25],
    ["#fff", "#222"]
  );
  // FRAMER EMOTION テキストカラーアニメーション
  const color_E_title = useTransform(
    scrollYProgress,
    [0.4, 0.45],
    ["#fff", "#222"]
  );

  // REACT x Typescript　透明度・y位置アニメーション
  const opacity_R_title = useTransform(scrollYProgress, [0.12, 0.16], [0, 1]);
  const y_R_title = useTransform(scrollYProgress, [0.12, 0.16], [-30, 0]);
  // REACT 本文　透明度・y位置アニメーション
  const opacity_R_contents = useTransform(scrollYProgress, [0.16, 0.2], [0, 1]);
  const y_R_contents = useTransform(scrollYProgress, [0.16, 0.2], [-30, 0]);
  // REACT TSアイコン透明度
  const opacity_TS = useTransform(scrollYProgress, [0.4, 0.5], [1, 0]);

  // Framer Emotion 本文　透明度・x位置アニメーション
  const opacity_E_contents = useTransform(
    scrollYProgress,
    [0.35, 0.43, 0.6, 0.7],
    [0, 1, 1, 0]
  );
  const x_E_contents = useTransform(scrollYProgress, [0.25, 0.33], [300, 0]);

  //FramerMotion SQUARE　装飾
  const MDeco_Y = useTransform(scrollYProgress, [0.35, 0.45], [-200, 30]);
  const scaleY_E = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);

  //FramerMotion コンテンツ背景帯 scaleX
  const widthX_motion = useTransform(
    scrollYProgress,
    [0.4, 0.45, 0.5, 0.55],
    [0, 0, 4500, 5000]
  );
  //Fifebase コンテンツ背景帯 scaleX
  const widthX_firebase = useTransform(
    scrollYProgress,
    [0.8, 0.85, 0.9],
    [0, 0, 4000]
  );
  //CHAKRA_LINE pathLength
  const pathLength_C = useTransform(scrollYProgress, [0.7, 0.75], [0, 1]);
  //Firebase_LINE pathLength
  const pathLength_F = useTransform(scrollYProgress, [0.9, 0.95], [0, 1]);
  //CHAKRA_メインテキスト アニメーションX位置・透明度
  const chakra_text_x = useTransform(scrollYProgress, [0.7, 0.75], [-200, 0]);
  const opacity_chakra_text = useTransform(
    scrollYProgress,
    [0.7, 0.75],
    [0, 1]
  );
  //CHAKRA_メインコンテンツ　透明度
  const opacity_chakra_M = useTransform(scrollYProgress, [0.65, 0.7], [0, 1]);

  //Firebase アニメーションX位置・透明度
  const firebase_text_x = useTransform(scrollYProgress, [0.9, 0.95], [200, 0]);
  const opacity_firebase_text = useTransform(
    scrollYProgress,
    [0.9, 0.95],
    [0, 1]
  );
  //Firebase アニメーションX位置・透明度_レスポンシブ
  const firebase_text_x_sm = useTransform(
    scrollYProgress,
    [0.85, 0.95],
    [200, 0]
  );
  const opacity_firebase_text_sm = useTransform(
    scrollYProgress,
    [0.85, 0.95],
    [0, 1]
  );
  // FRONTEND サークルアニメーション
  /*
   */
  // 背景色
  const backgroundColor_C1 = useTransform(
    scrollYProgress,
    [0.12, 0.16, 0.2, 0.2, 0.3, 0.4, 0.5],
    ["#61DAFB", "#fff", "#fff", "#fff", "#fff", "#7928CA", "#FF0080"]
  );
  // 背景色
  const backgroundColor_C2 = useTransform(
    scrollYProgress,
    [0.1, 0.15, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7],
    [
      "#61DAFB",
      "#61DAFB",
      "#61DAFB",
      "#61DAFB",
      "#7928CA",
      "#7928CA",
      "#FF0080",
      "#81E6D9",
    ]
  );
  const backgroundColor_C3 = useTransform(
    scrollYProgress,
    [0.1, 0.12, 0.2, 0.4, 0.5, 0.65, 0.75],
    ["#61DAFB", "#fff", "#fff", "#fff", "#7928CA", "#FF0080", "#FF0080"]
  );
  // 大きさ
  const scale_C1 = useTransform(
    scrollYProgress,
    [0.1, 0.12, 0.2, 0.45, 0.55, 0.65, 0.75],
    [1, 0.8, 1.6, 8, 14, 16, 30]
  );
  const scale_C2 = useTransform(
    scrollYProgress,
    [0.1, 0.12, 0.2, 0.45, 0.55, 0.65, 0.75],
    [0.8, 0.6, 1.6, 8, 13.9, 15.9, 30]
  );
  const scale_C3 = useTransform(
    scrollYProgress,
    [0.1, 0.12, 0.2, 0.45, 0.55, 0.65, 0.75],
    [0.8, 0.6, 1.6, 6, 6, 6, 6]
  );

  return (
    <SBox>
      <Box
        overflow="hidden"
        height={isSmall[0] ? "1500px" : "1700px"}
        backgroundColor="gray.600"
        position="relative"
      >
        {/* サークル背景 */}
        <SCircle
          style={{ scale: scale_C1, backgroundColor: backgroundColor_C1 }}
          transition={{
            type: "spring",
          }}
        />
        <SCircle
          style={{ scale: scale_C2, backgroundColor: backgroundColor_C2 }}
          transition={{
            type: "spring",
          }}
        />
        <SCircle
          style={{ scale: scale_C3, backgroundColor: backgroundColor_C3 }}
          transition={{
            type: "spring",
          }}
        />
        <Flex
          justifyContent="center"
          alignSelf="center"
          alignItems="center"
          width="50vmin"
          m="auto"
          paddingTop="5%"
          flexDirection={isSmall[0] ? "column" : "row"}
          zIndex="5"
        >
          <MBox as={motion.div} style={{ color: color_R_title }}>
            FRONTEND
            <br />
            STACKS
          </MBox>
          {/* React-lottieからアニメーションをロードしているコンポーネントをFramermotionでスクロールアニメート */}
          <ReactAnimate />
        </Flex>
        <CenterTextSubTitle
          as={motion.div}
          style={{ opacity: opacity_R_title, y: y_R_title }}
        >
          React
          <SmallCloseIcon />
          Typescript
        </CenterTextSubTitle>
        <CenterTextContents
          as={motion.div}
          style={{ opacity: opacity_R_contents, y: y_R_contents }}
        >
          <p>JSフレームワークはReactを採用しました。</p>
          <p>実務と同様、型定義を行えるTypescriptでの実装です。</p>
          <p>また、状態管理ライブラリにはReduxおよびRecoilを使用。</p>
          <p>Hooksを使ったReactの基本的なコーディングはもちろん、</p>
          <p>useStateを使ったバリデーション等も実装しました。</p>
          <p>外部APIのコールはaxiosで実装。</p>
        </CenterTextContents>
        <Frame
          center="x"
          width="100%"
          background={null}
          onMouseMove={function ({ clientY }) {
            let offsetY = clientY - window.innerHeight / 2;
            tsAnim.start({ y: offsetY / 25 });
          }}
        >
          <motion.div style={{ opacity: opacity_TS }}>
            <Frame
              scale={isSmall[0] ? 0.3 : 0.4}
              center="x"
              top={isSmall[0] ? 0 : 0}
              background={null}
              animate={tsAnim}
              width="300px"
              height="300px"
              image={typescriptIcon}
            />
          </motion.div>
        </Frame>
        <Flex
          justifyContent="center"
          alignSelf="center"
          alignItems="center"
          width="50vmin"
          m="300px auto 0"
          paddingTop="5%"
          flexDirection="row"
          zIndex="5"
        >
          <Image
            src={motionImage}
            zIndex="2"
            height={isSmall[0] ? "60px" : "100"}
            width={isSmall[0] ? "60px" : "100"}
          />
          <MotionWhiteBg
            as={motion.div}
            initial={{ rotate: -5, x: 1000 }}
            style={{ width: widthX_motion }}
            transition={{ type: "spring" }}
          />
          <MotionDecoration
            style={{
              y: MDeco_Y,
              scaleY: scaleY_E,
              opacity: opacity_E_contents,
            }}
          />
          <MotionDecoration2
            style={{
              y: MDeco_Y,
              opacity: opacity_E_contents,
              scaleY: scaleY_E,
            }}
          />
          {/* React-lottieからアニメーションをロードしているコンポーネントをFramermotionでスクロールアニメート */}
          <FBox as={motion.div} style={{ opacity: opacity_E_contents }}>
            <FramerAnimate />
          </FBox>
          <MBox2 as={motion.div} style={{ color: color_E_title }}>
            FRAMER
            <br />
            MOTION
          </MBox2>
        </Flex>
        <TextContentsEmotion
          as={motion.div}
          style={{ opacity: opacity_E_contents, x: x_E_contents }}
        >
          <p>
            アニメーションはReactで人気な{isSmall[0] && <br />}
            Framer-Motionライブラリで実装しました。
          </p>
          <p>
            比較的シンプルな記述で、{isSmall[0] && <br />}
            滑らかなWEBアニメーションが実現できる、
          </p>
          <p>Reactのアニメーションライブラリです。</p>
        </TextContentsEmotion>
      </Box>
      <Box overflow="hidden" position="relative" pb="100px">
        <motion.div style={{ opacity: opacity_chakra_M }}>
          <Flex
            pt="10"
            alignSelf="center"
            alignItems="center"
            justifyContent="center"
          >
            <MBox3 as={motion.div}>
              <SSpan>CSS</SSpan>
              <br />
              FRAMEWORK
            </MBox3>
            <Box>
              <Image
                src={chakraImage}
                zIndex="5"
                height={isSmall[0] ? "38px" : "90.25px"}
                width={isSmall[0] ? "140px" : "350px"}
              />
            </Box>
          </Flex>
        </motion.div>
        <Flex
          pt="5"
          pr={isSmall[0] ? "0" : "15px"}
          alignSelf="center"
          alignItems="center"
          width={isSmall[0] ? "95vmin" : "70vmin"}
          m="auto"
          justifyContent="space-between"
        >
          <Box w="40%">
            <PhoneAnimate />
          </Box>
          <Box m="1em 0">
            {isSmall[0] ? (
              <svg
                width="5"
                height="200"
                viewBox="0, 0, 5, 200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M 0 0 V 200"
                  stroke="#FFF"
                  strokeWidth="3px"
                  strokeLinecap="round"
                  initial={{
                    pathLength: 0,
                  }}
                  style={{ pathLength: pathLength_C }}
                  transition={{
                    duration: 30,
                    type: "spring",
                  }}
                ></motion.path>
              </svg>
            ) : (
              <svg
                width="5"
                height="350"
                viewBox="0, 0, 5, 350"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M 5 10 V 350"
                  stroke="#FFF"
                  strokeWidth="3px"
                  strokeLinecap="round"
                  initial={{
                    pathLength: 0,
                  }}
                  style={{ pathLength: pathLength_C }}
                  transition={{
                    duration: 30,
                    type: "spring",
                  }}
                ></motion.path>
              </svg>
            )}
          </Box>

          <CBox
            as={motion.div}
            style={{ x: chakra_text_x, opacity: opacity_chakra_text }}
            transition={{ type: "spring" }}
          >
            <p>
              CSSフレームワークはChakra UIをメインに、一部Material UIを採用。
            </p>
            <p>
              統一感があり、メンテナンス性に優れたUIコンポーネントを容易に実装できます。
            </p>
            <p>レスポンシブデザインにも対応。</p>
          </CBox>
        </Flex>

        <Flex
          pt="10"
          alignSelf="center"
          alignItems="center"
          justifyContent="center"
          marginTop="200px"
        >
          <MotionWhiteFirebase
            as={motion.div}
            initial={{ rotate: 5, x: -1000 }}
            style={{ width: widthX_firebase }}
            transition={{ type: "spring" }}
          />
          <MBox4
            as={motion.div}
            style={
              isSmall[0]
                ? { opacity: opacity_firebase_text_sm }
                : { opacity: opacity_firebase_text }
            }
          >
            <FSpan>BACKEND</FSpan>
            <br />
            STACKS
          </MBox4>

          <motion.div
            style={
              isSmall[0]
                ? { opacity: opacity_firebase_text_sm }
                : { opacity: opacity_firebase_text }
            }
          >
            <Box zIndex="5" position="relative">
              <Image
                src={firebaseImage}
                zIndex="2"
                height={isSmall[0] ? "100px" : "200px"}
                width={isSmall[0] ? "200px" : "400px"}
              />
            </Box>
          </motion.div>
        </Flex>
        <Flex
          pt={isSmall[0] ? "0" : "10"}
          pr={isSmall[0] ? "0" : "15px"}
          alignSelf="center"
          alignItems="center"
          width={isSmall[0] ? "95vmin" : "70vmin"}
          m="auto"
          justifyContent="space-between"
        >
          <FIBox
            as={motion.div}
            style={
              isSmall[0]
                ? { x: firebase_text_x_sm, opacity: opacity_firebase_text_sm }
                : { x: firebase_text_x, opacity: opacity_firebase_text }
            }
            transition={{ type: "spring" }}
          >
            <p>BACKENDはFirebaseで実装しています。</p>
            <p>
              DBはFirestore Database、認証はFirebase Authenticationで実装し、
            </p>
            <p>uidをDB側の情報と紐付けています。</p>
          </FIBox>
          <Box m="1em 0" position="relative">
            {isSmall[0] ? (
              <svg
                width="5"
                height="200"
                viewBox="0, 0, 5, 200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M 0 0 V 200"
                  stroke="#FFCB2B"
                  strokeWidth="3px"
                  strokeLinecap="round"
                  initial={{
                    pathLength: 0,
                  }}
                  style={{ pathLength: pathLength_F }}
                  transition={{
                    duration: 30,
                    type: "spring",
                  }}
                ></motion.path>
              </svg>
            ) : (
              <svg
                width="100"
                height="350"
                viewBox="0, 0, 5, 350"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M 30 10 -10 350"
                  stroke="#FFCB2B"
                  strokeWidth="1px"
                  strokeLinecap="round"
                  initial={{
                    pathLength: 0,
                  }}
                  style={{ pathLength: pathLength_F }}
                  transition={{
                    duration: 30,
                    type: "spring",
                  }}
                ></motion.path>
              </svg>
            )}
          </Box>
          <motion.div
            style={{ x: firebase_text_x, opacity: opacity_firebase_text }}
          >
            <Box w="40%">
              <FirebaseAnimate />
            </Box>
          </motion.div>
        </Flex>
      </Box>
    </SBox>
  );
};

// Framer-emotionに直接chakraUIのCSSは使えないので、styled-componentsを使用

// Reactコンテンツテキスト
const CenterTextContents = styled(motion.div)`
  text-align: center;
  z-index: 10;
  position: relative;
  font-size: 1em;
  line-height: 3;
  @media (max-width: 768px) {
    width: 95%;
    font-size: 12px;
    margin: auto;
`;
// React サブタイトルテキスト
const CenterTextSubTitle = styled(motion.div)`
  text-align: center;
  z-index: 10;
  position: relative;
  line-height: 2;
  margin-bottom: 1em;
  font-size: 20px;
`;

// React　メインタイトルテキスト
const MBox = styled(motion.div)`
  font-size: 30px;
  color: #222;
  z-index: 1;
  text-align: right;
  @media (max-width: 768px) {
    font-size: 25px;
    text-align: center;
    flex-direction: column;
  }
`;
// Framer-emotion　メインタイトルテキスト
const MBox2 = styled(motion.div)`
  font-size: 30px;
  color: #333;
  z-index: 1;
  text-align: left;
  margin-left: 1em;
  @media (max-width: 768px) {
    font-size: 25px;
    text-align: center;
  }
`;

// CHAKRA　メインタイトルテキスト
const MBox3 = styled(motion.div)`
  font-size: 30px;
  color: #333;
  z-index: 1;
  text-align: right;
  margin-right: 1em;
  line-height: 1.2em;
  @media (max-width: 768px) {
    font-size: 15px;
  }
`;
// Firebase メインタイトルテキスト
const MBox4 = styled(motion.div)`
  font-size: 30px;
  color: #ffcb2b;
  z-index: 2;
  text-align: right;
  margin-right: 1em;
  line-height: 1.2em;
  @media (max-width: 768px) {
    font-size: 15px;
  }
`;
const SSpan = styled.span`
  font-size: 60px;
  color: #fff;
  @media (max-width: 768px) {
    font-size: 25px;
  }
`;
const FSpan = styled.span`
  font-size: 55px;
  color: #555;
  z-index: 2;
  @media (max-width: 768px) {
    font-size: 25px;
  }
`;
// Framer-emotion 背景帯
const MotionWhiteBg = styled(motion.div)`
  position: absolute;
  height: 500px;
  width: 100%;
  background-color: #fefefe;
  border-top: 5px solid #222;
  border-bottom: 5px solid #222;
  @media (max-width: 768px) {
    font-size: 25px;
    text-align: center;
    height: 500px;
    margin-top: 100px;
  }
`;
// Firebase 帯
const MotionWhiteFirebase = styled(motion.div)`
  position: absolute;
  height: 400px;
  width: 100%;
  z-index: 0;
  overflow: hidden;
  border-bottom: 1px solid #ffcb2b;
  background-color: #f2f2f2;
  @media (max-width: 768px) {
    font-size: 25px;
    text-align: center;
    height: 400px;
    margin-top: 100px;
  }
`;
// Framer-Emotion コンテンツテキスト
const TextContentsEmotion = styled(motion.div)`
  margin: 7vmin auto;
  text-align: center;
  width: 35%;
  color: #222;
  display: block;
  font-size: 1em;
  z-index: 10;
  position: relative;
  line-height: 2.5;
  @media (max-width: 768px) {
    font-size: 12px;
    width: 90%;
    text-align: right;
    margin: 50px auto;
  }
`;
const SBox = styled(motion.div)`
  background-color: "#222";
`;
// FramerWaveAnimate
const FBox = styled(motion.div)`
  position: absolute;
`;
// Chakra UI MainContentsText
const CBox = styled(motion.div)`
  width: 40%;
  color: #fff;
  text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);
  @media (max-width: 768px) {
    width: 90%;
    margin: auto 1em;
    font-size: 12px;
  }
`; // FIREBASE MainContentsText
const FIBox = styled(motion.div)`
  width: 40%;
  color: #555;
  position: relative;
  @media (max-width: 768px) {
    width: 90%;
    margin: auto 1em;
    font-size: 12px;
  }
`;
const SCircle = styled(motion.div)`
  position: absolute;
  width: 300px;
  height: 300px;
  display: block;
  border-radius: 100%;
  top: 110px;
  left: 0;
  right: 0;
  z-index: 0;
  margin: auto;
  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;
const MotionDecoration = styled(motion.div)`
  position: absolute;
  width: 2px;
  height: 250px;
  background: linear-gradient(#7928ca, #ff0080);
  margin-left: -40%;
  margin-top: 35%;
  transform-origin: 0 0;
  @media (max-width: 768px) {
    margin-left: -70%;
    margin-top: 200%;
    height: 300px;
  }
`;

const MotionDecoration2 = styled(motion.div)`
  position: absolute;
  width: 2px;
  height: 200px;
  background: linear-gradient(#ff0080, #7928ca);
  margin-left: 40%;
  margin-top: -20%;
  transform-origin: 0 0;
  @media (max-width: 768px) {
    margin-left: 70%;
    margin-top: -80%;
    height: 150px;
  }
`;
