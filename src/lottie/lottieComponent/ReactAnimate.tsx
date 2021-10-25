import animationData from "../reactLogo.json";
import Lottie from "react-lottie";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@chakra-ui/button";
import { useTransform, useViewportScroll } from "framer-motion";

const defaultOptions = {
  loop: false,
  autoplay: false,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export const ReactAnimate = () => {
  const [isDisplay, setIsDisplay] = useState(true);

  const isRunning = useRef(false); // スクロール多発防止用フラグ

  // リスナに登録する関数
  const isScrollAnim = useCallback(() => {
    if (isRunning.current) return;
    isRunning.current = true;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    requestAnimationFrame(() => {
      if (scrollTop > 450) {
        setIsDisplay(false);
      } else {
        setIsDisplay(true);
      }
      isRunning.current = false;
    });
  }, []);

  // 登録と後始末
  useEffect(() => {
    document.addEventListener("scroll", isScrollAnim, { passive: false });
    return () => {
      document.removeEventListener("scroll", isScrollAnim, false);
    };
  }, []);
  return (
    <>
      <Lottie
        options={defaultOptions}
        speed={2}
        height="30vmin"
        width="30vmin"
        isStopped={isDisplay}
        isClickToPauseDisabled={true}
        ariaRole=""
        eventListeners={[
          {
            eventName: "complete",
            callback: () => setIsDisplay(false),
          },
        ]}
      />
    </>
  );
};
