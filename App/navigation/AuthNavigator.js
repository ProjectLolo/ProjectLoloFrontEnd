import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Welcome from "../screens/Welcome";
import Password from "../screens/Password";
import UploadUserProfile from "../screens/UploadUserProfile";

export default function AuthNavigator() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="UploadUserProfile" component={UploadUserProfile} />
        <Stack.Screen name="Password" component={Password} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
