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
import Activate from "../screens/CreateContent/Activate";
import FunAnimals from "../screens/CreateContent/FunAnimals";
import HolidayMemory from "../screens/CreateContent/HolidayMemory";
import ReadAStory from "../screens/CreateContent/ReadAStory";
import ShareSomething from "../screens/CreateContent/ShareSomething";
import SingASong from "../screens/CreateContent/SingASong";
import Teach from "../screens/CreateContent/Teach";
import MessageSent from "../screens/CreateContent/MessageSent";
import VideoPreview from "../components/VideoPreview";

export default function authNavigator({ route, state }) {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="KidCircles"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="KidCircles"
          component={KidCircles}
          initialParams={state}
        />
        <Stack.Screen name="CreateKidCircle" component={CreateKidCircle} />
        <Stack.Screen name="UploadKidProfile" component={UploadKidProfile} />
        <Stack.Screen
          name="TakeProfilePicture"
          component={TakeProfilePicture}
        />
        <Stack.Screen name="ShareFamilyCode" component={ShareFamilyCode} />
        <Stack.Screen name="JoinKidCircle" component={JoinKidCircle} />
        <Stack.Screen name="Recommended" component={Recommended} />
        <Stack.Screen
          name="LoveBank"
          component={LoveBank}
          initialParams={state}
        />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen
          name="MediaContentDetails"
          component={MediaContentDetails}
        />
        <Stack.Screen name="Activate" component={Activate} />
        <Stack.Screen name="FunAnimals" component={FunAnimals} />
        <Stack.Screen name="HolidayMemory" component={HolidayMemory} />
        <Stack.Screen name="ReadAStory" component={ReadAStory} />
        <Stack.Screen name="ShareSomething" component={ShareSomething} />
        <Stack.Screen name="SingASong" component={SingASong} />
        <Stack.Screen name="Teach" component={Teach} />
        <Stack.Screen
          name="VideoPreview"
          component={VideoPreview}
          initialParams={state}
        />
        <Stack.Screen name="MessageSent" component={MessageSent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
