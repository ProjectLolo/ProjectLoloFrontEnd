import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";

export default function KidCircles({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text style={{ textAlign: "center" }}>KIDCIRCLES</Text>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("CreateKidCircle")}
      >
        <Text style={{ textAlign: "center", marginTop: 50 }}>
          Press here to go to CreateKidCircle
        </Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("JoinKidCircle")}
      >
        <Text style={{ textAlign: "center", marginTop: 50 }}>
          Press here to go to JoinKidCircle
        </Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("Recommended")}
      >
        <Text style={{ textAlign: "center", marginTop: 50 }}>
          Press here to go to Recommended
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
}
