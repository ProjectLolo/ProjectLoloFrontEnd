import React from "react";

import AuthNavigator from "./AuthNavigator";
import StackNavigator from "./StackNavigator";

export default function CombineNavigators() {
  const loggedIn = false;
  //if there is a token (so user is logged in) we switch from AuthNavigator to StackNavigator
  //hardcoded for now

  return loggedIn ? <StackNavigator /> : <AuthNavigator />;
}
