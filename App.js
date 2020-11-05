import * as React from "react";
import CombineNavigators from "./App/navigation/CombineNavigators";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";
import { AppLoading } from "expo";

export default function App() {
  let [fontLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
    Montserrat_600SemiBold,
  });

  if (!fontLoaded) {
    return <AppLoading />;
  } else {
    return <CombineNavigators />;
  }
}
