import React from "react";
import { View, Text, TouchableWithoutFeedback, Image } from "react-native";
import images from "@assets/images";
import styles from "@styles/styles";
import ExplanationCarousel from "../../components/ExplanationCarousel";

export default function Welcome({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Image style={styles.peekabooLogo} source={images.peekabooLogo} />
      <ExplanationCarousel />
      <Text>Welcome</Text>
      <TouchableWithoutFeedback onPress={() => navigation.navigate("Login")}>
        <Text style={{ marginTop: 50 }}>Press here to continue</Text>
      </TouchableWithoutFeedback>
    </View>
  );
}
