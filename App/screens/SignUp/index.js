import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";

export default function SignUp({ navigation }) {
  //On SignUp, user should be set up, token should be made and received. When token is there, will switch to KidCircle screen. (instead of navigate to Login)
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text style={{ textAlign: "center" }}>SignUp</Text>
      <TouchableWithoutFeedback onPress={() => navigation.navigate("Login")}>
        <Text style={{ textAlign: "center", marginTop: 50 }}>
          Press here to continue
        </Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => navigation.navigate("Welcome")}>
        <Text style={{ textAlign: "center", marginTop: 50 }}>
          back to welcome
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
}
