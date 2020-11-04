import * as React from "react";
import { Text } from "react-native";
import adjust from "./adjust";

import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

function index() {
  useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
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
  regular,
  //font colours
  purple,
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
        regular && { fontFamily: "Montserrat_400Regular" },
        //colours
        purple && { color: "#6464E1" },
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
