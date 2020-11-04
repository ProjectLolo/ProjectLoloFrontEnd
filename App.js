import * as React from "react";
import AuthNavigator from "./App/navigation/AuthNavigator";
import StackNavigator from "./App/navigation/StackNavigator";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { AppLoading } from "expo";

export default function App() {
  //if there is a token (so user is logged in) we switch from AuthNavigator to StackNavigator
  //hardcoded for now
  const loggedIn = false;

  let [fontLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  if (!fontLoaded) {
    return <AppLoading />;
  } else {
    return loggedIn ? <StackNavigator /> : <AuthNavigator />;
  }
}
