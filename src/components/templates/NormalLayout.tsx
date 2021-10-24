import { memo, ReactNode, VFC } from "react";
import { Footer } from "../organism/layout/Footer";
import { Header } from "../organism/layout/Header";

type Props = {
  children: ReactNode;
};

export const NormalLayout: VFC<Props> = memo((props) => {
  const { children } = props;
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
});
