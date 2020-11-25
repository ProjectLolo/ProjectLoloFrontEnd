import React from "react";
import { View, Text } from "react-native";
import NavHome from "../../components/NavHome";
import NavButtons from "../../components/NavButtons";

export default function SettingsKid() {
  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <NavHome />
      <Text>SettingsKid</Text>
      <NavButtons />
    </View>
  );
}