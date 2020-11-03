import * as React from "react";
import AuthNavigator from "./App/navigation/AuthNavigator";
import StackNavigator from "./App/navigation/StackNavigator";

export default function App() {
  //if there is a token (so user is logged in) we switch from AuthNavigator to StackNavigator
  //hardcoded for now
  const loggedIn = false;

  return loggedIn ? <StackNavigator /> : <AuthNavigator />;
}
