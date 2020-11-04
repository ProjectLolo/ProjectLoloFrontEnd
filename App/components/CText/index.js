import * as React from "react";
import { Text } from "react-native";
import adjust from "./adjust";

import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";

function index() {
  useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
    Montserrat_600SemiBold,
  });
}

const CText = ({
  //sizes
  h1,
  h2,
  h3,
  h4,
  h5,
  p,
  //font variants
  bold,
  semiBold,
  regular,
  //font colours
  purple,
  grey,
  white,
  black,
  //position
  center,
  //other
  title,
  style,
  ...rest
}) => {
  return (
    <Text
      style={[
        //sizes
        h1 && { fontSize: adjust(48) },
        h2 && { fontSize: adjust(32) },
        h3 && { fontSize: adjust(20) },
        h4 && { fontSize: adjust(18) },
        h5 && { fontSize: adjust(16) },
        p && { fontSize: adjust(12) },
        //font variants
        bold && { fontFamily: "Montserrat_700Bold" },
        semiBold && { fontFamily: "Montserrat_600SemiBold" },
        regular && { fontFamily: "Montserrat_400Regular" },
        //colours
        purple && { color: "#6464E1" },
        grey && { color: "grey" },
        white && { color: "white" },
        black && { color: "black" },
        //position
        center && { textAlign: "center" },
        //other
        style,
      ]}
      {...rest}
    >
      {title}
    </Text>
  );
};

export { CText };
