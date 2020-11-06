import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";

export default function LoveBank({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text style={{ textAlign: "center" }}>LoveBank</Text>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("Recommended")}
      >
        <Text style={{ textAlign: "center", marginTop: 50 }}>
          Press here to go to Recommended
        </Text>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => navigation.navigate("Settings")}>
        <Text style={{ textAlign: "center", marginTop: 50 }}>
          Press here to go to Settings
        </Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("MediaContentDetails")}
      >
        <Text style={{ textAlign: "center", marginTop: 50 }}>
          Press here to go to MediaContentDetails
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
}
