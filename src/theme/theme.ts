import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: "#f9f9f9",
        color: "gray.800",
      },
    },
  },
  fonts: {
    heading: "Futura,KosugiMaru",
    body: "Futura,KosugiMaru",
  },
});

export default theme;

//   フォント一覧
//   font-family: "Futura";
//   font-family: "KaiseiTokumin-Regular";
//   font-family: "Dot";
//   font-family: "KiwiNormal";
//   font-family: "KiwiLight";
//   font-family: "KosugiMaru";
//   font-family: "KosugiRegular";
