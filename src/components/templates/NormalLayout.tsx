import { Stack } from "@chakra-ui/layout";
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
      <Stack height="100vh">
        <Header />
        {children}
        <Footer />
      </Stack>
    </>
  );
});
