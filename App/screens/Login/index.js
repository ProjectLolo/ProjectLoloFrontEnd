import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";

export default function Login({ navigation }) {
  //On Login, user should login, token should be made and received. When token is there, will switch to KidCircle screen. (instead of navigate to Signup)
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text style={{ textAlign: "center" }}>LOGIN SCREEN</Text>
      <TouchableWithoutFeedback onPress={() => navigation.navigate("SignUp")}>
        <Text style={{ textAlign: "center", marginTop: 50 }}>
          Press here to continue
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
}
