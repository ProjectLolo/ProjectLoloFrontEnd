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

const SText = ({
  h1,
  h2,
  h3,
  h4,
  h5,
  p,
  bold,
  regular,
  purple,
  title,
  style,
  ...rest
}) => {
  return (
    <Text
      style={[
        h1 && { fontSize: adjust(48) },
        h2 && { fontSize: adjust(32) },
        h3 && { fontSize: adjust(20) },
        h4 && { fontSize: adjust(18) },
        h5 && { fontSize: adjust(16) },
        p && { fontSize: adjust(12) },
        bold && { fontFamily: "Montserrat_700Bold" },
        regular && { fontFamily: "Montserrat_400Regular" },
        style,
      ]}
      {...rest}
    >
      {title}
    </Text>
  );
};

export { SText };
