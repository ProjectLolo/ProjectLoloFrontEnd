import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import KidCircles from "../screens/KidCircles";
import CreateKidCircle from "../screens/CreateKidCircle";
import UploadKidProfile from "../screens/UploadKidProfile";
import TakeProfilePicture from "../components/TakeProfilePicture";
import ShareFamilyCode from "../screens/ShareFamilyCode";
import JoinKidCircle from "../screens/JoinKidCircle";
import Recommended from "../screens/Recommended";
import LoveBank from "../screens/LoveBank";
import Settings from "../screens/Settings";
import MediaContentDetails from "../screens/MediaContentDetails";
import ShareSomething from "../screens/CreateContent/ShareSomething";
import MessageSent from "../screens/CreateContent/MessageSent";
import VideoRecording from "../components/VideoRecording";
import VideoUploading from "../components/VideoUploading";

export default function authNavigator({ route }) {
  const Stack = createStackNavigator();
  console.log("route", route);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="KidCircles"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="KidCircles" component={KidCircles} />
        <Stack.Screen name="CreateKidCircle" component={CreateKidCircle} />
        <Stack.Screen name="UploadKidProfile" component={UploadKidProfile} />
        <Stack.Screen
          name="TakeProfilePicture"
          component={TakeProfilePicture}
        />
        <Stack.Screen name="ShareFamilyCode" component={ShareFamilyCode} />
        <Stack.Screen name="JoinKidCircle" component={JoinKidCircle} />
        <Stack.Screen name="Recommended" component={Recommended} />
        <Stack.Screen name="LoveBank" component={LoveBank} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen
          name="MediaContentDetails"
          component={MediaContentDetails}
        />
        <Stack.Screen name="ShareSomething" component={ShareSomething} />
        <Stack.Screen name="VideoRecording" component={VideoRecording} />
        <Stack.Screen name="VideoUploading" component={VideoUploading} />
        <Stack.Screen name="MessageSent" component={MessageSent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
