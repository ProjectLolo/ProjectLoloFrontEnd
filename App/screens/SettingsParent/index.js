import React from "react";
import { View, Text } from "react-native";
import NavHome from "../../components/NavHome";
import NavButtons from "../../components/NavButtons";

export default function SettingsParent() {
  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <NavHome />
      <Text>SettingsParent</Text>
      <NavButtons />
    </View>
  );
}
