import animationData from "../wave.json";
import Lottie from "react-lottie";
import { useCallback, useEffect, useRef, useState } from "react";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export const FramerAnimate = () => {
  return (
    <>
      <Lottie
        options={defaultOptions}
        height="40vmin"
        width="40vmin"
        isClickToPauseDisabled={true}
      />
    </>
  );
};
