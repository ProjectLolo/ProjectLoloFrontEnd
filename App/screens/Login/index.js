import React from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import images from "@assets/images";

export default function Login({ navigation }) {
  //On Login, user should login, token should be made and received. When token is there, will switch to KidCircle screen. (instead of navigate to Signup)

  return (
    <View style={{ flex: 1, justifyContent: "flex-start" }}>
      <Image
        style={{ width: null, resizeMode: "contain" }}
        source={images.peekabooLogo}
      />

      <Text style={{ textAlign: "center" }}>LOGIN SCREEN</Text>
      <TouchableWithoutFeedback onPress={() => navigation.navigate("SignUp")}>
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
