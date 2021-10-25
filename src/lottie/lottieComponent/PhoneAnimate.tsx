import animationData from "../phone.json";
import Lottie from "react-lottie";

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export const PhoneAnimate = () => {
  return <Lottie options={defaultOptions} height={500} width={500} />;
};
