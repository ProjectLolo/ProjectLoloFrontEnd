import React from "react";
import { View, Text, TouchableWithoutFeedback, Image } from "react-native";
import images from "@assets/images";
import styles from "@styles/styles";

export default function Welcome({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <Image style={styles.peekabooLogo} source={images.peekabooLogo} />
      <Text style={{ textAlign: "center" }}>Welcome</Text>
      <TouchableWithoutFeedback onPress={() => navigation.navigate("Login")}>
        <Text style={{ textAlign: "center", marginTop: 50 }}>
          Press here to continue
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
}
