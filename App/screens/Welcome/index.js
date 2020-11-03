import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";

export default function Welcome({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text style={{ textAlign: "center" }}>Welcome</Text>
      <TouchableWithoutFeedback onPress={() => navigation.navigate("Login")}>
        <Text style={{ textAlign: "center", marginTop: 50 }}>
          Press here to continue
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
}
